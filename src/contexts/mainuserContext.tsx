/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { User } from './userole';
import { api } from './mainuseAuth';
import toast from "react-hot-toast";

interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  organization: string;
  role: 'STUDENT' | 'PROFESSIONAL' | 'ENGINEER' | 'ADMIN' | 'OTHER';
  password: string;
  agreedToTerms: boolean;
  subscribedToNews?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (form: RegisterForm) => Promise<{ user: User; verification_token: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;




export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Helper to set auth token
  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  };

  // Fixed fetchUserProfile - handles both wrapped and direct responses
  const fetchUserProfile = useCallback(async (): Promise<User> => {
    try {
      const { data: response } = await api.get('/users/profile');

      // Handle both response structures:
      // 1. If your backend uses the interceptor: { success: true, data: user, message: string }
      // 2. If it returns user directly: user

      if (response && typeof response === 'object' && 'data' in response) {
        return response.data as User; // Nested response
      } else {
        return response as User; // Direct response
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const userData = await fetchUserProfile();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setAuthToken(null);
      setUser(null);
      throw error;
    }
  }, [fetchUserProfile]);

  // Auth state initialization
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
          setAuthChecked(true);
        }
        return;
      }

      try {
        // Set token first
        setAuthToken(token);

        // Then fetch user profile
        const userData = await fetchUserProfile();

        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        if (isMounted) {
          setAuthToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setAuthChecked(true);
        }
      }
    };

    checkAuth();
    return () => { isMounted = false; };
  }, [fetchUserProfile]);

  // Fixed login function
  const login = async (email: string, password: string): Promise<User> => {
    try {
      setIsLoading(true);

      // 1. Login request
      const { data: loginResponse } = await api.post('/auth/login', { email, password });

      // 2. Extract token - handle both response structures
      let token: string;

      if (loginResponse && typeof loginResponse === 'object') {
        // Handle nested response: { data: { access_token: string } }
        if ('data' in loginResponse && loginResponse.data && loginResponse.data.access_token) {
          token = loginResponse.data.access_token;
        }
        // Handle direct response: { access_token: string }
        else if ('access_token' in loginResponse) {
          token = loginResponse.access_token;
        } else {
          throw new Error('No access token found in response');
        }
      } else {
        throw new Error('Invalid login response');
      }

      if (!token) {
        throw new Error('No token received from server');
      }

      // 3. Set token and fetch user
      setAuthToken(token);
      const userData = await fetchUserProfile();

      // 4. Update state
      setUser(userData);

      toast.success("You've successfully logged in.");

      return userData;
    } catch (error) {
      // Clear tokens on error
      setAuthToken(null);
      setUser(null);
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed register function
  const register = async (form: RegisterForm) => {
  try {
    setIsLoading(true);

    const { data: registerResponse } = await api.post('/auth/register', form);

    // Expect wrapped response: { success, data }
    if (!registerResponse?.data) {
      throw new Error('Invalid registration response');
    }

    const { user, verification_token } = registerResponse.data;

    if (!user || !verification_token) {
      throw new Error('Incomplete registration response');
    }

    // ❌ DO NOT set token
    // ❌ DO NOT fetch profile
    // ❌ DO NOT authenticate user

    toast.success("Account created. Please check your email to verify your account.");

    return { user, verification_token };
  } catch (error) {
    handleAuthError(error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};



  const logout = async () => {
    try {
      setIsLoading(true);

      // Try to call logout endpoint if token exists
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout endpoint error:', error);
      // Continue with client-side logout even if server fails
    } finally {
      // Always clear client state
      setAuthToken(null);
      setUser(null);
      setIsLoading(false);

      toast.success("You've been successfully logged out");
    }
  };

  const handleAuthError = (error: unknown) => {
    let message = 'An unexpected error occurred';

    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;

      // Handle different error response structures
      if (errorData && typeof errorData === 'object') {
        if ('message' in errorData) {
          message = Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message;
        } else if ('error' in errorData) {
          message = errorData.error;
        }
      }

      // Specific HTTP status messages
      if (error.response?.status === 401) {
        message = 'Invalid email or password';
      } else if (error.response?.status === 403) {
        message = 'Access denied';
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user || !!localStorage.getItem("token"),
    isLoading: isLoading || !authChecked,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};