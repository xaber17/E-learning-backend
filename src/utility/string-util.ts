import * as crypto from 'crypto';

export function generateSha512(data: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(data);
  return hash.digest('hex');
}
