
/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { inputStyles } from './input.styles';
import { CSSProperties, FC, forwardRef, InputHTMLAttributes, JSX } from 'react';
import { LucideProps } from 'lucide-react';
import { useThemeMode } from '../../main';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  name: string
  id?: string
  type?: InputType
  placeholder?: string
  intent?: Intent
  errorMessage?: string
  value?: string | number
  icon?: JSX.Element
  wrapperStyles?: CSSProperties
  onChange: (value: string | number) => void
}

export type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>

export type Intent = 'initial' | 'success' | 'error'  | 'info' 

type InputType =  'text' | 'email' | 'password' | 'date' | 'number' | 'search' | 'currency'

export const Input: FC<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, intent = 'initial', type = 'text', errorMessage, onChange, value, icon, wrapperStyles, ...props }: TextInputProps, ref) => {

  const theme = useTheme()
  const { isDark } = useThemeMode()
  const styles = inputStyles(theme, intent, isDark)
  // icon is already a JSX.Element, no need to assign to Icon

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
   onChange(value)
  }
  return (
    <div css={styles.labelAndInputWrapper} style={wrapperStyles}>
      <label css={styles.label} htmlFor={props.id || props.name }> { label } </label>
      <div css={styles.inputWrapper} ref={ref}> 
        <input 
            css={styles.input} 
            onChange={handleChange}
            value={value}
            {...props}
        />
      { icon && icon }
      </div>
       {
            (intent === 'error' && errorMessage) && (
                <span css={styles.label} > { errorMessage } </span>
            )
        }
    </div>
  )
})
