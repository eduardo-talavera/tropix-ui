import { css, type Theme } from "@emotion/react";
import Values from "values.js";
import { ButtonSizes } from "./Button";


type BaseColor = 'jungleGreen' | 'cobaltBlue' | 'poppy' | 'sunGlow'

export const getBtnVariantStyles = (theme: Theme, isDark: boolean, outline: boolean) => {

  const colorVariants: Record<BaseColor, number> = {
    cobaltBlue: isDark ? 16 : 2,
    jungleGreen: isDark ? 16 : 1,
    sunGlow: isDark ? 16 : 15,
    poppy: isDark ? 16 : 1
  };

  const commonScaleColor = isDark ? 8 : 10

  const getVariantByOutline = (baseColor: BaseColor) => outline ? (
      {
        background: 'transparent',
        border: `2px solid ${theme.colors[baseColor][commonScaleColor]}`,
        color: theme.colors[baseColor][commonScaleColor],
      }
    ) : (
      {
        background: theme.colors[baseColor][commonScaleColor],
        border: `2px solid ${theme.colors[baseColor][commonScaleColor]}`,
        color: theme.colors[baseColor][colorVariants[baseColor]],
      }
    );

  const getTextColorVariantByHover = (baseColor: BaseColor) => outline ? (
      {
        color: theme.colors[baseColor][colorVariants[baseColor]],
      }
    ) : null

  return ({
    primary: css({
         ...(getVariantByOutline('cobaltBlue')),
         ['&:hover']: {
            background: theme.colors.cobaltBlue[isDark ? 10 : 12],
            border: `2px solid ${theme.colors.cobaltBlue[isDark ? 10 : 12]}`,
             ...(getTextColorVariantByHover('cobaltBlue'))
         }
    }),
    success: css({
          ...(getVariantByOutline('jungleGreen')),
         ['&:hover']: {
            background: theme.colors.jungleGreen[isDark ? 11 : 12],
            border: `2px solid ${theme.colors.jungleGreen[isDark ? 11 : 12]}`,
            ...(getTextColorVariantByHover('jungleGreen'))
         }
    }),
    warning: css({
          ...(getVariantByOutline('sunGlow')),
         ['&:hover']: {
            background: theme.colors.sunGlow[isDark ? 11 : 11],
            border: `2px solid ${theme.colors.sunGlow[isDark ? 11 : 11]}`,
            ...(getTextColorVariantByHover('sunGlow'))
         }
    }),
    danger: css({
          ...(getVariantByOutline('poppy')),
         ['&:hover']: {
            background: theme.colors.poppy[isDark ? 10 : 11],
            border: `2px solid ${theme.colors.poppy[isDark ? 10 : 11]}`,
            ...(getTextColorVariantByHover('poppy'))
         }
    }),
    ghost: css({
        backgroundColor: 'transparent',
        color: theme.colors.jungleGreen[10],
        borderWidth: 0,
        ['&:hover']: {
            backgroundColor: isDark ? '#83d3be45' : theme.colors.jungleGreen[1],
        }
    })
})
}

const getSizesHelper = (size: ButtonSizes) => {
   switch (size) {
    case 'sm':
      return {
        width: '150px',
        height: '40px'
      }  
    case 'md':
      return {
        width: '200px',
        height: '50px'
      }  
    case 'lg':
      return {
        width: '250px',
        height: '60px'
      }  
    case 'full':
      return {
        width: '100%',
        height: '60px'
      }    
    default:
        return {
            width: '200px',
            height: '50px'
        }
   }
}

export const getDisabledStyles = (outline: boolean, theme: Theme) => 
  outline ? css(
    {
      background: 'transparent',
      border: `2px solid ${theme.colors.jet[3]}`,
      color: theme.colors.jet[3],
      pointerEvents: 'none',
      cursor: 'not-alowed'
    }
  ) : css(
    {
      background: theme.colors.jet[3],
      border: `2px solid ${theme.colors.jet[3]}`,
      color: theme.colors.jet[1],
      pointerEvents: 'none',
      cursor: 'not-alowed'
    }
  )


export const buttonStyles = (theme: Theme, size: ButtonSizes) => css({
    boxSizing: 'border-box',
    width: getSizesHelper(size).width,
    height: getSizesHelper(size).height,
    borderWidth: 0,
    borderBlockColor: 'inherit',
    outline: 'none',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.fonts.base,
    fontWeight: 'bold',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.15s ease'
})