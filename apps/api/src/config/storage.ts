// apps/api/src/config/storage.ts
import { env } from './env';
import { S3Client } from '@aws-sdk/client-s3';

export const storageConfig = {
  accessKey: env.S3_ACCESS_KEY || '',
  secretKey: env.S3_SECRET_KEY || '',
  bucket: env.S3_BUCKET || 'signalforge-storage',
  region: env.S3_REGION || 'us-east-1',
  endpoint: env.S3_ENDPOINT,
  
  isValid(): boolean {
    return Boolean(this.accessKey && this.secretKey && this.bucket);
  },
  
  getClient(): S3Client | null {
    if (!this.isValid()) {
      return null;
    }
    
    return new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
    });
  },
};

export default storageConfig;