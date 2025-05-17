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
}

const getBackgroundImage = (toggled: boolean) => ( 
    { 
        backgroundImage: `url(https://res.cloudinary.com/do58bq7uo/image/upload/${toggled 
            ? 'v1747394564/fzhxph4wpdt4dyhv6kd4' : 'p2dpctjsyo4oucfbfouw'}.png)`
    } 
)
   
const getThumbColor = (isThemeSwitch: boolean, toggled: boolean) => {
    if (isThemeSwitch && toggled)
        return  '#d3d3d3'

    if (isThemeSwitch && !toggled)
        return 'yellow'

    return '#fff'
}

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

const toggleLefts = {
    sm: 'calc(50px - 30px)',
    md: 'calc(50px - 25px)',
    lg: 'calc(50px - 13px)'
}

export const toggleStyles = ({ theme, variant, toggled, isThemeSwitch, size, disabled }: ToggleStylesArgs) => ({
    toggleBtn: css({
        ...(isThemeSwitch ? getBackgroundImage(toggled) : { backgroundColor: theme.colors.jet[3] }),
        backgroundSize: 'cover',
        borderRadius: '99px',
        ...(togleSizes[size]),
        transition: 'background-color 0.1s ease, border-color 0.2s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderWidth: 0,
        position: 'relative',
         ['&:hover']: {
            backgroundColor: '#6f6f6f'
        }
    }),
    toggled: css({
        backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][10],
         ['&:hover']: {
            backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][12]
        }
    }),
    thumb: css({
        ...(thumbSizes[size]),
        backgroundColor: getThumbColor(isThemeSwitch, toggled),
        borderRadius: '99px',
        transition: 'left  0.15s ease',
        position: 'absolute',
        left: '3px',
        top: '50%',
        transform: 'translateY(-50%)'
    }),
    toggledThumb: css({
        left: toggleLefts[size]
    })
})