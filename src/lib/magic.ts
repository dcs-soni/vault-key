import { Magic } from 'magic-sdk';

// Initialize Magic with your publishable key
const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

export default magic; 