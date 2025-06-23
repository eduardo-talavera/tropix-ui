import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonSizes, type ButtonVariants } from "@/components/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    children: {
      description: "The button label"
    },
    variant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger", "ghost"],
      control: "select",
      description: "Colors Variants"
    },
    outline: {
      type: "boolean",
      description: "Button Outline"
    },
    size: {
      type: "string",
      options: ["sm", "md", "lg", "full"],
      control: { type: "radio" },
      description: "Button Size"
    },
    rounded: {
      type: "boolean"
    },
    disabled: {
      type: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button"
  }
};

const ButtonVariants = ({ outline = false, rounded = false }) => {
  
  const buttonVariants = ['primary', 'success', 'warning', 'danger'];

  return <>
    {
      buttonVariants.map((variant) => (
          <Button 
            key={variant} 
            variant={variant as ButtonVariants}
            outline={outline}
            rounded={rounded}
            size='sm'
            style={{ margin: '5px' }}
          >
            {variant}
          </Button>
        ))
    }
  </>
};

const Buttonsizes = () => {
  const sizes = ['sm', 'md', 'lg', 'full'];

  return <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
    {
      sizes.map((size) => (
          <Button 
            key={size} 
            size={size as ButtonSizes}
            style={{ margin: '5px' }}
          >
            {size}
          </Button>
        ))
    }
  </div>
};

const DisabledButtons = () => {
  return <div style={{ display: 'flex' }}>
    <Button 
      key={'disabled1'} 
      disabled
      style={{ margin: '5px' }}
    >
      Send
    </Button>

    <Button 
      key={'disabled2'} 
      disabled
      outline
      style={{ margin: '5px' }}
    >
      Send
    </Button>    
  </div>
};


export const Button_Variants: Story = {
  name: 'Button variants',
  render: () => <ButtonVariants />
}

export const Button_Variants_With_Outline_Prop: Story = {
  name: 'Button variants with outline prop',
  render: () => <ButtonVariants outline />
}

export const Button_Variants_With_rounded_Prop: Story = {
  name: 'Button variants with rounded prop',
  render: () => <ButtonVariants rounded />
}

export const Button_Sizes: Story = {
  name: 'Button sizes',
  render: () => <Buttonsizes />
}

export const With_Loader_Prop: Story = {
  name: 'With loader prop',
  args: {
    loader: true,
    children: 'Send'
  }
};

export const Buttons_With_Disabled_Prop: Story = {
  name: 'Buttons with disabled prop',
  render: () => <DisabledButtons />
}
