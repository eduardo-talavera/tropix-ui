/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@emotion/react';
import { useThemeMode } from '@/context/ThemeContext';

export type AvatarVariants = 'jungleGreen' | 'cobaltBlue' | 'poppy' | 'sunGlow'

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariants
  children?: React.ReactNode;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: '32px',
  md: '48px',
  lg: '64px',
};

const StyledAvatar = styled.div<{ size: AvatarSize, variant: AvatarVariants, theme: Theme, isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.base};
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ variant, theme, isDark }) => theme.colors[variant][isDark ? 9 : 11]  };
  font-size: ${({ size }) => (size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.25rem')};
  font-weight: 500;
  color: ${({ isDark, theme }) => isDark ? theme.colors.jet[20] : theme.colors.jet[0]};
  user-select: none;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', children, variant = 'cobaltBlue', ...rest }) => {
  const theme = useTheme()
  const { isDark } = useThemeMode()
  return (
    <StyledAvatar size={size} theme={theme} variant={variant} isDark={isDark} {...rest}>
      {src ? <StyledImage src={src} alt={alt} /> : children}
    </StyledAvatar>
  );
};
