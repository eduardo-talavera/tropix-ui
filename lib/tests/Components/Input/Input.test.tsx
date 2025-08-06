import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/utils/test-utils/renderWithTheme';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/Input/Input';

describe('Input', () => {
  it('renderiza el label correctamente', () => {
    render(<Input label="Nombre" name="nombre" id="nombre" value="" />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  });

  it('llama a onChange cuando cambia el valor', () => {
    const onChange = vi.fn();
    render(<Input label="Email" name="email" id='email' value="" onChange={onChange} />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: 'test@a.com' } });
    expect(onChange).toHaveBeenCalledWith('test@a.com');
  });

  it('muestra el icono si se pasa como prop', () => {
    const Icon = () => <svg data-testid="icon" />;
    render(<Input label="Con icono" name="icon" value="" icon={<Icon />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('muestra el icono de búsqueda si type es search', () => {
    render(<Input label="Buscar" name="buscar" value="" type="search" />);
    expect(screen.getByTestId('lucide-search')).toBeInTheDocument();
  });

  it('muestra el icono de ojo para password y permite alternar visibilidad', () => {
    render(<Input label="Clave" name="clave" value="" type="password" />);
    const eyeOff = screen.getByTestId('lucide-eye-off');
    expect(eyeOff).toBeInTheDocument();
    fireEvent.click(eyeOff);
    expect(screen.getByTestId('lucide-eye')).toBeInTheDocument();
  });

  it('muestra el mensaje de error si intent es error', () => {
    render(
      <Input
        label="Error"
        name="error"
        value=""
        intent="error"
        errorMessage="Campo requerido"
      />
    );
    expect(screen.getByText(/campo requerido/i)).toBeInTheDocument();
  });

  it('renderiza el valor currency correctamente', () => {
    render(
      <Input
        label="Dinero"
        name="dinero"
        value={1234}
        type="currency"
        onValueChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue('$12.34')).toBeInTheDocument();
  });

  it('llama a onValueChange en currency al presionar teclas válidas', () => {
    const onValueChange = vi.fn();
    render(
      <Input
        label="Dinero"
        name="dinero"
        id='dinero'
        value={1}
        type="currency"
        onValueChange={onValueChange}
      />
    );
    const input = screen.getByLabelText(/dinero/i);
    fireEvent.keyDown(input, { key: '2', keyCode: 50 });
    expect(onValueChange).toHaveBeenCalled();
  });
});