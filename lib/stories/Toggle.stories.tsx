import { Meta, StoryObj } from "@storybook/react";
import { Toggle, type ToggleSizes, type ToggleVariants } from '@/components/Toggle/Toggle';
import { ComponentProps } from "react";

interface ExampleComponentProps extends ComponentProps<typeof Toggle> {
    onPress: (tooggled: boolean) => void
    isToggled?: boolean
    variant?: ToggleVariants
    disabled?: boolean
    isToggleSwitch?: boolean
    size: ToggleSizes
}

const meta: Meta<ExampleComponentProps> = {
    title: 'Components/Toggle',
    component: Toggle,
    tags: ["autodocs"],
    parameters: {
      layout: "centered"
    },
    argTypes: {
       variant: {
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
       onPress: {
        type: 'function',
        description: 'onPress'
       },
       isThemeSwitch: {
        type: 'boolean',
        description: 'isThemeSwitch'
       }
    },
}

export default meta;

type Story = StoryObj<ExampleComponentProps>;

const exampleComponent: Story = {
    render: ({variant, onPress, ...props}) => (
        <Toggle 
            variant={variant}
            onPress={(toggled) => console.log(toggled)} 
            {...props} 
        />
    )
}

const ToggleVariants = () => {
  const variants: ToggleVariants[] = ['jungleGreen', 'cobaltBlue', 'poppy', 'sunGlow'];

  return <>
    {
      variants.map(variant => (
        <Toggle 
          variant={variant} key={variant} 
          onPress={() => {}}
          isToggled
          style={{ margin: '1rem' }}
        />
      ))
    }
  </>
}


const ToggleSizes = () => {
  const sizes: ToggleSizes[] = ['sm', 'md', 'lg'];

  return <>
    {
      sizes.map(size => (
        <Toggle 
          size={size} key={size} 
          onPress={() => {}}
          variant='jungleGreen'
          isToggled
          style={{ margin: '1rem' }}
        />
      ))
    }
  </>
}

const ToggleDisabled = () => {
  const sizes: ToggleSizes[] = ['sm', 'md', 'lg'];

  return <>
    {
      sizes.map(size => (
        <Toggle 
          size={size} key={size} 
          onPress={() => {}}
          variant='jungleGreen'
          isToggled
          disabled
          style={{ margin: '1rem' }}
        />
      ))
    }
  </>
}

export const Default: Story = {
  ...exampleComponent,
  name: 'Default',
  args: {
    variant: 'jungleGreen',
  }
};

export const themeSwitch: Story = {
  ...exampleComponent,
  name: 'With isThemeSwitch prop',
  args: {
    isThemeSwitch: true
  }
};

export const toggleVariants: Story = {
  name: 'Toggle variants',
  render: () => <ToggleVariants />,
  args: {
    isToggled: true
  }
};

export const toggleSizes: Story = {
  name: 'Toggle sizes',
  render: () => <ToggleSizes />,
  args: {
    isToggled: true
  }
};

export const toggleDisabled: Story = {
  name: 'Toggle with disabled prop enabled',
  render: () => <ToggleDisabled />,
  args: {
    isToggled: true
  }
};