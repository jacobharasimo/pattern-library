import React from 'react';
import { Card } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { TableRow } from '../index';

export default { title: 'Molecules/Table Row' };

export const Overview = () => (
  <Card>
    <TableRow title="Row Title" value="Row Value" />
  </Card>
);

export const Playground = () => (
  <Card>
    <TableRow title="Row Title" value="Row Value" />
  </Card>
);
Playground.decorators = [withSmartKnobs()];
