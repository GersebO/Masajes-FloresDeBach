import { create } from 'zustand';
import { useProductStore } from './product.store';

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,

  // ✅ FETCH CART - Cargar carrito
  fetchCart: async (customerId) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log("🔄 Fetching cart for customerId:", customerId);
      const response = await fetch(`http://localhost:8082/api/cart/${customerId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar el carrito');
      }
      
      const data = await response.json();
      console.log("📦 Respuesta completa del backend:", data);
      console.log("📦 Tipo de data:", typeof data);
      console.log("📦 Es array data:", Array.isArray(data));
      console.log("📦 data.items:", data.items);

      // Normalize items: ensure imageUrl points to frontend public/img when backend returns
      const normalizeImageUrl = (url) => {
        if (!url) return "/img/default.jpg"; // fallback to frontend default
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        // if backend returns a filename like "product1.jpg" -> map to frontend public/img
        if (!url.startsWith("/")) return `/img/${url}`;
        // if starts with '/' assume it's relative to frontend root; keep as-is
        return url;
      };

      // Try to enrich items with product data already loaded in frontend (product store)
      const products = useProductStore.getState().products || [];

      // Handle different response formats from backend
      let itemsArray = [];
      if (Array.isArray(data)) {
        itemsArray = data;
      } else if (data.items && Array.isArray(data.items)) {
        itemsArray = data.items;
      } else if (data.cartItems && Array.isArray(data.cartItems)) {
        itemsArray = data.cartItems;
      }

      console.log("📦 Items array extraído:", itemsArray);

      const items = itemsArray.map((it) => {
        const prod = products.find((p) => Number(p.id) === Number(it.productId));
        const price = Number(it.price ?? (prod ? prod.price : 0)) || 0;
        const quantity = Number(it.quantity) || 0;
        const rawImage = it.imageUrl || (prod ? prod.imageUrl || prod.image || prod.imageUrl : null);
        return {
          ...it,
          name: it.name || (prod ? prod.name : "Producto sin nombre"),
          description: it.description || (prod ? prod.description : ""),
          price,
          quantity,
          imageUrl: normalizeImageUrl(rawImage),
        };
      });

      const total = data.total != null ? data.total : items.reduce((s, it) => s + it.price * it.quantity, 0);

      console.log("🧾 Carrito cargado correctamente (normalizado):", { items, total });

      set({ 
        items,
        total,
        isLoading: false 
      });
    } catch (error) {
      console.error('❌ Error al cargar carrito:', error);
      set({ 
        error: error.message,
        isLoading: false,
        items: [],
        total: 0
      });
    }
  },

  // ✅ ADD ITEM - Agregar producto
  addItem: async (customerId, productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:8082/api/cart/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          customerId,
          productId, 
          quantity 
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      const data = await response.json();
      console.log('✅ Producto agregado:', data);

      // Recargar el carrito después de agregar
      await get().fetchCart(customerId);
      
    } catch (error) {
      console.error('❌ Error al agregar producto:', error);
      throw error;
    }
  },

  // ✅ UPDATE QUANTITY - Actualizar cantidad
  updateQuantity: async (customerId, productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:8082/api/cart/update`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          customerId,
          productId,
          quantity 
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar cantidad');
      }

      // Recargar el carrito
      await get().fetchCart(customerId);
      
    } catch (error) {
      console.error('❌ Error al actualizar cantidad:', error);
      throw error;
    }
  },

  // ✅ REMOVE ITEM - Eliminar producto
  removeItem: async (customerId, productId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/cart/remove`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          customerId,
          productId 
        })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      console.log(`🗑️ Producto ${productId} eliminado del carrito`);
      
      // Recargar el carrito
      await get().fetchCart(customerId);
      
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      throw error;
    }
  },

  // ✅ CLEAR CART - Limpiar carrito
  clearCart: async (customerId) => {
    try {
      // Si se proporciona customerId, también limpiamos en el backend
      if (customerId) {
        const response = await fetch(`http://localhost:8082/api/cart/clear/${customerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.warn('⚠️ No se pudo limpiar el carrito en el backend, pero se limpiará localmente');
        } else {
          console.log('🧹 Carrito limpiado en el backend');
        }
      }

      // Limpiar estado local
      set({ 
        items: [], 
        total: 0,
        error: null
      });

      console.log('✅ Carrito limpiado completamente');
    } catch (error) {
      console.error('❌ Error al limpiar carrito:', error);
      // Aún así limpiamos localmente
      set({ 
        items: [], 
        total: 0,
        error: null
      });
    }
  }
}));