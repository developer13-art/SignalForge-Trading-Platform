// Frontend never handles sensitive encryption - this is a placeholder
// All encryption is server-side. This file exists for non-sensitive encoding only.

export function encodeBase64(text: string): string {
  try {
    return btoa(text);
  } catch {
    return text;
  }
}

export function decodeBase64(encoded: string): string {
  try {
    return atob(encoded);
  } catch {
    return encoded;
  }
}

export function generateRandomId(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const crypto = window.crypto || (window as any).msCrypto;
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  for (let i = 0; i < length; i++) {
    result += chars[values[i] % chars.length];
  }
  return result;
}