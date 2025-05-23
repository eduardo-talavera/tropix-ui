import type { Meta, StoryObj } from "@storybook/react";
import { users } from "../utils/constants";
import { Pencil, Share2, Trash2 } from 'lucide-react'
import { useTheme } from "@emotion/react";
import { useThemeMode } from "../main";
import { Table } from "../components/Table/Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  tags: ["autodocs"],
  component: Table,
  argTypes: {
    children: {
      description: "The button label"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Table>;

function App() {
    const mapedUsers = users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
    }
  })
  return (
      <Table headers={['Id', 'Nombre', 'Email', 'Telefono', 'Ciudad']} height={350}>
      {
        mapedUsers.map(user => (
            <Table.Row>
                <Table.Cell label="Id">{user.id}</Table.Cell>
                <Table.Cell label="Nombre">{user.name}</Table.Cell>
                <Table.Cell label="Email">{user.email}</Table.Cell>
                <Table.Cell label="Telefono">{user.email}</Table.Cell>
                <Table.Cell label="Ciudad">{user.city}</Table.Cell>
            </Table.Row>
        ))
      }
    </Table>
  );
}


function App2() {
  const mapedUsers = users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
    }
  })
    const theme = useTheme()
    const { isDark } = useThemeMode()

  return (
    <Table headers={['Id', 'Nombre', 'Email', 'Telefono', 'Ciudad', 'Acciones']}>
      {
        mapedUsers.map(user => (
            <Table.Row>
                <Table.Cell label="Id">{user.id}</Table.Cell>
                <Table.Cell label="Nombre">{user.name}</Table.Cell>
                <Table.Cell label="Email">{user.email}</Table.Cell>
                <Table.Cell label="Telefono">{user.email}</Table.Cell>
                <Table.Cell label="Ciudad">{user.city}</Table.Cell>
                <Table.Cell label="Acciones">
                     <div
                          style={{ display: 'flex' }}
                        >
                          <Pencil style={{ width: '17px', marginRight: '0.8rem', color: isDark ? theme.colors.cobaltBlue[6] : '#000' }} />
                          <Trash2 style={{ width: '17px', marginRight: '0.8rem', color: isDark ? theme.colors.cobaltBlue[6] : '#000' }} />
                          <Share2 style={{ width: '17px', color: isDark ? theme.colors.cobaltBlue[6] : '#000' }} />
                        </div>
                </Table.Cell>
            </Table.Row>
        ))
      }
    </Table>
  );
}

export const Table_mobile: Story = {
  name: 'Table Default',
  render: () => <App />
}


export const Table_mobile2: Story = {
  name: 'Table CustomRenders',
  render: () => <App2 />
}
