import { render } from '@testing-library/react'
import { CircularProgress } from '@/components/CircularProgress/CircularProgress';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';


const CircularProgressProvider = ({ children }: { children: ReactElement }) => {
  return (
    <ThemeProvider>
      <CircularProgress progressColors={['#ff0000', '#00ff00']}>
      { children }
    </CircularProgress>
    </ThemeProvider>
  )
}

interface CustomRenderOptions extends Omit<Parameters<typeof render>[1], 'wrapper'> {}


const customRender: (ui: ReactElement | ReactElement[], options?: CustomRenderOptions) => ReturnType<typeof render> =
    (ui, options) =>
        render(ui, { wrapper: CircularProgressProvider as React.JSXElementConstructor<{ children: ReactNode }>, ...options });

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}