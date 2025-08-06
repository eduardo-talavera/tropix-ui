'use client';

import { css } from "@emotion/react";
import { createContext, ReactElement, useContext, useState } from "react";


interface ProgressContextType {
  value: number;
  max: number;
  size: CircularProgressSize
  progressColors: [string, string]
  update: (val: number) => void;
}


export type CircularProgressSize = 'sm' | 'md' | 'lg'

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};

export interface ContainerProps {
  children?: ReactElement | ReactElement[];
  size?: CircularProgressSize
  progressColors?: [string, string]
  initialValue?: number
}

export const sizePropertyVariants = {
  sm: {
    radius: 90
  },
  md: {
    radius: 120
  },
  lg: {
    radius: 150
  }
}

export const Container = ({ 
  children, 
  size = 'sm', 
  progressColors = ['#9233e4', '#7b1fa2'], 
  initialValue = 0
 }: ContainerProps) => {
  const [value, setValue] = useState<number>(initialValue);
  const [max] = useState<number>(100);
  const update = (val: number) => setValue(Math.max(0, Math.min(max, val)));

  return (
    <ProgressContext.Provider value={{ value, max, update, size, progressColors }}>
      <div
        role="container"
        css={css`
          width: ${sizePropertyVariants[size].radius * 2}px;
          height: ${sizePropertyVariants[size].radius * 2}px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {children}
      </div>
    </ProgressContext.Provider>
  );
};
