import { Theme, css } from "@emotion/react";
import { Intent } from "./Input";

export const inputStyles = (theme: Theme, intent: Intent, isDark: boolean) => ({
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
        height: '3rem',
        boxSizing: 'border-box',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        maxWidth: '450px',
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
        ':[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0 
        },
        ':[type=number]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none'
        },
        ':[type=number]': {
            MozAppearance: 'textfield'
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
        fontSize: '1rem',
        fontFamily: theme.fonts.base,
        border: 'none',
        outline: 'none',
        background: isDark ? 'transparent' : '#fff',
        color: isDark ? theme.colors.jet[2] : theme.colors.jet[10],
        width: '80%',
        padding: 0,
        flexGrow: '7',
        fontWeight: 500,
        ['::placeholder']: {
           fontWeight: 500
        }
    })
})