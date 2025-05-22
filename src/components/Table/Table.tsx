/** @jsxImportSource @emotion/react */
import { createContext, CSSProperties, JSX } from 'react'
import { tableStyles } from './table.styles'
import { useTheme } from '@emotion/react'
import { useThemeMode } from '../../main'

const TableContext = createContext(undefined)

interface TableProps {
  children?: React.ReactNode
  className?: string
  style?: CSSProperties
}

interface BodyProps<T> extends TableProps {
  data: Array<T>
  render?: (item: T, i: number) => JSX.Element
}

type TableRowsProps<T extends Record<string, any>> = {
  data: Array<T>
}

export function Table({ children, height = 500, ...props }: TableProps & { height?: number }) {

  const theme = useTheme()
  const { isDark } = useThemeMode()
  const styles = tableStyles(theme, isDark, height)

  return (
    <TableContext.Provider value={undefined}>
      <div css={styles} {...props}>
        <div className='table-wrapper'>
            <table className='styled-table'>{children}</table>
        </div>
      </div>
    </TableContext.Provider>
  )
}


function Header({ children, ...props }: TableProps) {
  return (
    <thead {...props}>
      <tr>{children}</tr>
    </thead>
  )
}

function Heading({ children, ...props }: TableProps) {
  return (
    <th {...props}>{children}</th>
  )
}

function Body<T extends Record<string, any>>({ data, render, ...props }: BodyProps<T>) {
  return render 
    ? <tbody {...props}> {(data && render) ? data.map(render) : null } </tbody>
    : <TableRows<T> data={data} />
}


const TableRows = <T extends Record<string, any>>({ data }: TableRowsProps<T>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {Object.values(row).map((column, index2) => {
          return (
            <td key={`cell-${index2}`}>
              {column}
            </td>
          )
        })}
      </tr>
    )
  })

  return (
    <tbody>
      {rows}
    </tbody>
  )
}

function Row({ children, ...props }: TableProps) {
  return (
    <tr {...props}>{children}</tr>
  )
}

function Cell({ children, ...props }: TableProps) {
  return (
    <td {...props}>{children}</td>
  )
}

Table.Header = Header
Table.Heading = Heading
Table.Body = Body
Table.Row = Row
Table.Cell = Cell
