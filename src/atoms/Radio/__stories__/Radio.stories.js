import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Radio from '../index';

export default { title: 'Atoms/Legacy/Radio' };

export const Overview = () => (
  <>
    <section className="RadioOverview__componentSection">
      <h2>Radio md</h2>
      <Flex>
        <Box mr={3}>
          <Radio className="Storybook__Radio" size="md" label="Default" />
        </Box>
        <Box mx={3}>
          <Radio className="Storybook__Radio" size="md" checked label="I'm checked" />
        </Box>
        <Box mx={3}>
          <Radio className="Storybook__Radio" size="md" disabled label="I'm disabled" />
        </Box>
        <Box ml={3}>
          <Radio className="Storybook__Radio" size="md" checked disabled label="I'm checked and disabled" />
        </Box>
      </Flex>
    </section>

    <section className="RadioOverview__componentSection">
      <h2>Radio lg</h2>
      <Flex>
        <Box mr={3}>
          <Radio className="Storybook__Radio" size="lg" label="Default" />
        </Box>
        <Box mx={3}>
          <Radio className="Storybook__Radio" size="lg" checked label="I'm checked" />
        </Box>
        <Box mx={3}>
          <Radio className="Storybook__Radio" size="lg" disabled label="I'm disabled" />
        </Box>
        <Box ml={3}>
          <Radio className="Storybook__Radio" size="lg" checked disabled label="I'm checked and disabled" />
        </Box>
      </Flex>
    </section>
  </>
);

export const Playground = () => <Radio size="lg" label="Default" />;
Playground.decorators = [withSmartKnobs()];
