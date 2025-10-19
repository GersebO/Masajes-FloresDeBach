// src/utils/validators.js

export const validators = {
  // Solo letras (incluye acentos y ñ)
  onlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,

  // Emails permitidos
  emailAllowed: /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i,

  // Normalizar RUN (quitar puntos y guiones)
  normalizaRun: (value) => {
    return (value || '').replace(/[\.\-]/g, '').toUpperCase();
  },

  // Validar RUN chileno
  validarRUN: (runStr) => {
    const clean = validators.normalizaRun(runStr);

    if (clean.length < 7 || clean.length > 9) return false;

    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1);

    if (!/^\d+$/.test(cuerpo)) return false;

    // Cálculo del dígito verificador
    let suma = 0;
    let mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * mult;
      mult = mult === 7 ? 2 : mult + 1;
    }
    const resto = 11 - (suma % 11);
    let dvCalc = '';
    if (resto === 11) dvCalc = '0';
    else if (resto === 10) dvCalc = 'K';
    else dvCalc = String(resto);

    return dv === dvCalc;
  },

  // Validar nombre (2-50 caracteres, solo letras)
  validarNombre: (nombre) => {
    const trimmed = nombre.trim();
    return (
      trimmed.length >= 2 &&
      trimmed.length <= 50 &&
      validators.onlyLetters.test(trimmed)
    );
  },

  // Validar apellidos (2-100 caracteres, solo letras)
  validarApellidos: (apellidos) => {
    const trimmed = apellidos.trim();
    return (
      trimmed.length >= 2 &&
      trimmed.length <= 100 &&
      validators.onlyLetters.test(trimmed)
    );
  },

  // Validar email
  validarEmail: (email) => {
    const trimmed = email.trim();
    return (
      trimmed.length > 0 &&
      trimmed.length <= 100 &&
      validators.emailAllowed.test(trimmed)
    );
  },

  // Validar dirección
  validarDireccion: (direccion) => {
    const trimmed = direccion.trim();
    return trimmed.length > 0 && trimmed.length <= 300;
  },

  // Validar contraseña (4-10 caracteres)
  validarPassword: (password) => {
    const trimmed = password.trim();
    return trimmed.length >= 4 && trimmed.length <= 10;
  },

  // Validar que las contraseñas coincidan
  validarPasswordsCoinciden: (password1, password2) => {
    return password1.trim() === password2.trim();
  },

  // Formatear RUN para mostrar (con puntos y guión)
  formatearRUN: (run) => {
    const clean = validators.normalizaRun(run);
    if (clean.length < 7) return run;

    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1);

    // Solo agregar el guión (sin puntos para el backend)
    return `${cuerpo}-${dv}`;
  },
};