import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Initialize auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Login function - DEMO MODE: Her bilgiyle giriş yapar!
  const login = async (email, password) => {
    try {
      // DEMO MODE: Her bilgiyle giriş yapılabilir
      const demoUser = {
        user_id: 999,
        email: email,
        full_name: 'Demo Kullanıcı',
        username: 'demo',
        user_type: 'admin', // Admin yetkisi
        is_admin: true,
        verification_badge: true,
        profile_image: 'https://i.pravatar.cc/150?u=' + email,
        created_at: new Date().toISOString(),
      };
      
      const demoToken = 'demo_token_' + Date.now();
      
      // Save to state and localStorage
      setToken(demoToken);
      setUser(demoUser);
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      return { success: true, user: demoUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function - DEMO MODE
  const register = async (userData) => {
    try {
      const demoUser = {
        user_id: Date.now(),
        email: userData.email,
        full_name: userData.full_name,
        username: userData.username,
        user_type: userData.user_type || 'normal',
        is_admin: false,
        verification_badge: false,
        profile_image: 'https://i.pravatar.cc/150?u=' + userData.email,
        created_at: new Date().toISOString(),
      };
      
      const demoToken = 'demo_token_' + Date.now();
      
      setToken(demoToken);
      setUser(demoUser);
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      return { success: true, user: demoUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Update user function
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.is_admin) return true;
    return user.permissions?.includes(permission);
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.is_admin === true || user?.user_type === 'admin';
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
    isAdmin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
