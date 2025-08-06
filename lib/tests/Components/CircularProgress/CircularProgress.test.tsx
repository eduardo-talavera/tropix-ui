import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils/renderWithTheme';
import { describe, it, expect } from 'vitest';
import { CircularProgress } from '@/components/CircularProgress/CircularProgress';

describe('CircularProgress', () => {
  it('renderiza el componente principal', () => {
    render(<CircularProgress />);
    // Busca por rol, label o cualquier texto esperado en Container
    expect(screen.getByRole('container')).toBeInTheDocument();
  });

  it('renderiza el subcomponente Circle', () => {
    render(<CircularProgress>
      <CircularProgress.Circle enableTransition={true} />
    </CircularProgress>);
    // Busca por algún atributo, clase o estructura esperada en Circle
    // Aquí asumimos que Circle renderiza un <circle> SVG
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renderiza el subcomponente Thumb', () => {
    render(<CircularProgress>
      <CircularProgress.Thumb />
    </CircularProgress>);
    // Busca por algún elemento esperado en Thumb
    // Por ejemplo, si Thumb es un círculo pequeño, podrías buscar por testId
    expect(screen.getByTestId('circular-thumb')).toBeInTheDocument();
  });

  it('renderiza el subcomponente Label con el texto correcto', () => {
    render(<CircularProgress>
      <CircularProgress.Label text="Progreso" />
    </CircularProgress>);

    expect(screen.getByText('Progreso')).toBeInTheDocument();
  });
});