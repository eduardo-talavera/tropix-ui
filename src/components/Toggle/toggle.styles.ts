import { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { ToggleSizes, type ToggleVariants } from "./Toggle";

type ToggleStylesArgs = {
  theme: Theme;
  variant: ToggleVariants;
  toggled: boolean;
  isThemeSwitch: boolean;
  size: ToggleSizes;
  disabled: boolean;
  isDark: boolean;
}

type GetThumbColorProps = {
    theme: Theme
    isThemeSwitch: boolean
    toggled: boolean
    isDark: boolean
    isHover?: boolean
}

type getBackgrounColordByHover = {
    isDark: boolean
    disabled: boolean
    theme: Theme
    variant: ToggleVariants
    toggled: boolean
}

const getBackgroundImage = (toggled: boolean) => ( 
    { 
        backgroundImage: `url(https://res.cloudinary.com/do58bq7uo/image/upload/${toggled 
            ? 'v1747394564/fzhxph4wpdt4dyhv6kd4' : 'p2dpctjsyo4oucfbfouw'}.png)`
    } 
)
   
const getThumbColor = ({ theme, isThemeSwitch, toggled, isDark, isHover = false }: GetThumbColorProps) => {
    if (isThemeSwitch && toggled)
        return  '#d3d3d3'

    if (isThemeSwitch && !toggled)
        return 'yellow'

    if (toggled) return isDark ? theme.colors.background : '#fff'

    return isDark 
        ? isHover
            ? theme.colors.jet[7]
            : theme.colors.jet[4] 
        : '#fff'
}

const getStylesByHover = ({ isDark, theme, variant, disabled, toggled }: getBackgrounColordByHover) => isDark
    ?  ({
        borderColor: theme.colors.jet[7],
        ['> .thumb']: {
            backgroundColor: (!toggled) ? theme.colors.jet[7] : undefined,
        }
    })
    :  ({
        backgroundColor: (disabled || !toggled) ? theme.colors.jet[7] : theme.colors[variant][12]
    })

const togleSizes = {
    sm: {
        width: '36px',
        height: '18px'
    },
    md: {
        width: '50px',
        height: '28px',
    },
    lg: {
        width: '70px',
        height: '37px'
    }
}

const thumbSizes = {
    sm: {
        width: '12px',
        height: '12px'
    },
     md: {
        height: '20px',
        width: '20px',
    },
    lg: {
        width: '28px',
        height: '28px'
    }
}

const darkAndNotToggledThumbSizes = {
    sm: {
        width: '8px',
        height: '8px'
    },
     md: {
        height: '16px',
        width: '16px',
    },
    lg: {
        width: '24px',
        height: '24px'
    }
}

const toggleLefts = {
    sm: 'calc(50px - 30px)',
    md: 'calc(50px - 25px)',
    lg: 'calc(50px - 13px)'
}

const getInitialBackgroudColor = (isDark: boolean, theme: Theme) => isDark 
    ?  { backgroundColor: theme.colors.background }
    :  { backgroundColor: theme.colors.jet[3] }

const getInitialBorder = (isDark: boolean, theme: Theme, isThemeSwitch: boolean) => isDark 
    ?  isThemeSwitch 
        ? { border: 'none' }  
        : { border: `2px solid ${theme.colors.jet[4]}`}
    :  { border: 'none' }    

export const toggleStyles = ({ theme, variant, toggled, isThemeSwitch, size, disabled, isDark }: ToggleStylesArgs) => ({
    toggleBtn: css({
        ...(isThemeSwitch ? getBackgroundImage(toggled) : getInitialBackgroudColor(isDark, theme)),
        backgroundSize: 'cover',
        borderRadius: '99px',
        ...(togleSizes[size]),
        transition: 'background-color 0.1s ease, border-color 0.2s ease',
        ...(getInitialBorder(isDark, theme, isThemeSwitch)),
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
         ['&:hover']: {
            ...(getStylesByHover({ isDark, disabled, theme, variant, toggled }))
        }
    }),
    toggled: css({
        backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][isDark ? 8 : 10],
        border: 'none',
         ['&:hover']: {
            backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][12]
        }
    }),
    thumb: css({
        ...((!toggled && isDark) ? darkAndNotToggledThumbSizes[size] : thumbSizes[size]),
        backgroundColor: getThumbColor({theme, isThemeSwitch, toggled, isDark }),
        borderRadius: '99px',
        transition: 'left  0.15s ease',
        position: 'absolute',
        left:(!toggled && isDark) ? '5px' : '3px',
        top: '50%',
        transform: 'translateY(-50%)'
    }),
    toggledThumb: css({
        left: toggleLefts[size]
    })
})