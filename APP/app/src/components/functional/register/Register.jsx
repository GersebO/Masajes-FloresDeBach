// src/pages/Register.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import customerService from "../../../store/services/customerService";

import { validators } from '../../../utils/validators';
import { regiones } from '../../../utils/regionesData';
import './Register.css';

// Objeto con el estado inicial del formulario
// Se define aquí para reutilizarlo tanto al inicio como cuando se hace reset
const initialFormData = {
  run: '',
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  address: '',
  region: '',
  commune: '',
  phone: '',
  password: '',
  confirmPassword: '',
};


// COMPONENTE PRINCIPAL

export default function Register() {
  // Hook de navegación para redirigir después del registro
  const navigate = useNavigate();

  // useState: controla los valores actuales del formulario
  const [formData, setFormData] = useState(initialFormData);

  //  useState: guarda los mensajes de error de cada campo
  const [errors, setErrors] = useState({});

  //  useState: marca si el usuario ya interactuó con un campo
  const [touched, setTouched] = useState({});

  // useState: contiene las comunas disponibles según la región seleccionada
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  // useState: controla el estado de envío (para desactivar el botón y mostrar “Cargando”)
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  useEffect: se ejecuta cada vez que cambia la región seleccionada
  // Actualiza la lista de comunas correspondientes y reinicia la comuna elegida
  useEffect(() => {
    if (!formData.region) {
      // Si no hay región, se limpian las comunas
      return setComunasDisponibles([]);
    }

    // Convierte el valor de la región en número para acceder al array `regiones`
    const regionIdx = Number(formData.region);

    // Actualiza el listado de comunas disponibles para esa región
    setComunasDisponibles(regiones[regionIdx]?.comunas || []);

    setFormData(prev => ({ ...prev, commune: '' }));
  }, [formData.region]);

  // Cada campo tiene una función que devuelve `true` si es válido, o un mensaje de error si no lo es
  const rules = {
    run: v => validators.validarRUN(v) || 'RUN inválido',
    firstName: v => validators.validarNombre(v) || 'Nombre inválido',
    lastName: v => validators.validarApellidos(v) || 'Apellidos inválidos',
    email: v => validators.validarEmail(v) || 'Correo inválido',
    address: v => validators.validarDireccion(v) || 'Dirección obligatoria',
    region: v => v !== '' || 'Selecciona una región',
    commune: v => v !== '' || 'Selecciona una comuna',
    password: v => validators.validarPassword(v) || 'Contraseña inválida',
    confirmPassword: v =>
      validators.validarPasswordsCoinciden(formData.password, v) || 'Las contraseñas no coinciden',
  };

  
  // Se ejecuta cuando el usuario escribe o cuando se valida el formulario completo
  const validateField = (field, value) => {
    const rule = rules[field]; // Busca la regla correspondiente
    if (!rule) return true; // Si no existe, se considera válido
    const result = rule(value);
    const msg = result === true ? '' : result; // Si devuelve true, no hay error
    // Actualiza el estado de errores
    setErrors(prev => ({ ...prev, [field]: msg }));
    return !msg; // Devuelve true si no hay error
  };

  // Maneja los cambios en los inputs del formulario
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Marca el campo como “tocado” si es la primera vez que se edita
    if (!touched[name]) setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Valida todos los campos del formulario antes de enviarlo
  const validateForm = () => {
    let valid = true;

    // Recorre todas las reglas y valida cada campo
    for (const field in rules) {
      const ok = validateField(field, formData[field]);
      if (!ok) valid = false;
    }

    // Marca todos los campos como “touched” (para mostrar los errores)
    setTouched(Object.keys(rules).reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    return valid;
  };

  // Función principal que se ejecuta al presionar “Crear cuenta”
  const handleSubmit = async e => {
    e.preventDefault(); // Evita recargar la página
    // Primero valida todos los campos
    if (!validateForm()) return;
    setIsSubmitting(true); // Muestra el estado de “Creando cuenta...”

    try {
      const regionIdx = Number(formData.region);

      // Construye el objeto con los datos listos para enviar a la API
      const data = {
        ...formData,
        run: validators.normalizaRun(formData.run),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        region: regiones[regionIdx]?.nombre,
        commune: formData.commune,
        status: 'ACTIVE',
      };

      // Llama al servicio que guarda el usuario en la base de datos
      await customerService.createCustomer(data);

      // Notifica éxito al usuario
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');

      // Redirige a la página de login
      navigate('/login');
    } catch (err) {
      alert('Error al registrar: ' + err.message);
    } finally {
      // En cualquier caso, vuelve a permitir enviar el formulario
      setIsSubmitting(false);
    }
  };

  // Limpia 
  const handleReset = () => {
    setFormData(initialFormData); // Reinicia valores
    setErrors({}); // Limpia errores
    setTouched({}); // Limpia estados de “tocado”
    setComunasDisponibles([]); // Vacía comunas
  };

  const getInputClass = field =>
    !touched[field]
      ? 'form-control' // Si el campo no fue tocado
      : errors[field]
      ? 'form-control is-invalid' // Si tiene error
      : 'form-control is-valid'; // Si está correcto

  return (
    <div className="container">
      <h1 className="my-4 text-center">Registro de Usuario</h1>

      <div className="row justify-content-center my-4">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="formulario-fondo p-4 p-md-5 rounded shadow-sm" noValidate>
            <h2 className="mb-4">Datos Personales</h2>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="run" className="form-label">RUN (sin puntos ni guion)</label>
                <input type="text" id="run" name="run" className={getInputClass('run')} placeholder="19011022-K" value={formData.run} onChange={handleChange} required />
                {touched.run && errors.run && <div className="invalid-feedback">{errors.run}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="birthDate" className="form-label">Fecha Nacimiento (opcional)</label>
                <input type="date" id="birthDate" name="birthDate" className="form-control" min="1940-01-01" value={formData.birthDate} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">Nombre</label>
                <input type="text" id="firstName" name="firstName" className={getInputClass('firstName')} placeholder="Ej: Camila" maxLength="50" value={formData.firstName} onChange={handleChange} required />
                {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Apellidos</label>
                <input type="text" id="lastName" name="lastName" className={getInputClass('lastName')} placeholder="Ej: Díaz Pérez" maxLength="100" value={formData.lastName} onChange={handleChange} required />
                {touched.lastName && errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>

            <h2 className="mt-4 mb-3">Datos de Contacto</h2>

            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="email" className="form-label">Correo</label>
                <input type="email" id="email" name="email" className={getInputClass('email')} placeholder="tu@duoc.cl / tu@gmail.com" maxLength="100" value={formData.email} onChange={handleChange} required />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="phone" className="form-label">Teléfono (opcional)</label>
                <input type="tel" id="phone" name="phone" className="form-control" placeholder="+56912345678" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input type="text" id="address" name="address" className={getInputClass('address')} placeholder="Calle, número, depto" maxLength="300" value={formData.address} onChange={handleChange} required />
                {touched.address && errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="region" className="form-label">Región</label>
                <select id="region" name="region" className={getInputClass('region')} value={formData.region} onChange={handleChange} required>
                  <option value="">Seleccione región</option>
                  {regiones.map((region, idx) => (
                    <option key={idx} value={idx}>{region.nombre}</option>
                  ))}
                </select>
                {touched.region && errors.region && <div className="invalid-feedback">{errors.region}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="commune" className="form-label">Comuna</label>
                <select id="commune" name="commune" className={getInputClass('commune')} value={formData.commune} onChange={handleChange} disabled={comunasDisponibles.length === 0} required>
                  <option value="">Seleccione comuna</option>
                  {comunasDisponibles.map((comuna, idx) => (
                    <option key={idx} value={comuna}>{comuna}</option>
                  ))}
                </select>
                {touched.commune && errors.commune && <div className="invalid-feedback">{errors.commune}</div>}
              </div>
            </div>

            <h2 className="mt-4 mb-3">Contraseña</h2>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" id="password" name="password" className={getInputClass('password')} placeholder="4 a 10 caracteres" minLength="4" maxLength="10" value={formData.password} onChange={handleChange} autoComplete="new-password" required />
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className={getInputClass('confirmPassword')} placeholder="Repítela igual" minLength="4" maxLength="10" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required />
                {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>

            <hr className="my-4" />

            <div className="d-grid d-md-flex gap-2">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-lg" disabled={isSubmitting}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}