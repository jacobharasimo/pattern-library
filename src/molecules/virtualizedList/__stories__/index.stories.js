import React from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';
import { VirtualizedList } from '../index';

export default { title: 'Molecules/Virtualized List' };

const generateFakeData = size => {
  const result = [];
  for (let i = 0; i < size; i = +i + 1) {
    result.push({ children: `test item ${i + 1}`, sx: {} });
  }
  return result;
};

export const Overview = () => {
  const items = generateFakeData(10000);
  return (
    <Flex flexDirection="column">
      <Text>A virtualized list must always be wrapped in a container that has height/width</Text>
      <Card width={1} sx={{ height: '400px' }}>
        <VirtualizedList items={items} />
      </Card>
    </Flex>
  );
};
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
  knobs: { disable: true },
};
