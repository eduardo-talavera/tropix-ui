
import { FC, forwardRef, type ButtonHTMLAttributes } from 'react'
import { useTheme } from '@emotion/react'
import { buttonStyles, getBtnVariantStyles, getDisabledStyles } from './button.styles'
import { useThemeMode } from '@/context/ThemeContext'
import { loaderStyles } from './loader.styles'


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
  loader?: boolean
  outline?: boolean
  rounded?: boolean
}

export type ButtonSizes = 'sm' | 'md' | 'lg' | 'full'
export type ButtonVariants = 'primary' | 'success' | 'warning' | 'danger' | 'ghost'


const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>
((
  { 
    children, 
    variant = 'primary', 
    disabled = false, 
    outline = false, 
    rounded, 
    size = 'md', 
    loader = false,  
    ...props 
  }, 
  ref
) => {

  const theme = useTheme()
  const styles = buttonStyles(theme, size)

  const { isDark } = useThemeMode()

  return (
    <button 
      css={[styles, getBtnVariantStyles(theme, isDark, outline)[variant], 
        rounded && { borderRadius: '3rem' },
        disabled && getDisabledStyles(outline, theme)
      ]} 
      disabled={disabled}
      ref={ref} 
      {...props}>
       {
        loader ? ( <span css={loaderStyles}></span> ) : ( children )
       } 
    </button>
  )
})

export { Button }
