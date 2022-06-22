import React from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';

import { Tooltip } from '../index';

export default { title: 'Molecules/Tooltip' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Tooltip
    </Text>
    <Card p={3} mt={5}>
      <Tooltip
        triggerProps={{ color: 'text' }}
        popover="[First and last name], admin of [Network name], posted the job on March 21, 2021"
      >
        Job source
      </Tooltip>
    </Card>
  </Flex>
);
