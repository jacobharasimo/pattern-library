import React from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { boolean, text } from '@storybook/addon-knobs';

import { Tag } from '../index';

export default { title: 'Atoms/Tag' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Tag
    </Text>
    <Card mb={2} p={3}>
      <Text as="h3" mb={3}>
        Display Tag
      </Text>
      <Flex>
        <Tag>Sample</Tag>
        <Tag variant="accent">Sample</Tag>
      </Flex>
    </Card>
    <Card mb={2} p={3}>
      <Text as="h3" mb={3}>
        Removable Tag
      </Text>
      <Flex>
        <Tag canRemove onRemove={() => {}}>
          Sample
        </Tag>
        <Tag variant="accent" canRemove onRemove={() => {}}>
          Sample
        </Tag>
      </Flex>
    </Card>
  </Flex>
);

export const Playground = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Tag
    </Text>
    <Card mb={2} p={3}>
      <Text as="h3" mb={3}>
        Display Tag
      </Text>
      <Tag variant="accent" canRemove={boolean('canRemove', true)} onRemove={() => {}}>
        {text('children', 'Sample')}
      </Tag>
    </Card>
  </Flex>
);
Playground.decorators = [withSmartKnobs()];
