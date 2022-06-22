import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import './Label.stories.css';
import Label from '../index';

export default { title: 'Atoms/Legacy/Label' };

export const Overview = () => (
  <>
    <section className="LabelOverview__componentSection">
      <h2>Label</h2>
      <Label content="This is a test" className="Storybook__Label" />
      <Label content="This is a test" background="#333" color="#fff" className="Storybook__Label" />
    </section>
  </>
);
export const Playground = () => <Label />;
Playground.decorators = [withSmartKnobs()];
