import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '@/types/models';
import { api } from '@/services/api';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'heir' | 'investor' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session storage keys
const SESSION_KEY = 'merath_session';

// Helper to generate MongoDB-style ObjectId (for offline/mock mode preservation if needed)
const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Math.random().toString(16).substring(2, 18);
  return timestamp + randomPart.padEnd(16, '0').substring(0, 16);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData) {
          setIsLoading(false);
          return;
        }

        const session = JSON.parse(sessionData);

        // Check if session is expired
        if (new Date(session.expiresAt) <= new Date()) {
          localStorage.removeItem(SESSION_KEY);
          setIsLoading(false);
          return;
        }

        // For MVP Presentation: Trust the stored user in session if present
        if (session.user) {
          setUser(session.user);
        } else if (session.userId) {
          // Fallback: fetch user if not in session object (legacy session)
          try {
            const user = await api.users.getById(session.userId);
            if (user) {
              // Cast to AuthUser for now, assuming backend returns all fields
              setUser(user as unknown as AuthUser);
            }
          } catch (e) {
            console.error("Failed to refresh user", e);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { user, token } = await api.users.login(email, password);
      // Save token in localStorage
      localStorage.setItem('token', token);
      // Ideally update SESSION_KEY logic too, but for now simple correct auth
      // Let's reuse the session structure if possible or simplify
      const session = {
        token,
        userId: user._id,
        user: user, // Store user object in session for easier retrieval on refresh
        expiresAt: new Date(Date.now() + 86400000).toISOString() // 24 hours expiry
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));

      setUser(user as unknown as AuthUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const { user, token } = await api.users.register(data);
      if (token) {
        localStorage.setItem('token', token);
        const session = {
          token,
          userId: user._id,
          user: user, // Store user object in session
          expiresAt: new Date(Date.now() + 86400000).toISOString() // 24 hours expiry
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(user as unknown as AuthUser);
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
