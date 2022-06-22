import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { Flex, Card, Text } from 'rebass/styled-components';

import { select } from '@storybook/addon-knobs';
import { StatusIndicator } from '../index';
import { colorOptions } from '../../../storybookHelpers/colors';

export default { title: 'Atoms/Status Indicator' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Tooltip
    </Text>
    <Card p={3} mb={2}>
      <StatusIndicator status="default color" />
    </Card>
    <Card p={3} mb={2}>
      <StatusIndicator statusColor="text" status="Required" />
    </Card>
  </Flex>
);

export const Playground = () => {
  // note: the default group ID is 'Other'
  const statusColor = select('statusColor', colorOptions, colorOptions[1], 'Other');
  return (
    <Flex flexDirection="column">
      <Text as="h2" mb={3}>
        Tooltip
      </Text>
      <Card p={3} mb={2}>
        <StatusIndicator statusColor={statusColor} status="default color" />
      </Card>
    </Flex>
  );
};
Playground.decorators = [withSmartKnobs({ ignoreProps: ['textColor', 'statusColor'] })];
