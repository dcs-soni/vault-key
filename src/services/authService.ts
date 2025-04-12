import magic from "@/lib/magic";

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
      // Finish the authentication process
      await magic.auth.loginWithCredential();

      // Check if user is logged in after validation
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        localStorage.setItem("isAuthenticated", "true");
        return { success: true };
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
