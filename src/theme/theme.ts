import { breakpoints, generateMediaQueries } from './breakpoints'
import { palette } from './colors'

export type Sizes = 'sm' | 'md' | 'lg' | 'xl' 

const sansFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' +
  ' "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", ' +
    '"Noto Color Emoji"'

const fonts = {
  sans: sansFont,
  base: sansFont,
  monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  secondary: 'Lato'
}

export const lightTheme = {
    name: 'light',
    colors: {
      ...palette,
      background: '#fff',
      text: '#141314'
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
      background: '#1e1d1d',
      text: '#fff'
    },
    paddings: {
      sm: '1rem',
      md: '2rem'
    },
    fonts,
    mediaQueries: generateMediaQueries(breakpoints),
}

export type Theme = typeof lightTheme;  




