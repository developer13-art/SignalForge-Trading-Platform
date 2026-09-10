// apps/api/src/utils/encryption.ts
import crypto from 'crypto';
import { env } from '../config/env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const KEY = Buffer.from(env.ENCRYPTION_KEY, 'utf-8').slice(0, 32);

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  return JSON.stringify({
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    content: encrypted,
  });
}

export function decrypt(encryptedData: string): string {
  const { iv, tag, content } = JSON.parse(encryptedData);
  
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  
  let decrypted = decipher.update(content, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  
  return decrypted;
}

export function generateSecret(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateApiKey(): string {
  return `sf_${crypto.randomBytes(32).toString('hex')}`;
}