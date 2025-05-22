import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useThemeMode } from '../../context/ThemeContext';

const Consumer = () => {
  const { isDark, toggleTheme, setIsDark } = useThemeMode();
  return (
    <div>
      <span data-testid="theme">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setIsDark(true)}>setDark</button>
      <button onClick={() => setIsDark(false)}>setLight</button>
    </div>
  );
};

describe('ThemeProvider', () => {

  it('provee el valor inicial según el sistema', () => {
    // Simula prefers-color-scheme: dark
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as any;

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toMatch(/dark|light/);
  });


  it('toggleTheme cambia el valor de isDark', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    const theme = screen.getByTestId('theme');
    const toggle = screen.getByText('toggle');
    const initial = theme.textContent;
    fireEvent.click(toggle)
    expect(theme.textContent).not.toBe(initial);
  });


  it('setIsDark(true) fuerza modo oscuro', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    const theme = screen.getByTestId('theme');
    const setDark = screen.getByText('setDark');
    fireEvent.click(setDark);
    expect(theme.textContent).toBe('dark');
  });
  

  it('setIsDark(false) fuerza modo claro', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    const theme = screen.getByTestId('theme');
    const setLight = screen.getByText('setLight');
    fireEvent.click(setLight);
    expect(theme.textContent).toBe('light');
  });
});