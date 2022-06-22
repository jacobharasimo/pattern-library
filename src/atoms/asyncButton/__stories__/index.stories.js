/* eslint-disable */
import React from 'react';
import { Flex, Box, Card, Text } from 'rebass/styled-components';
import { useTheme } from 'styled-components';
import { AsyncButton } from '../index';

export default {
  title: 'Atoms/Async Buttons',
  component: AsyncButton,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  parameters: {
    knobs: {
      disable: true,
    },
  },
};

const Template = args => <AsyncButton {...args}/>;

export const Overview = () => {
  const { buttons } = useTheme();

  return (
    <Flex flexDirection="column">
      <Text as="h2" mb={1}>
        Rebass Button
      </Text>
      <Text mb={3}>
        <ul>
          <li>
            Async Action Buttons do not support disabled state to improve UX, WCAG and wayfinding. Instead, validate on
            click and show an error where appropriate.
          </li>
          <li>Buttons are full width elements, nest them in a container to set size</li>
        </ul>
      </Text>
      <Flex width={1} my={3}>
        <Text fontWeight="bold" fontSize={4} width={1 / 3}>
          Small
        </Text>
        <Text fontWeight="bold" fontSize={4} width={1 / 3}>
          Medium
        </Text>
        <Text fontWeight="bold" fontSize={4} width={1 / 3}>
          Large
        </Text>
      </Flex>
      {Object.keys(buttons).map(key => {
        if (key !== 'default') {
          return (
            <Card key={key} mb={3} flexDirection="column">
              <Text as="h3" mt={1} mb={3}>
                {key} button
              </Text>
              <Flex flexDirection="row">
                <Box width={1 / 2}>
                  <AsyncButton size="small"  loadingVariant={key} variant={key} loading>
                    Button
                  </AsyncButton>
                </Box>
                <Box width={1 / 2}>
                  <AsyncButton size="medium"  loadingVariant={key} variant={key} loading>
                    Button
                  </AsyncButton>
                </Box>
                <Box width={1 / 2}>
                  <AsyncButton size="large"  loadingVariant={key} variant={key} loading>
                    Button
                  </AsyncButton>
                </Box>
              </Flex>
            </Card>
          );
        }
        return null;
      })}
    </Flex>
  );
};

Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = Template.bind({});

Playground.args = {
  loading: false,
  children: 'Send',
};
