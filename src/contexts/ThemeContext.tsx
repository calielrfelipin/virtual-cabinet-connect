
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  updateColors: (primary: string, secondary: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#f1f5f9");

  const updateColors = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    
    // Aplicar as cores às variáveis CSS
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
    
    // Salvar no localStorage
    localStorage.setItem('theme-colors', JSON.stringify({ primary, secondary }));
  };

  useEffect(() => {
    // Carregar cores salvas
    const savedColors = localStorage.getItem('theme-colors');
    if (savedColors) {
      const { primary, secondary } = JSON.parse(savedColors);
      updateColors(primary, secondary);
    } else {
      // Aplicar cores padrão na primeira carga
      document.documentElement.style.setProperty('--color-primary', primaryColor);
      document.documentElement.style.setProperty('--color-secondary', secondaryColor);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ primaryColor, secondaryColor, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
