import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import Badge from '../index';

export default { title: 'Atoms/Legacy/Badge' };

export const Overview = () => (
  <>
    <Badge>3</Badge>
    <Badge backgroundColor="var(--color-gray-5)" textColor="var(--color-text)">
      213
    </Badge>
    <Badge size="sm" boxShadow="none">
      3
    </Badge>
    <Badge size="sm">213</Badge>
  </>
);
export const Playground = () => <Badge />;
Playground.decorators = [withSmartKnobs()];
