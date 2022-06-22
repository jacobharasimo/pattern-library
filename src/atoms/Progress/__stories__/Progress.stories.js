import React from 'react';
import './Progress.stories.css';
import { number } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Progress from '../index';

export default { title: 'Atoms/Legacy/Progress' };

export const Overview = () => (
  <>
    <section className="ProgressOverview__componentSection">
      <h2>Progress</h2>
      <Progress showText="Onboarding" step={0} total={3} />
    </section>
  </>
);
export const Playground = () => <Progress showText="Onboarding" step={number('Step', 0)} total={number('Total', 3)} />;
Playground.decorators = [withSmartKnobs()];
