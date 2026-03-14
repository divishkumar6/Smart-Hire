import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      // Only verify token if it's not a default token
      if (!token.startsWith('default-token-')) {
        api.get('/auth/me').catch(() => logout());
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Default admin bypass - temporary solution for deployment issues
    const defaultCredentials = {
      'admin@smarthire.com': {
        user: {
          _id: 'default-admin-id',
          name: 'Default Admin',
          email: 'admin@smarthire.com',
          role: 'admin',
          approvalStatus: 'approved',
          isActive: true
        },
        password: 'password123'
      },
      'recruiter@smarthire.com': {
        user: {
          _id: 'default-recruiter-id',
          name: 'Default Recruiter',
          email: 'recruiter@smarthire.com',
          role: 'recruiter',
          approvalStatus: 'approved',
          isActive: true
        },
        password: 'password123'
      }
    };

    // Check if using default credentials
    if (defaultCredentials[email] && defaultCredentials[email].password === password) {
      const mockToken = 'default-token-' + Date.now();
      const userData = defaultCredentials[email].user;
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success(`Welcome ${userData.name}! (Using default credentials)`);
      return { token: mockToken, user: userData };
    }

    // Try API login for real backend connection
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (error) {
      // If API fails and not using default credentials, show error
      throw error;
    }
  };

  const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    if (data.pending) return { pending: true };
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updated) => {
    const merged = { ...user, ...updated };
    localStorage.setItem('user', JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
