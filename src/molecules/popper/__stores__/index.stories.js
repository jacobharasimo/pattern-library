/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Flex, Card, Text, Box } from 'rebass/styled-components';
import { Popper } from '../index';

export default { title: 'Molecules/Popper' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Tooltip
    </Text>
    <Card p={3} mt={5}>
      <Flex alignItems="center">
        <Text mr={2}>What is this</Text>
        <Popper popover="Its a popover/tooltip that can provide helpful information" />
      </Flex>
    </Card>
  </Flex>
);
Overview.parameters = {
  knobs: { disable: true },
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = args => (
  <Flex flexDirection="column">
    <Box>
      <Popper {...args} />
    </Box>
    <Text mt={4}>
      Find more popper config options{' '}
      <a
        target="_blank"
        href="https://www.npmjs.com/package/react-popper-tooltip#user-content-api-reference"
        rel="noreferrer"
      >
        here
      </a>
    </Text>
  </Flex>
);
Playground.parameters = {
  actions: { disable: true },
  knobs: { disable: true },
};

Playground.args = {
  popover: 'Its a popover/tooltip that can provide helpful information',
  popperConfig: { trigger: ['hover', 'focus'] },
};
