import { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { ToggleSizes, type ToggleVariants } from "./Toggle";

const getBackgroundImage = (toggled: boolean) => ( 
    { backgroundImage: `url(../../public/${toggled ? 'noche' : 'dia'}.png)`} 
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


export const toggleStyles = 
(theme: Theme, variant: ToggleVariants, toggled: boolean, isThemeSwitch: boolean, size: ToggleSizes, disabled: boolean) => ({
    toggleBtn: css({
        ...(isThemeSwitch ? getBackgroundImage(toggled) : { backgroundColor: theme.colors.jet[3] }),
        backgroundSize: 'cover',
        border: '1px solid #aaa',
        borderRadius: '99px',
        ...(togleSizes[size]),
        transition: 'background-color 0.1s ease, border-color 0.2s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.748)',
        position: 'relative',
         ['&:hover']: {
            backgroundColor: '#6f6f6f'
        }
    }),
    toggled: css({
        backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][8],
         ['&:hover']: {
            backgroundColor: disabled ? theme.colors.jet[3] : theme.colors[variant][10]
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