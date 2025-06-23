import type { Meta, StoryObj } from "@storybook/react";
import { users } from "../utils/constants";
import { Pencil, Share2, Trash2 } from 'lucide-react'
import { useTheme } from "@emotion/react";
import { useThemeMode } from "@/context/ThemeContext";
import { Table } from "@/components/Table/Table";
import { Avatar } from "@/components/Avatar/Avatar";

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
      <Table headers={['Id', 'User', 'Email', 'Phone', 'City']} height={350}>
      {
        mapedUsers.map(user => (
            <Table.Row key={user.id}>
                <Table.Cell label="Id">{user.id}</Table.Cell>
                <Table.Cell label="Name">{user.name}</Table.Cell>
                <Table.Cell label="Email">{user.email}</Table.Cell>
                <Table.Cell label="Phone">{user.phone}</Table.Cell>
                <Table.Cell label="City">{user.city}</Table.Cell>
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
    <Table 
      headers={['Id', 'User', 'Email', 'Phone', 'City', 'Actions']}
      >
      {
        mapedUsers.map((user, i) => (
            <Table.Row key={user.id}>
                <Table.Cell label="Id">{user.id}</Table.Cell>
                <Table.Cell label="User">
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar size="sm" src={`https://i.pravatar.cc/100?img=${i}`} />
                      <span style={{ paddingLeft: '1rem' }}>{ user.name }</span>
                   </div>
                </Table.Cell>
                <Table.Cell label="Email">{user.email}</Table.Cell>
                <Table.Cell label="Phone">{user.phone}</Table.Cell>
                <Table.Cell label="City">{user.city}</Table.Cell>
                <Table.Cell label="Actions">
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
