import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import Loader from '../index';

export default { title: 'Atoms/Legacy/Loader' };

export const Overview = () => <Loader />;
export const Playground = () => <Loader />;
Playground.decorators = [withSmartKnobs()];
