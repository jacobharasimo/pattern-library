import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import Social from '../index';

export default { title: 'Molecules/Social' };
export const Overview = () => (
  <Social
    className="Storybook__Social"
    email="mailto:monday@monday.vc"
    github="https://github.com"
    linkedin="https://linkedin.com"
    resume="https://google.com"
    twitter="https://twitter.com"
    website="https://google.fr"
    angellist="https://angel.co/"
    dribbble="https://dribbble.url"
  />
);
export const Details = () => (
  <>
    <h3>Normal size</h3>
    <Social
      className="Storybook__Social"
      email="mailto:monday@monday.vc"
      github="https://github.com"
      linkedin="https://linkedin.com"
      resume="https://google.com"
      twitter="https://twitter.com"
      website="https://google.fr"
      angellist="https://angel.co/"
      dribbble="https://dribbble.url"
    />
    <h3>Small</h3>
    <Social
      size="sm"
      className="Storybook__Social"
      email="mailto:monday@monday.vc"
      github="https://github.com"
      linkedin="https://linkedin.com"
      resume="https://google.com"
      twitter="https://twitter.com"
      website="https://google.fr"
      angellist="https://angel.co/"
      dribbble="https://dribbble.url"
    />
  </>
);
export const Playground = () => {
  const defaultValue = 'md';
  const options = {
    small: 'sm',
    medium: 'md',
  };
  return (
    <Social
      className="Storybook__Social"
      email={text('email', 'mailto:monday@monday.vc')}
      github={text('github', 'https://github.com')}
      linkedin={text('linkedin', 'https://linkedin.com')}
      resume={text('resume', 'https://google.com')}
      twitter={text('twitter', 'https://twitter.com')}
      website={text('website', 'https://google.fr')}
      dribble={text('dribbble', 'https://dribbble.com')}
      size={select('Size', options, defaultValue)}
    />
  );
};
Playground.decorators = [withSmartKnobs()];
