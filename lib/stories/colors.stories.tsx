import type { Meta, StoryObj } from "@storybook/react";

import { ColorsPalette } from '@/theme/ColorsPalette'

const meta: Meta<typeof ColorsPalette> = {
  title: "Theme/ColorsPalette",
  tags: ["autodocs"],
  component: ColorsPalette,
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof ColorsPalette>;

export const Colors: Story = {
  args: {
  }
};

