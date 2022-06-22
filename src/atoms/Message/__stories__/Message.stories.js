import React from 'react';
import './Message.stories.css';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import Message from '../index';

export default { title: 'Atoms/Legacy/Message' };

export const Overview = () => <Message type="info" content="Happy Monday!" />;

export const Details = () => (
  <>
    <h4>Info</h4>
    <Message type="info" content="Info message example." />
    <h4>Success</h4>
    <Message type="success" content="Info message example." />
    <h4>Warning</h4>
    <Message type="warning" content="Info message example." />
    <h4>Error</h4>
    <Message type="error" content="Info message example." />
  </>
);

export const Playground = () => <Message type="info" content="Info message example." />;
Playground.decorators = [withSmartKnobs()];
