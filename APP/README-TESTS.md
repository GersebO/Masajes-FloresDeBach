# Tests - Masajes FloresDeBach

## Cómo ejecutar los tests

### En la aplicación principal (`app`)

```bash
cd app
npm test -- Navbar.test.jsx --run
npm test -- Button.test.jsx --run
npm test -- Footer.test.jsx --run
npm test -- Content.test.jsx --run
```

### En la aplicación admin (`app-admin`)

```bash
cd app-admin
npm test -- Navbar.test.jsx --run
```

## Modo Watch (desarrollo)

Si quieres que los tests se ejecuten automáticamente cuando cambies archivos:

```bash
npm test
```

## Componentes testeados

### App
- **Navbar** - Prueba renderizado de enlaces y direccionamiento
- **Button** - Prueba variantes y tamaños
- **Footer** - Prueba enlaces y contenido
- **Content** - Prueba título, subtítulo e hijos

### App-Admin
- **Navbar** - Prueba renderizado de menú sidebar y direccionamiento

## Ver resultados en UI

```bash
npm run test:ui
```
