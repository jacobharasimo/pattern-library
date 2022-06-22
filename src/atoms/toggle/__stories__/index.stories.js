import React from 'react';
import { Flex, Card, Text, Box } from 'rebass/styled-components';
import { text, number, boolean } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { Toggle } from '../index';

export default { title: 'Atoms/Toggle' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Toggle
    </Text>
    <Card mb={2} p={3}>
      <Text>Default (medium)</Text>
      <Box as="hr" my={2} />
      <Box pb={2}>
        <Toggle label="Toggle" />
      </Box>
      <Box pt={2}>
        <Toggle label="Toggle" checked />
      </Box>
      <Box pt={2}>
        <Toggle label="Reverse Toggle" variant="reverse" checked labelProps={{ }} />
      </Box>
    </Card>
    <Card mb={2} p={3}>
      <Text>Large (size 24)</Text>
      <Box as="hr" my={2} />
      <Box pb={2}>
        <Toggle size={24} variant="large" label="Toggle" />
      </Box>
      <Box pt={2}>
        <Toggle size={24} variant="large" label="Toggle" checked />
      </Box>
    </Card>
  </Flex>
);

export const Playground = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={1}>
      Toggle
    </Text>
    <Card mb={2} p={3}>
      <Box width={1 / 2}>
        <Toggle
          checked={boolean('checked', false)}
          size={number('size', 24)}
          label={text('label', 'This is a toggle switch')}
        />
      </Box>
    </Card>
  </Flex>
);
Playground.decorators = [withSmartKnobs({ ignoreProps: ['disabled','className', 'sx'] })];
