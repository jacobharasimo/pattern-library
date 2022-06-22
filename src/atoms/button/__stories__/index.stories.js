import React from 'react';
import { Flex, Box, Card, Text } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { text } from '@storybook/addon-knobs';
import { useTheme } from 'styled-components';
import { Button } from '../index';

export default { title: 'Atoms/Buttons' };

export const Overview = () => {
  const { buttons } = useTheme();

  return (
    <Flex flexDirection="column">
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
                  <Button size="small" variant={key}>
                    Button
                  </Button>
                </Box>
                <Box width={1 / 2}>
                  <Button size="medium" variant={key}>
                    Button
                  </Button>
                </Box>
                <Box width={1 / 2}>
                  <Button size="large" variant={key}>
                    Button
                  </Button>
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

export const Playground = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={1}>
      Button
    </Text>
    <Card mb={2} p={3}>
      <Box width={1 / 2}>
        <Button>{text('content', 'Button')}</Button>
      </Box>
    </Card>
  </Flex>
);
Playground.decorators = [withSmartKnobs()];
