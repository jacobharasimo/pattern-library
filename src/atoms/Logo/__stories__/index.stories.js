import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Logo from '../index';

export default { title: 'Atoms/Legacy/Logo' };

export const Overview = () => <Logo style={{ width: '200px' }} />;

export const Playground = () => <Logo style={{ width: '200px' }} />;
Playground.decorators = [withSmartKnobs()];
