import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('useAuth must be used within an AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      console.log('AuthProvider: Checking saved authentication...');
      const savedUser = Cookies.get('vividara_user');
      const savedToken = Cookies.get('vividara_token');
      
      if (savedUser && savedToken) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthProvider: Found saved user:', parsedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          logout();
        }
      } else {
        console.log('AuthProvider: No saved authentication found');
      }
    } catch (error) {
      console.error('AuthProvider initialization error:', error);
    } finally {
      setLoading(false);
      console.log('AuthProvider: Initialization complete');
    }
  }, []);

  const login = (userData, token) => {
    try {
      console.log('AuthProvider: Logging in user:', userData);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in cookies for persistence
      Cookies.set('vividara_user', JSON.stringify(userData), { expires: 7 });
      Cookies.set('vividara_token', token, { expires: 7 });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signUp = (userData) => {
    try {
      console.log('AuthProvider: Signing up user:', userData);
      
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('vividara_users') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.find(user => user.email === userData.email);
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Add new user to local storage
      const newUser = {
        ...userData,
        id: Date.now().toString(), // Simple ID generation
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('vividara_users', JSON.stringify(existingUsers));
      
      // Auto-login the new user
      login(newUser, `local_token_${newUser.id}`);
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  };

  const signIn = (email, password) => {
    try {
      console.log('AuthProvider: Signing in user:', email);
      
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('vividara_users') || '[]');
      
      // Find user by email and password
      const user = existingUsers.find(user => 
        user.email === email && user.password === password
      );
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Login the user
      login(user, `local_token_${user.id}`);
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    try {
      console.log('AuthProvider: Logging out user');
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear cookies
      Cookies.remove('vividara_user');
      Cookies.remove('vividara_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signUp,
    signIn,
    logout
  };

  console.log('AuthProvider render:', { isAuthenticated, loading, user: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};