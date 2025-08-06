'use client';

import { useTheme, css } from "@emotion/react";
import { useProgress } from "./Container";
import { useEffect, useState } from "react";

export const Label: React.FC<{ text: string }> = ({ text }) => {

  const { value } = useProgress();
  const theme = useTheme();

  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    let frameId: number;
    const duration = 1000; // duración de animación en ms
    const start = performance.now();
    const initial = animatedValue;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = initial + (value - initial) * progress;
      setAnimatedValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  const roundedValue = Math.round(animatedValue);



  return (
    <div
      css={css`
        position: relative;
        text-align: center;
      `}
    >
      <div
        css={css`
          font-size: 18px;
          font-weight: bold;
          font-family: ${theme.fonts.base};
          color: ${theme.colors.text}
        `}
      >
        <span>{ text }</span> <br />
       <span>{ roundedValue }%</span>
      </div>
    </div>
  );
};
