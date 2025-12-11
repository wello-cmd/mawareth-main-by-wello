import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '@/types/models';
import { authApi } from '@/services/mongoApi';

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

// Helper to generate MongoDB-style ObjectId (for offline/mock mode)
const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Math.random().toString(16).substring(2, 18);
  return timestamp + randomPart.padEnd(16, '0').substring(0, 16);
};

// Check if we're using mock mode (no backend configured)
const isMockMode = (): boolean => {
  const apiUrl = import.meta.env.VITE_MONGODB_API_URL;
  return !apiUrl || apiUrl === 'http://localhost:5000/api';
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

        if (isMockMode()) {
          // Mock mode: get user from local storage
          const users = JSON.parse(localStorage.getItem('merath_users') || '[]');
          const foundUser = users.find((u: AuthUser) => u._id === session.userId);
          if (foundUser) {
            setUser(foundUser);
          }
        } else {
          // Production mode: verify session with backend
          const response = await authApi.getSession();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem(SESSION_KEY);
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
      if (isMockMode()) {
        // Mock mode login
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users: AuthUser[] = JSON.parse(localStorage.getItem('merath_users') || '[]');
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!foundUser) {
          return { success: false, error: 'User not found' };
        }
        
        const session = {
          _id: generateObjectId(),
          userId: foundUser._id,
          token: generateObjectId() + generateObjectId(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(foundUser);
        
        return { success: true };
      } else {
        // Production mode: call MongoDB API
        const response = await authApi.login(email, password);
        
        if (response.success && response.data) {
          const { user: authUser, session } = response.data;
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          setUser(authUser);
          return { success: true };
        }
        
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isMockMode()) {
        // Mock mode signup
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users: AuthUser[] = JSON.parse(localStorage.getItem('merath_users') || '[]');
        
        if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
          return { success: false, error: 'Email already registered' };
        }
        
        const now = new Date().toISOString();
        const newUser: AuthUser = {
          _id: generateObjectId(),
          email: data.email,
          name: data.name,
          phone: data.phone,
          role: data.role,
          isVerified: false,
          createdAt: now,
          updatedAt: now
        };
        
        users.push(newUser);
        localStorage.setItem('merath_users', JSON.stringify(users));
        
        const session = {
          _id: generateObjectId(),
          userId: newUser._id,
          token: generateObjectId() + generateObjectId(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: now
        };
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(newUser);
        
        return { success: true };
      } else {
        // Production mode: call MongoDB API
        const response = await authApi.signup(data);
        
        if (response.success && response.data) {
          const { user: authUser, session } = response.data;
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          setUser(authUser);
          return { success: true };
        }
        
        return { success: false, error: response.error || 'Signup failed' };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      if (!isMockMode()) {
        await authApi.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
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
