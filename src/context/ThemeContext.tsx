import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

/** 默认深色：只有显式存过 'light' 才用浅色 */
function getStoredTheme(): Theme {
  try {
    if (localStorage.getItem('theme') === 'light') return 'light';
  } catch { /* localStorage unavailable */ }
  return 'dark';
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    // index.html 的内联脚本在首帧前已设置过 class，这里保持后续切换同步
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
