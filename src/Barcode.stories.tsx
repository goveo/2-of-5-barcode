import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, number as numberKnob } from '@storybook/addon-knobs';
import { Barcode } from './Barcode';

export default {
  title: 'Barcode',
  decorators: [withKnobs],
  component: Barcode,
} as Meta;

const Template: Story = () => <Barcode number={numberKnob('Encoding number', 12345, { min: 0 }) || 0} />;

export const Default = Template.bind({});
Default.args = {};
