import { breakpoints, generateMediaQueries } from './breakpoints'
import { palette } from './colors'

export type Sizes = 'sm' | 'md' | 'lg' | 'xl' 

export type Intents = {
  success: string
  error: string
  initial: string
  info: string
}

const sansFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' +
  ' "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", ' +
    '"Noto Color Emoji"'

const fonts = {
  sans: sansFont,
  base: sansFont,
  monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  secondary: 'Lato'
}

const intents: Intents = {
  success: palette.jungleGreen[10],
  error: palette.poppy[10],
  initial: palette.jet[10],
  info: palette.teal[10]
}

export const lightTheme = {
    name: 'light',
    colors: {
      ...palette,
      background: '#fff',
      text: '#141314',
      intents
    },
    paddings: {
      sm: '1rem',
      md: '2rem'
    },
    fonts,
    mediaQueries: generateMediaQueries(breakpoints),
}

export const darkTheme = {
    name: 'dark',
    colors: {
      ...palette,
      background: '#1b1b1d',
      text: '#fff',
      intents
    },
    paddings: {
      sm: '1rem',
      md: '2rem'
    },
    fonts,
    mediaQueries: generateMediaQueries(breakpoints),
}

export type Theme = typeof lightTheme;  




