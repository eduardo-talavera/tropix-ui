
import { useTheme } from "@emotion/react"
import { FC, forwardRef, HTMLAttributes, useEffect, useState } from "react"
import { toggleStyles } from "./toggle.styles"
import { useThemeMode } from "@/context/ThemeContext"

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
    onPress: (tooggled: boolean) => void
    isToggled?: boolean
    variant?: ToggleVariants
    disabled?: boolean
    isThemeSwitch?: boolean
    size?: ToggleSizes
}

export type ToggleSizes = 'sm'| 'md' | 'lg'

export type ToggleVariants = 'jungleGreen' | 'cobaltBlue' | 'poppy' | 'sunGlow'

export const Toggle: FC<ToggleProps> = forwardRef<HTMLDivElement, ToggleProps>
(({ onPress, isToggled = false, variant = 'jungleGreen', disabled = false, isThemeSwitch = false, size = 'md', ...props }, ref) => {
  
 const [toggled, setToggled] = useState(isToggled) 
 
 const handleClick = (): void => {
    setToggled(!toggled)
    onPress(!toggled)
 }

 const theme = useTheme()
 const { isDark } = useThemeMode()
 const styles = toggleStyles({ theme, variant, toggled, isThemeSwitch, size, disabled, isDark })

 useEffect(() => {
  setToggled(isToggled)
 }, [isToggled])

  return (
    <div 
        ref={ref}
        {...props}
    >
      <button
        css={[
          styles.toggleBtn, 
          toggled && styles.toggled,
          disabled && { pointerEvents: 'none' }
        ]}
        disabled={disabled}
        onClick={handleClick}
      >
        <div className='thumb' css={[styles.thumb, toggled && styles.toggledThumb]}>
        </div>
      </button>
    </div>
  )
})

