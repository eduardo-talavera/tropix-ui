import { Theme, css } from "@emotion/react";
import { Intent, InputSize } from './Input';

const sizeWrapperStyles = {
    sm: { height: '1.8rem', minWidth: 150, maxWidth: 200 },
    md: { height: '3rem', minWidth: 250, maxWidth: 300 },
    lg: { height: '3.5rem', minWidth: 450, maxWidh: 600 }
}

const sizeInputStyles = {
    sm: { fontSize: '0.8rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.2rem' }
}

const sizeIconStyles = {
    sm: { height: '0.8rem' },
    md: { height: '1.2rem' },
    lg: { height: '1.4rem' }
}

export const inputStyles = (theme: Theme, intent: Intent, isDark: boolean, size: InputSize) => ({
    labelAndInputWrapper: css({
        display: 'flex',
        flexDirection: 'column',
         [':hover']: {
           ['> label']: {
                color: (intent !== 'error' && intent !== 'success') 
                    ? theme.colors.intents.info : undefined
           }
        },
    }),
    inputWrapper: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        ...(sizeWrapperStyles[size]),
        boxSizing: 'border-box',
        padding: '0.5rem 1rem',
        borderRadius: '0.3rem',
        background: isDark ? 'transparent' : '#fff',
        border: `2px solid ${theme.colors.intents[intent as keyof typeof theme.colors.intents]}`,
        ':focus': {
            borderColor: (intent !== 'error' && intent !== 'success') 
            ? theme.colors.intents.info : undefined
        },
        ':hover': {
            borderColor: (intent !== 'error' && intent !== 'success') 
            ? theme.colors.intents.info : undefined,
        },
        ['> svg']: {
            flexGrow: 1
        }
    }),
    label: css({
        fontFamily: theme.fonts.base,
        fontWeight: 600,
        lineHeight: '1.05rem',
        fontSize: '0.8rem',
        paddingLeft: '5px',
        paddingBottom: '0.2rem',
        color: theme.colors.intents[intent as keyof typeof theme.colors.intents],
    }),
    input: css({
        ...(sizeInputStyles[size]),
        fontFamily: theme.fonts.base,
        border: 'none',
        outline: 'none',
        background: isDark ? 'transparent' : '#fff',
        color: isDark ? theme.colors.jet[2] : theme.colors.jet[10],
        width: '80%',
        padding: 0,
        flexGrow: '7',
        fontWeight: 500,
        '&[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0 
        },
        '&[type=number]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none'
        },
        '&[type=number]': {
            MozAppearance: 'textfield'
        },
        ['&::placeholder']: {
           fontWeight: 500
        }
    }),
    icon: css({
        color: theme.colors.text,
        cursor: 'pointer',
        ...(sizeIconStyles[size])
    })
})