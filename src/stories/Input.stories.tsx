/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from "@storybook/react";
import { Input, Intent } from '../components/Input/Input';

import { CircleCheck } from 'lucide-react'



const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ["autodocs"],
    parameters: {
      layout: "centered"
    },
    argTypes: {
       intent: {
        type: 'string',
        description: 'variant',
        options: ['initial', 'success', 'error', 'info'],
        control: 'select'
       },
       label: {
        type: 'string',
        description: 'label',
        control: 'text'
       }
    },
}

export default meta;

type Story = StoryObj<typeof Input>;



export const Default: Story = {
  name: 'Default',
  args: {
   intent: 'initial',
   label: 'Firstname',
   placeholder: 'Enter your firstname'
  }
};

const InputIntents = () => {
  const intents = ['initial', 'success', 'error', 'info']

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {
      intents.map(intent => (
        <Input
          key={intent}
          intent={intent as Intent}
          onChange={(value) => console.log(value)}
          label={intent}
          name='lastname'
          placeholder='Enter your last name'
          wrapperStyles={{ margin: '0.5rem' }}
        />
      ))
    }
  </div>
}

export const Input_intents: Story = {
  name: 'Input intents',
  render: () => <InputIntents />
}


