
/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { inputStyles } from './input.styles';
import { FC, forwardRef, InputHTMLAttributes } from 'react';
import { CircleCheck } from 'lucide-react';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  name: string
  id?: string
  type?: InputType
  placeholder?: string
  intent?: Intent
  errorMessage?: string
  value?: string | number
  onChange: (value: string | number) => void
}

export type Intent = 'initial' | 'success' | 'error'  | 'warning'  | 'active'

type InputType =  'text' | 'email' | 'password' | 'date' | 'number' | 'search' | 'currency'

export const Input: FC<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, intent = 'initial', type = 'text', errorMessage, onChange, value, ...props }: TextInputProps, ref) => {

  const theme = useTheme()
  const styles = inputStyles(theme, intent)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
   onChange(value)
  }
  return (
    <>
      <div css={styles.inputWrapper} ref={ref}>
        <label css={styles.label} htmlFor={props.id || props.name }> { label } </label>
        <div>
            <input 
                css={styles.input} 
                onChange={handleChange}
                value={value}
                { ...props }
            />
            <CircleCheck />
        </div>
        {
            intent === 'error' && (
                <span css={styles.label} > { errorMessage ?? 'Invalid format' } </span>
            )
        }
      </div>
    </>
  )
})
