import { render } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext'

const TropixUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      { children }
    </ThemeProvider>
  )
}

interface CustomRenderOptions extends Omit<Parameters<typeof render>[1], 'wrapper'> {}


const customRender: (ui: React.ReactElement, options?: CustomRenderOptions) => ReturnType<typeof render> =
    (ui, options) =>
        render(ui, { wrapper: TropixUiProvider, ...options });

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}