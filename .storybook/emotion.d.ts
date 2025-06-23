import '@emotion/react'
import { Theme as TropixUITheme } from '../lib/theme/theme'

declare module '@emotion/react' {
    export interface Theme extends TropixUITheme {}
}
