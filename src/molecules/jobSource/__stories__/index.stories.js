import React from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import { JobSource } from '../index';

export default { title: 'Molecules/Job Source' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Job Source
    </Text>
    <Card mb={2} p={3} width="736px" variant="card.default" mx={0} ml={3}>
      <JobSource
        canUpdateJobSources
        source={{
          activeJobsCount: 4,
          scrapedAt: '2020-12-18T14:00:50.836Z',
          scraperStatus: 'automatic',
          url: 'https://angel.co/jobs/lehner-jaskolski-and-wyman',
        }}
      />
    </Card>
    <Card mb={2} p={3} width="736px" variant="card.default" mx={0} ml={3}>
      <JobSource
        canUpdateJobSources={false}
        source={{ activeJobsCount: 4, scrapedAt: '', scraperStatus: '', url: '' }}
      />
    </Card>
  </Flex>
);
export const Playground = () => (
  <Flex flexDirection="column">
    <Text as="h2" mb={3}>
      Job Source
    </Text>
    <Card mb={2} p={3} width="736px" variant="card.default" mx={0} ml={3}>
      <JobSource
        canUpdateJobSources
        source={{
          activeJobsCount: 4,
          scrapedAt: '2020-12-18T14:00:50.836Z',
          scraperStatus: 'automatic',
          url: 'https://angel.co/jobs/lehner-jaskolski-and-wyman',
        }}
      />
    </Card>
  </Flex>
);
Playground.decorators = [withSmartKnobs()];
