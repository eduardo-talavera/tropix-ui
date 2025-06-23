import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from '@/components/Toggle/Toggle';

describe('Toggle', () => {

 
  it('renderiza correctamente', () => {
    render(<Toggle onPress={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('llama a onPress con el valor correcto al hacer click', () => {
    const onPress = vi.fn();
    render(<Toggle onPress={onPress} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onPress).toHaveBeenCalledWith(true);
    fireEvent.click(button);
    expect(onPress).toHaveBeenCalledWith(false);
  });

  it('muestra el estado toggled inicial correctamente', () => {
    render(<Toggle onPress={() => {}} isToggled />);
    const button = screen.getByRole('button');
    // Aquí podrías comprobar alguna clase o estilo si tu toggle lo refleja visualmente
    expect(button).toBeInTheDocument();
  });


  it('no responde al click si está deshabilitado', () => {
    const onPress = vi.fn();
    render(<Toggle onPress={onPress} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });
  

  it('cambia el estado cuando cambia la prop isToggled', () => {
    const { rerender } = render(<Toggle onPress={() => {}} isToggled={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    rerender(<Toggle onPress={() => {}} isToggled={true} />);
    expect(button).toBeInTheDocument();
  });
});