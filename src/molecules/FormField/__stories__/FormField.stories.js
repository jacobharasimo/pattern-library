/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Box, Heading } from 'rebass/styled-components';
import FormField from '..';

export default {
  title: 'Molecules/Form Field',
  component: FormField,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: '',
    },
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

const Template = args => <FormField {...args} />;

export const Overview = () => (
  <Box as="section" my="4">
    <Heading as="h2" my="3">
      States
    </Heading>
    <FormField
      field={{ name: 'test1' }}
      label="Test field"
      placeholder="I'm a placeholder"
      className="Storybook__Input"
      optional
    />
    <FormField
      label="Field with error"
      placeholder="I'm a placeholder"
      field={{ name: 'test2' }}
      form={{ touched: { test2: true }, errors: { test2: 'This is an error message' } }}
      className="Storybook__Input"
    />
    <FormField field={{ name: 'test3' }} label="Textarea field" as="textarea" placeholder="I'm a placeholder" />
    <FormField field={{ name: 'test4' }} label={<div>Complex label</div>} as="password" />
  </Box>
);

Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = Template.bind({});

Playground.args = {
  as: 'input',
  label: 'Label',
  placeholder: '01/01/2019 - 03/07/2019',
  form: {
    setFieldValue: () => {},
    touched: {},
    errors: {},
  },
  size: 'md',
};
