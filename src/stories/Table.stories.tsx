import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../components/Table/Table";
import { users } from "../utils/constants";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  tags: ["autodocs"],
  component: Table,
  argTypes: {
    children: {
      description: "The button label"
    },
    height: {
      type: 'number',
      description: 'height',
      control: 'number'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Table>;

const TableDefault = ({ height }: { height: number }) => {
  const mapedUsers = users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
    }
  })
  return <>
    <Table height={height}>
      <Table.Header>
          <Table.Heading>id</Table.Heading>
          <Table.Heading>Name</Table.Heading>
          <Table.Heading>Email</Table.Heading>
          <Table.Heading>Phone</Table.Heading>
          <Table.Heading>City</Table.Heading>
      </Table.Header>
      <Table.Body data={mapedUsers}/>
    </Table>
  </>
};

const TableWithRenderProp = () => {
  return <>
       <Table>
          <Table.Header>
              <Table.Heading> 
                  <input style={{ marginRight: 10 }} type="checkbox" />
              </Table.Heading>
              <Table.Heading>id</Table.Heading>
              <Table.Heading>Name</Table.Heading>
              <Table.Heading>Email</Table.Heading>
              <Table.Heading>Phone</Table.Heading>
              <Table.Heading>City</Table.Heading>
          </Table.Header>
          <Table.Body
              data={users}
              render={(user, index) => (
                  <Table.Row key={index}>
                      <Table.Cell> 
                          <input style={{ marginRight: 10 }} type="checkbox" />
                      </Table.Cell>
                      <Table.Cell className='px-6 py-4 text-sm whitespace-nowrap'>
                          {user.id}
                      </Table.Cell>
                      <Table.Cell className='px-6 py-4 text-sm whitespace-nowrap'>
                          {user.name}
                      </Table.Cell>
                      <Table.Cell className='px-6 py-4 text-sm whitespace-nowrap'>
                          {user.email}
                      </Table.Cell>
                      <Table.Cell className='px-6 py-4 text-sm whitespace-nowrap'>
                          {user.phone}
                      </Table.Cell>
                        <Table.Cell className='px-6 py-4 text-sm whitespace-nowrap'>
                          {user.address.city}
                      </Table.Cell>
                  </Table.Row>
              )}
            />
      </Table>
  </>
};


export const Table_default_with_height_prop: Story = {
  name: 'Table default with height prop',
  render: () => <TableDefault height={350} />
}

export const Table_with_render_prop: Story = {
  name: 'Table with render prop',
  render: () => <TableWithRenderProp />
}
