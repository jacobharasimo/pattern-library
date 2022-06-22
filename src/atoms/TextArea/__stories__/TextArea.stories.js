/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Box, Heading } from 'rebass/styled-components';
import TextArea from '..';

const defaultValue = 'md';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
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

const Template = args => <TextArea {...args} />;

export const Overview = () => (
  <>
    <Box as="section" my="4">
      <Heading as="h2" my="3">
        TextArea
      </Heading>
      <Box my="2">
        <TextArea className="Storybook__TextArea" size="md" placeholder="Lorem Ipsum" />
      </Box>
      <Box my="2">
        <TextArea className="Storybook__TextArea" size="md" placeholder="Lorem Ipsum" error />
      </Box>
    </Box>
    <Box as="section" my="4">
      <Heading as="h2" my="3">
        TextArea with different sizes
      </Heading>
      <Box my="2">
        <TextArea className="Storybook__TextArea" size="sm" placeholder="Lorem Ipsum" />
      </Box>
      <Box my="2">
        <TextArea className="Storybook__TextArea" size="md" placeholder="Lorem Ipsum" />
      </Box>
      <Box my="2">
        <TextArea className="Storybook__TextArea" size="lg" placeholder="Lorem Ipsum" />
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
  error: false,
  placeholder: '01/01/2019 - 03/07/2019',
  rows: 5,
  size: defaultValue,
};
