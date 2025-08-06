
import { CircularProgress } from '@/components/CircularProgress/CircularProgress';
import { CircularProgressSize } from '@/components/CircularProgress/Container';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CircularProgress> = {
      title: 'Components/CircularProgress',
      tags: ["autodocs"],
      component: CircularProgress,
      parameters: {
        layout: "centered"
      },
      argTypes: {
      initialValue: {
        type: 'number',
        description: 'Initial Value'
      },
      size: {
        type: "string",
        options: ["sm", "md", "lg"],
        control: { type: "radio" },
        description: "Size"
      },
      progressColors: {
        type: 'string',
        description: 'Progress colors'
      }
    },
}


export default meta;

type Story = StoryObj<typeof CircularProgress>;

const Default = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CircularProgress initialValue={50}>
        <CircularProgress.Circle />
        <CircularProgress.Thumb />
        <CircularProgress.Label text='Next' />
      </CircularProgress>
    </div>
  );
}

const SizeVariants = () => {
  const sizes = ['sm', 'md', 'lg'];
  const values = [80, 50, 25];

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {
        sizes.map((size, i)=> (
          <div key={size} style={{ margin: '1rem' }}>
            <CircularProgress size={size as CircularProgressSize} initialValue={values[i]}>
              <CircularProgress.Circle />
              <CircularProgress.Thumb />
              <CircularProgress.Label text='Next' />
            </CircularProgress>
          </div>
        ))
      }
    </div>
  );
}

const ColorVariants = () => {
  const colors = [['#17b1b5', '#2e63ec'], ['#d01970', '#b502b2ff'], ['#95d242', '#f26a00']];
   const values = [80, 50, 25];

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {
        colors.map((color, i) => (
          <div key={color[0]} style={{ margin: '1rem' }}>
            <CircularProgress progressColors={[color[0], color[1]]} initialValue={values[i]}>
              <CircularProgress.Circle enableTransition />
              <CircularProgress.Label text='Next' />
            </CircularProgress>
          </div>
        ))
      }
    </div>
  );
}



export const Avatar_sizes: Story = {
  name: 'Default',
  render: () => <Default />
}

export const Size_variants: Story = {
  name: 'Size variants',
  render: () => <SizeVariants />
}

export const Color_variants: Story = {
  name: 'Color variants',
  render: () => <ColorVariants />
}

