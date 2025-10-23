import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import axios from 'axios';

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

// Move useAuth hook before the Provider
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/profile', {
            headers: { 
              'Authorization': `Bearer ${token}` 
            },
            withCredentials: true
          });
          console.log("Profile fetch response:", response.data);
          const userData = response.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          
        } catch (error) {
          // Token invalid or expired - clear auth state
          console.error("Profile fetch failed:", error);
          logout();
        }
      } else {
        // No token - ensure user is logged out
        setUser(null);
      }
      setLoading(false);
    };

    fetchUserProfile();
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

    try{
      const response = await axios.post("http://127.0.0.1:5000/signin", {
        email,
        password  
      },{
        withCredentials: true
      });
      console.log("Login response:", response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', String(user.isAdmin));
      setToken(token);
      setUser(user);
    }catch(error){
      console.error("Error logging in:", error.response?.data || error.message);
      console.log(error)
      throw new Error(error.response?.data.message ||'Login failed');
    }

    // Placeholder logic
    // const mockToken = 'fake-jwt-token';
    // const mockUser = { id: '1', name: 'John Doe', email: email, isAdmin: email.includes('admin') };
    
    // localStorage.setItem('token', mockToken);
    // localStorage.setItem('user', JSON.stringify(mockUser));
    // localStorage.setItem('isAdmin', String(mockUser.isAdmin));
    // setToken(mockToken);
    // setUser(mockUser);
  };
  
  const register = async (username: string, email: string, password: string) => {
    // TODO: API Integration
    // Make a POST request to /api/users/register with name, email, and password
    // const response = await fetch('/api/users/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // });
    try{
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password
      });
      console.log("Registration response:", response.data);
  
    }catch(error){
      console.error("Error registering user:", error.response?.data || error.message);
      console.log(error)
      throw new Error(error.response?.data.message ||'Registration failed');
  
    }
    // if (!response.ok) throw new Error('Registration failed');
    // const { token, user } = await response.json();

    // Placeholder logic - same as login for simplicity
    // await login(email, password);
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
