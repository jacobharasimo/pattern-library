import React from 'react';
import Popover from '../index';

export default { title: 'Atoms/Legacy/Popover' };

export const Overview = () => (
  <Popover header="This is a popup!" content="And this is the content" trigger={<span>Hover me</span>} />
);
