
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          // TODO: API Integration
          // Make a GET request to /api/users/profile with the token in Authorization header
          // const response = await fetch('/api/users/profile', {
          //   headers: { 'Authorization': `Bearer ${token}` }
          // });
          // if (!response.ok) throw new Error('Failed to fetch profile');
          // const userData = await response.json();
          // setUser(userData);

          // Placeholder logic
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
             // Mock user profile fetch for demonstration
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: localStorage.getItem('isAdmin') === 'true' };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email: string, password: string) => {
    // TODO: API Integration
    // Make a POST request to /api/users/login with email and password
    // const response = await fetch('/api/users/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!response.ok) throw new Error('Login failed');
    // const { token, user } = await response.json();

    // Placeholder logic
    const mockToken = 'fake-jwt-token';
    const mockUser = { id: '1', name: 'John Doe', email: email, isAdmin: email.includes('admin') };
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('isAdmin', String(mockUser.isAdmin));
    setToken(mockToken);
    setUser(mockUser);
  };
  
  const register = async (name: string, email: string, password: string) => {
    // TODO: API Integration
    // Make a POST request to /api/users/register with name, email, and password
    // const response = await fetch('/api/users/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // });
    // if (!response.ok) throw new Error('Registration failed');
    // const { token, user } = await response.json();

    // Placeholder logic - same as login for simplicity
    await login(email, password);
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };
  
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
