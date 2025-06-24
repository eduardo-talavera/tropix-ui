
import { useTheme } from '@emotion/react'
import { inputStyles } from './input.styles'
import {
  CSSProperties,
  FC,
  forwardRef,
  InputHTMLAttributes,
  JSX,
  useCallback,
  useState
} from 'react'
import { Eye, EyeOff, LucideProps, Search } from 'lucide-react'
import { useThemeMode } from '@/context/ThemeContext'

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label: string
  name: string
  id?: string
  type?: InputType
  size?: InputSize
  placeholder?: string
  intent?: Intent
  errorMessage?: string
  value: string | number
  max?: number
  icon?: JSX.Element
  onValueChange?: (value: number) => void;
  wrapperStyles?: CSSProperties
  onChange?: (value: string | number) => void
}

const VALID_FIRST = /^[1-9]{1}$/
const VALID_NEXT = /^[0-9]{1}$/
const DELETE_KEY_CODE = 8

export type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

export type Intent = 'initial' | 'success' | 'error' | 'info'

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'currency'

export type InputSize = 'sm' | 'md' | 'lg'

/**TODO: Develop phone input variant and date picker in an external file */

export const Input: FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>(
  (
    {
      label,
      intent = 'initial',
      type = 'text',
      size = 'md',
      errorMessage,
      onChange,
      value,
      icon,
      wrapperStyles,
      max = Number.MAX_SAFE_INTEGER,
      onValueChange,
      ...props
    }: TextInputProps,
    ref
  ) => {
    const theme = useTheme()
    const { isDark } = useThemeMode()
    const styles = inputStyles(theme, intent, isDark, size)

    const [showPass, setShowPass] = useState(false)

    const valueAbsTrunc = Math.trunc(Math.abs(value as number))

    if(type === 'currency') {
        if (value !== valueAbsTrunc || !Number.isFinite(value) ||(Number.isNaN(value))) {
          throw new Error(`invalid value property`)
        }
    }
  
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const { key, keyCode } = e
        if (
          (value === 0 && !VALID_FIRST.test(key)) ||
          (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
        ) {
          return
        }
        const valueString = value.toString()
        let nextValue: number
        if (keyCode !== DELETE_KEY_CODE) {
          const nextValueString: string =
            value === 0 ? key : `${valueString}${key}`
          nextValue = Number.parseInt(nextValueString, 10)
        } else {
          const nextValueString = valueString.slice(0, -1)
          nextValue =
            nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10)
        }
        if (nextValue > max) {
          return
        }
        onValueChange && onValueChange(nextValue)
        
      },
      [max, onChange, value, onValueChange]
    )

    const handleChange = useCallback(() => {
      // DUMMY TO AVOID REACT WARNING
    }, [])

    const valueDisplay = (Number(value) / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  
    const handleValueChange = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
     onChange && onChange(value as string)
    }

    return (
      <div css={styles.labelAndInputWrapper} style={wrapperStyles}>
        <label css={styles.label} htmlFor={props.id || props.name}>
          {' '}
          {label}{' '}
        </label>
        <div css={styles.inputWrapper} ref={ref}>
          {type === 'currency' ? (
            <input
              css={styles.input}
              inputMode='numeric'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={valueDisplay}
              ref={ref}
              {...props}
            />
          ) : (
            <input
              css={styles.input}
              onChange={handleValueChange}
              value={value}
              type={
                type === 'password'
                  ?  showPass ? 'text' : 'password'
                  : type
              }
              ref={ref}
              {...props}
            />
          )}

          {icon && icon} 

          {
            (type === 'password' && !icon ) && <>
              { 
                !showPass && <>
                  <EyeOff  
                    data-testid='lucide-eye-off' 
                    css={styles.icon} 
                    onClick={() => setShowPass(true)} 
                  />
                </> 
              }

              { 
                showPass && <>
                  <Eye 
                    data-testid='lucide-eye' 
                    css={styles.icon} 
                    onClick={() => setShowPass(false)} 
                  />
                </> }
            </>
          }

          {
            (type === 'search' && !icon ) && <>
              <Search data-testid='lucide-search' css={styles.icon} />
            </>
          }

        </div>
        {intent === 'error' && errorMessage && (
          <span css={styles.label}> {errorMessage} </span>
        )}
      </div>
    )
  }
)
