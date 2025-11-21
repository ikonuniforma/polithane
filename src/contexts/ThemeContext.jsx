import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const defaultTheme = {
  primaryColor: '#009FD6',
  secondaryColor: '#10b981',
  accentColor: '#f59e0b',
  dangerColor: '#ef4444',
  backgroundColor: '#f9fafb',
  textColor: '#111827',
  borderRadius: '0.75rem',
  fontFamily: 'Inter, system-ui, sans-serif',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--danger-color', theme.dangerColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);
    
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, darkMode]);

  // Update theme
  const updateTheme = (newTheme) => {
    const updatedTheme = { ...theme, ...newTheme };
    setTheme(updatedTheme);
    localStorage.setItem('theme', JSON.stringify(updatedTheme));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Reset to default
  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem('theme');
  };

  const value = {
    theme,
    darkMode,
    updateTheme,
    toggleDarkMode,
    resetTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
