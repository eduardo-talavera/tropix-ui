import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils/RenderWithCirclreProgressProvider';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Circle } from '@/components/CircularProgress/Circle';


vi.mock('@/context/ThemeContext', async () => {
  const actual = await vi.importActual<typeof import('@/context/ThemeContext')>(
    '@/context/ThemeContext'
  )

  return {
    ...actual,
    useThemeMode: () => ({ mode: 'dark', toggle: () => {} }),
  }
})
vi.mock('@/components/CircularProgress/CircularProgress', async () => {
  const actual = await vi.importActual<typeof import('@/components/CircularProgress/CircularProgress')>(
    '@/components/CircularProgress/CircularProgress'
  )

  return {
    ...actual,
    // puedes sobrescribir aquí si lo deseas, o dejarlo igual
    //CircularProgress: actual.CircularProgress,
    useProgress: () => ({
      value: 50,
      max: 100,
      size: 'md',
      progressColors: ['#ff0000', '#00ff00'],
  }),
    sizePropertyVariants: {
      md: { radius: 40 }
    }
  }
})


describe('Circle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el SVG con role="progressbar"', () => {
    render(<Circle />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renderiza dos elementos <circle>', () => {
    render(<Circle />);
    const circles = screen.getByRole('progressbar').querySelectorAll('circle');
    expect(circles.length).toBe(2);
  });

  it('aplica el color de fondo correcto según isDark', () => {
    render(<Circle />);
    const circles = screen.getByRole('progressbar').querySelectorAll('circle');
    // El primer círculo es el fondo
    expect(circles[0]).toHaveAttribute('stroke', '#68586e33');
  });

  it('aplica el gradiente y filtro en el círculo de progreso', () => {
    render(<Circle />);
    const circles = screen.getByRole('progressbar').querySelectorAll('circle');
    // El segundo círculo es el progreso
    expect(circles[1].getAttribute('stroke')).toMatch(/url\(#gradient-/);
    expect(circles[1].style.filter).toMatch(/url\(#shadow-/);
  });

  it('aplica la transición si enableTransition es true', () => {
    render(<Circle enableTransition />);
    const circles = screen.getByRole('progressbar').querySelectorAll('circle');
    expect(circles[1].style.transition).toContain('stroke-dashoffset');
  });

  it('renderiza los elementos <defs>, <linearGradient> y <filter>', () => {
    render(<Circle />);
    const svg = screen.getByRole('progressbar');
    expect(svg.querySelector('defs')).toBeInTheDocument();
    expect(svg.querySelector('linearGradient')).toBeInTheDocument();
    expect(svg.querySelector('filter')).toBeInTheDocument();
  });
});