import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils/renderWithTheme';
import { describe, it, expect } from 'vitest';
import { Table } from '@/components/Table/Table';

describe('Table', () => {
  it('renderiza los headers correctamente', () => {
    render(
      <Table headers={['Nombre', 'Edad']}>
        <Table.Row>
          <Table.Cell label="Nombre:">Juan</Table.Cell>
          <Table.Cell label="Edad:">30</Table.Cell>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Edad')).toBeInTheDocument();
  });

  it('renderiza las celdas y sus labels', () => {
    render(
      <Table headers={['COL1', 'COL2']}>
        <Table.Row>
          <Table.Cell label="Col1">Dato1</Table.Cell>
          <Table.Cell label="Col2">Dato2</Table.Cell>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Dato1')).toBeInTheDocument();
    expect(screen.getByText('Dato2')).toBeInTheDocument();
    expect(screen.getAllByText(/Col[12]/)).toHaveLength(2);
  });
});