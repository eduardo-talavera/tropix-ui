
import { Avatar, type AvatarVariants } from '@/components/Avatar/Avatar';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ["autodocs"],
    parameters: {
      layout: "centered"
    },
    argTypes: {
     
    },
}


export default meta;

type Story = StoryObj<typeof Avatar>;

const AvatarSizes = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="sm" src="https://i.pravatar.cc/100" />
      <Avatar size="md" src="https://i.pravatar.cc/100" />
      <Avatar size="lg" src="https://i.pravatar.cc/100" />
    </div>
  );
}


const AvatarVariants = () => {
  const variants: AvatarVariants[] = ['jungleGreen', 'cobaltBlue', 'poppy', 'sunGlow'];

  return <>
    {
      variants.map(variant => (
        <Avatar
            variant={variant}
            style={{ margin: '0.5rem' }}
        >
            ET
        </Avatar>
      ))
    }
  </>
}

export const Avatar_sizes: Story = {
  name: 'Avatar sizes',
  render: () => <AvatarSizes />
}

export const Avatar_variants: Story = {
  name: 'Avatar variants',
  render: () => <AvatarVariants />
}
