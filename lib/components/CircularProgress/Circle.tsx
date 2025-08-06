import { useTheme } from "@emotion/react";
import { sizePropertyVariants, useProgress } from "./Container";
import { useThemeMode } from '@/context/ThemeContext';
import { useId } from "react";

export const Circle: React.FC<{ enableTransition?: boolean }> = ({ enableTransition = false }) => {
  const { value, max, size, progressColors } = useProgress();
  const radius = sizePropertyVariants[size].radius;
  const stroke = 25;
  const normalizedRadius = radius - stroke / 2;
  const circumference = (normalizedRadius * 2 * Math.PI) + 5;
  const strokeDashoffset =
    circumference - (value / max) * circumference;

  const theme = useTheme();  
  const { isDark } = useThemeMode();
  const id = useId();

  return (
    <svg
      role="progressbar"
      height={radius * 2}
      width={radius * 2}
      style={{ 
        position: 'absolute',
        top: 0, 
        left: 0,
        overflow: 'visible' 
      }}
    >
      <circle
        stroke={isDark ? '#d387ff26' : '#68586e33'}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={`url(#gradient-${id})`}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset,
          transition: enableTransition ? 'stroke-dashoffset 0.3s ease-out' : undefined,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          filter: `url(#shadow-${id})`
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={progressColors[0]} />
          <stop offset="100%" stopColor={progressColors[1]} />
        </linearGradient>

        <filter id={`shadow-${id}`} colorInterpolationFilters="sRGB">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor={theme.colors.text} floodOpacity="0.5"/>
        </filter>
      </defs>
    </svg>
  );
};