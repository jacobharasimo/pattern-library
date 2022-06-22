/* eslint-disable */
import React from 'react';
import { Flex } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { text, boolean } from '@storybook/addon-knobs';
import { Accordion } from '../index';

export default { title: 'molecules/Accordion' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Accordion title="This is the section title">Children</Accordion>
  </Flex>
);
Overview.parameters = {
  knobs: { disable: true },
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = () => (
  <Flex flexDirection="column">
    <Accordion isOpen={boolean('isOpen', false)} title={text('title', 'This is the section title')}>
      Children
    </Accordion>
  </Flex>
);
Playground.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};
Playground.decorators = [withSmartKnobs()];
