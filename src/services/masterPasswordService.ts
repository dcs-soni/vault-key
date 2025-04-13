import { db } from '../db/db';

async function generateSalt(): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const masterPasswordService = {
  async setMasterPassword(password: string): Promise<void> {
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    
    // Clear any existing master password
    await db.masterPassword.clear();
    
    // Store the new master password
    await db.masterPassword.add({
      hashedPassword,
      salt
    });
  },

  async verifyMasterPassword(password: string): Promise<boolean> {
    const storedPassword = await db.masterPassword.toCollection().first();
    
    if (!storedPassword) {
      return false;
    }

    const hashedAttempt = await hashPassword(password, storedPassword.salt);
    return hashedAttempt === storedPassword.hashedPassword;
  },

  async hasMasterPassword(): Promise<boolean> {
    const count = await db.masterPassword.count();
    return count > 0;
  },

  async clearMasterPassword(): Promise<void> {
    await db.masterPassword.clear();
  }
}; 