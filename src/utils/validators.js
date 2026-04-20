export function sanitizeEmail(value) {
  return value.trim().toLowerCase();
}

export function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

export function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateName(value) {
  const name = value.trim();

  if (!name) return "Digite seu nome";
  if (name.length < 3) return "O nome deve ter pelo menos 3 caracteres";

  return "";
}

export function validateEmail(value) {
  const email = sanitizeEmail(value);

  if (!email) return "Digite seu e-mail";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Digite um e-mail válido";
  }

  if (email.length > 120) {
    return "E-mail muito longo";
  }

  return "";
}

export function validatePhone(value) {
  const digits = onlyDigits(value);

  if (!digits) return "Digite seu telefone";

  if (digits.length < 10 || digits.length > 11) {
    return "Digite um telefone válido";
  }

  return "";
}

export function validateLoginPassword(value) {
  if (!value) return "Digite sua senha";
  return "";
}

export function validateStrongPassword(value) {
  if (!value) return "Digite sua senha";

  if (value.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres";
  }

  if (!/[A-Z]/.test(value)) {
    return "A senha deve ter pelo menos 1 letra maiúscula";
  }

  if (!/\d/.test(value)) {
    return "A senha deve ter pelo menos 1 número";
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;']/u.test(value)) {
    return "A senha deve ter pelo menos 1 caractere especial";
  }

  if (/\s/.test(value)) {
    return "A senha não pode conter espaços";
  }

  return "";
}