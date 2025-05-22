import { Theme, css } from "@emotion/react";
import { Intent } from "./Input";

export const inputStyles = (theme: Theme, intent: Intent) => ({
    inputWrapper: css({
        display: 'flex',
        flexDirection: 'column'
    }),
    label: css({
        fontFamily: theme.fonts.base,
        fontWeight: 600,
        lineHeight: '1.05rem',
        fontSize: '0.8rem',
        paddingLeft: '5px',
        paddingBottom: '0.2rem',
        color: theme.colors.intents[intent as keyof typeof theme.colors.intents]
    }),
    input: css({
        height: '3rem',
        borderStyle: 'solid',
        borderRadius: '0.5rem',
        boxSizing: 'border-box',
        fontSize: '1rem',
        fontFamily: theme.fonts.base,
        border: `2px solid ${theme.colors.intents[intent as keyof typeof theme.colors.intents]}`,
        padding: '1rem',
        outline: 'none',
        maxWidth: '600px',
        ':placeholder': {
           fontWeight: 600
        },
        ':focus': {
            borderColor: (intent !== 'error' && intent !== 'success') 
            ? theme.colors.intents.info : undefined
        },
        ':hover': {
            borderColor: (intent !== 'error' && intent !== 'success') 
            ? theme.colors.intents.info : undefined
        },
        ':[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0 
        },
        ':[type=number]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none'
        },
        ':[type=number]': {
            MozAppearance: 'textfield'
        }
    })
})