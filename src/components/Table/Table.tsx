/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react';
import { useThemeMode } from '../../main';
import { CellWrapper, Label, RowWrapper, TableCard, TableHeader, TableWrapper } from './table.styles';

type TableProps = { headers: string[]; children: ReactNode, height?: number };
type RowProps = { children: ReactNode };
type CellProps = { label?: string; children: ReactNode };

const Table = ({ headers, children, height = 500 }: TableProps) => {
  const { isDark, theme } = useThemeMode()

  const restProps = {
    theme,
    isDark
  }
  
  return (
   <TableCard height={height} {...restProps}>
     <TableWrapper height={height} {...restProps}>
      <TableHeader columns={headers.length} {...restProps}>
        {headers.map((header, i) => (
          <div key={i}>{header}</div>
        ))}
      </TableHeader>
      {children}
    </TableWrapper>
   </TableCard>
  );
}

const Row = ({ children }: RowProps) => {
  const { isDark, theme } = useThemeMode()
  return <RowWrapper isDark={isDark} theme={theme}>{children}</RowWrapper>;
}

const Cell = ({ label, children }: CellProps) => {
   const { isDark, theme } = useThemeMode()
  return (
    <CellWrapper isDark={isDark} theme={theme}>
      <Label>{label}</Label>
      <span>{children}</span>
    </CellWrapper>
  );
}

// Compound assignment
Table.Row = Row;
Table.Cell = Cell;

export { Table };
