export function isEmailValid(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

export function isPhoneValid(phone: string) {
  // validación simple: 7-15 dígitos y opcionales + o espacios
  const re = /^[+]?[\d\s\-]{7,15}$/;
  return re.test(phone);
}