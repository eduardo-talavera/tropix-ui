
import { CircularProgress } from '@/components/CircularProgress/CircularProgress';
import { CircularProgressSize } from '@/components/CircularProgress/Container';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

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
  const [percents, setPercents] = useState({
    react: 0,
    typeScrpt: 0,
    next: 0,
    node: 0
    });

  const skillSet = [
    { name: 'React', percent: percents.react, colors: ['#25b7fa', '#1b6a8eff'] },
    { name: 'Typescript', percent: percents.typeScrpt, colors: ['#17cee6ff', '#0c6971ff'] },
    { name: 'Next', percent: percents.next, colors: ['#17e678ff', '#146e10ff'] },
    { name: 'Node', percent: percents.node, colors: ['#a14cecff', '#641b83ff'] },
  ]

  useEffect(() => {
    setTimeout(() => {
      setPercents({
        react: 90,
        typeScrpt: 90,
        next: 90,
        node: 80
      })
    }, 5000)
  }, [])

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {
        skillSet.map((skill) => (
          <div 
            key={skill.name} style={{ margin: '1rem' }}
          >
            <CircularProgress 
              progressColors={[skill.colors[0], skill.colors[1]]} 
              initialValue={skill.percent}
            >
              <CircularProgress.Circle enableTransition />
              <CircularProgress.Label text={skill.name} />
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

