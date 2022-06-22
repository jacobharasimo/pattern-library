/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Box } from 'rebass/styled-components';
import FormLabel from '..';

export default {
  title: 'Atoms/Form Label',
  component: FormLabel,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Label',
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
    htmlFor: {
      control: 'text',
      defaultValue: '',
    },
  },
  parameters: {
    knobs: {
      disable: true,
    },
  },
};

const Template = ({ children = 'Label', ...rest }) => <FormLabel {...rest}>{children}</FormLabel>;

export const Overview = () => (
  <Box as="section" my="4">
    <FormLabel>Label</FormLabel>
  </Box>
);

Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = Template.bind({});
