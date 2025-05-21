// theme/ThemeProvider.tsx
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme, type Theme } from '../theme/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
  setIsDark: () => {}
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
     return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const className = 'dark-mode';
    if (isDark) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, setIsDark }}>
      <EmotionThemeProvider theme={theme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
