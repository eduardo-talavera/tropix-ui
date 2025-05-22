import { Meta, StoryObj } from "@storybook/react";
import { Input } from '../components/Input/Input';
import { ComponentProps } from "react";

interface ExampleComponentProps extends ComponentProps<typeof Input> {
}

const meta: Meta<ExampleComponentProps> = {
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
        options: ['jungleGreen', 'cobaltBlue', 'poppy', 'sunGlow'],
        control: 'select'
       },
       disabled: {
        description: 'disabled',
        type: 'boolean',
        control: 'boolean'
       },

    },
}

export default meta;

type Story = StoryObj<ExampleComponentProps>;

const exampleComponent: Story = {
    render: () => (
        <Input
            label="Tu nombre"
            name="name"
            onChange={(value) => console.log(value)}
            intent='success'
            placeholder="Ingresa tu nombre"
            style={{
              width: 300
            }}
        />
    )
}

export const Default: Story = {
  ...exampleComponent,
  name: 'Default',
  args: {
   
  }
};

