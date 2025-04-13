import { Magic } from 'magic-sdk';

export const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export const authService = {
  async loginWithMagicLink(email: string): Promise<AuthResponse> {
    try {
      await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/verify", window.location.origin).href,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      };
    }
  },

  async verifyMagicLink(): Promise<AuthResponse> {
    try {
      // Wait for a small delay to ensure Magic SDK is ready
      await new Promise(resolve => setTimeout(resolve, 500));

      // Try to complete the authentication
      try {
        await magic.auth.loginWithCredential();
      } catch (error) {
        // Ignore the initial RPC error as it might be a false negative
        console.log("Initial verification attempt:", error);
      }

      // Double check the login status
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        localStorage.setItem("isAuthenticated", "true");
        return { success: true };
      }

      // If not logged in, try one more time
      try {
        await magic.auth.loginWithCredential();
        const retryLogin = await magic.user.isLoggedIn();
        if (retryLogin) {
          localStorage.setItem("isAuthenticated", "true");
          return { success: true };
        }
      } catch (error) {
        console.log("Retry verification attempt:", error);
      }

      return {
        success: false,
        error: "Magic link verification failed",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Verification failed",
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await magic.user.logout();
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("hasMasterPassword");
      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

  async isLoggedIn(): Promise<boolean> {
    try {
      return await magic.user.isLoggedIn();
    } catch {
      return false;
    }
  },

  async getUserMetadata() {
    try {
      return await magic.user.getInfo();
    } catch (error) {
      console.error("Error fetching user metadata:", error);
      return null;
    }
  },
};
