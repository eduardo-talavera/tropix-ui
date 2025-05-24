import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import { describe, it, expect } from 'vitest';
import { Avatar } from '@/components/Avatar/Avatar';

describe('Avatar', () => {
    
  it('renderiza la imagen si se pasa src', () => {
    render(<Avatar src="foto.jpg" alt="Mi avatar" />);
    const img = screen.getByAltText('Mi avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'foto.jpg');
  })

  it('renderiza los children si no hay src', () => {
    render(<Avatar>AB</Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  })
})