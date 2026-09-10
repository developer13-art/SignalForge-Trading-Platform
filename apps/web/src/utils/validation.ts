export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidPhone(phone: string): boolean {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phone.replace(/\s/g, ''));
}

export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('One number');
  return { valid: errors.length === 0, errors };
}

export function isValidUsername(username: string): boolean {
  const re = /^[a-zA-Z0-9_]{3,30}$/;
  return re.test(username);
}

export function isStrongPassword(password: string): boolean {
  return isValidPassword(password).valid;
}