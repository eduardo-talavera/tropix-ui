
import { useThemeMode } from '@/context/ThemeContext';
import { sizePropertyVariants, useProgress } from "./Container";
import { MouseEvent, TouchEvent } from 'react';
import { css } from '@emotion/react';

export const Thumb: React.FC = () => {
  const { value, max, update, size, progressColors } = useProgress();
  const radius = sizePropertyVariants[size].radius;
  const stroke = 25;
  const normalizedRadius = radius - stroke / 2;
  const center = sizePropertyVariants[size].radius;
  const angle = (value / max) * 360;
  const radians = (angle - 90) * (Math.PI / 180);
  const x = center + normalizedRadius * Math.cos(radians);
  const y = center + normalizedRadius * Math.sin(radians);
  const { isDark } = useThemeMode();

  const calculateValueFromEvent = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    const percentage = ((angle < 0 ? 360 + angle : angle) / 360) * 100;
    update(Math.round((percentage / 100) * max));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    if (e.buttons === 1) {
      calculateValueFromEvent(e.clientX, e.clientY, rect);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      calculateValueFromEvent(touch.clientX, touch.clientY, rect);
    }
  };

  return (
    <div
      data-testid="circular-thumb"
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: ${(sizePropertyVariants[size].radius * 2) + 50}px;
        height: ${(sizePropertyVariants[size].radius * 2) + 50}px;
        cursor: grab;
      `}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div
        css={css`
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, ${progressColors[0]}, ${progressColors[1]});
          border-radius: 50%;
          transform: translate(-50%, -50%);
          top: ${y}px;
          left: ${x}px;
          box-shadow: 0 0 6px ${isDark ? 'rgba(225, 220, 229, 0.64)' : 'rgba(0, 0, 0, 0.3)'};
        `}
      />
    </div>
  );
};

