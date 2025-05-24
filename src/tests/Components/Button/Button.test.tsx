import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../../components/Button/Button';

describe('Button', () => {

  it('renderiza el texto correctamente', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('llama a onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando se pasa la prop disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

    it('aplica clases adicionales si se pasan por className', () => {
    render(<Button className="extra-class">Con clase</Button>);
    expect(screen.getByText('Con clase')).toHaveClass('extra-class');
  });

  it('no llama a onClick si está deshabilitado', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>No click</Button>);
    fireEvent.click(screen.getByText('No click'));
    expect(handleClick).not.toHaveBeenCalled();
  });

});