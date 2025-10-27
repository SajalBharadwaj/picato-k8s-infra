export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validatePrice(price) {
  return !isNaN(price) && parseFloat(price) > 0;
}

export function validateRequired(value) {
  return value && value.toString().trim().length > 0;
}
