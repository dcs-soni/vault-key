import Dexie, { Table } from 'dexie';

export interface Password {
  id?: number;
  title: string;
  username: string;
  password: string;
  url?: string;
  category?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  id?: number;
  email: string;
  masterPasswordHash: string;
  hasMasterPassword: boolean;
}

export interface MasterPassword {
  id?: number;
  hashedPassword: string;
  salt: string;
}

export class VaultKeyDB extends Dexie {
  passwords!: Table<Password>;
  userSettings!: Table<UserSettings>;
  masterPassword!: Table<MasterPassword>;

  constructor() {
    super('vaultKeyDB');
    this.version(3).stores({
      passwords: '++id, title, username, category, createdAt, updatedAt',
      userSettings: '++id, email, masterPasswordHash, hasMasterPassword',
      masterPassword: '++id, hashedPassword, salt'
    });
  }

  async initialize() {
    try {
      await this.open();
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return false;
    }
  }
}

export const db = new VaultKeyDB();

// Initialize the database
db.initialize().catch(error => {
  console.error('Failed to initialize VaultKeyDB:', error);
}); 