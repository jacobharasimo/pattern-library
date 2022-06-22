import React from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from '../index';

export default { title: 'Atoms/Checkbox' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Checkbox
    </Text>
    <Card mb={2} p={3}>
      <Checkbox id="test" name="test" label="Hey, Click me!" />
    </Card>
    <Card mb={2} p={3}>
      <Checkbox disabled label="I'm disabled" />
    </Card>
    <Card mb={2} p={3}>
      <Checkbox isLoading label="Hey, I'm loading" />
    </Card>
    <Card mb={2} p={3}>
      <Checkbox checked label="Hey, I'm checked!" />
    </Card>
    <Card mb={2} p={3}>
      <Checkbox disabled checked label="Hey, I'm checked and disabled!" />
    </Card>
  </Flex>
);

export const Playground = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Checkbox
    </Text>
    <Card mb={2} p={3}>
      <Checkbox
        disabled={boolean('disabled', false)}
        checked={boolean('checked', false)}
        label={text('label', 'Hey, Click me!')}
      />
    </Card>
  </Flex>
);
Playground.decorators = [withSmartKnobs({ ignoreProps: ['loadingVariant', 'checkboxVariant', 'name', 'id'] })];
