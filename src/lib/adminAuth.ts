// src/lib/adminAuth.ts

const SESSION_KEY = "vincie_admin_session_auth";
const CREDS_KEY = "vincie_admin_credentials_v1";

const DEFAULT_CREDENTIALS = {
  adminId: "admin",
  password: "admin",
};

export interface AdminCredentials {
  adminId: string;
  password: string;
}

export const adminAuth = {
  getCredentials: (): AdminCredentials => {
    try {
      const stored = localStorage.getItem(CREDS_KEY);
      if (!stored) {
        return DEFAULT_CREDENTIALS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  },

  updateCredentials: (newCreds: AdminCredentials): boolean => {
    try {
      if (!newCreds.adminId.trim() || !newCreds.password.trim()) {
        return false;
      }
      localStorage.setItem(CREDS_KEY, JSON.stringify(newCreds));
      return true;
    } catch {
      return false;
    }
  },

  login: (id: string, pass: string): boolean => {
    const creds = adminAuth.getCredentials();
    if (id.trim() === creds.adminId && pass === creds.password) {
      const sessionData = {
        authenticated: true,
        loginTime: new Date().toISOString(),
        user: creds.adminId,
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      return true;
    }
    return false;
  },

  isAuthenticated: (): boolean => {
    try {
      const session =
        sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed && parsed.authenticated);
    } catch {
      return false;
    }
  },

  logout: (): void => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  },
};
