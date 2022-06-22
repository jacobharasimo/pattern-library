/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Box, Heading } from 'rebass/styled-components';
import Input from '../index';

const defaultValue = 'md';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: '',
    },
    className: {
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

const Template = args => <Input {...args} />;

export const Overview = () => (
  <>
    <Box as="section" my="4">
      <Heading as="h2" my="3">
        States
      </Heading>
      <Box my="2">
        <Input placeholder="I'm a placeholder" />
      </Box>
      <Box my="2">
        <Input value="I'm a value" />
      </Box>
      <Box my="2">
        <Input placeholder="I'm disabled with no value" disabled />
      </Box>
      <Box my="2">
        <Input value="I'm disabled with a value" disabled />
      </Box>
      <Box my="2">
        <Input placeholder="I've an error with no value" error />
      </Box>
      <Box my="2">
        <Input value="I've an error with a value" error />
      </Box>
    </Box>
    <Box as="section" my="4">
      <Heading as="h2" my="3">
        Sizes
      </Heading>
      <Box my="2">
        <Input placeholder="Input sm" size="sm" />
      </Box>
      <Box my="2">
        <Input placeholder="Input md" size="md" />
      </Box>
      <Box my="2">
        <Input placeholder="Input lg" size="lg" />
      </Box>
    </Box>
  </>
);

Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = Template.bind({});

Playground.args = {
  delayed: false,
  error: false,
  placeholder: '01/01/2019 - 03/07/2019',
  size: defaultValue,
};
