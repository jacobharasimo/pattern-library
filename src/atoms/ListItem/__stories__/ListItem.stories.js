import React from 'react';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import ListItem from '../index';

export default { title: 'Atoms/Legacy/List Item' };

export const Overview = () => (
  <>
    <h4>Vertical list items</h4>
    <ListItem content="This is a test" />
    <ListItem content="This is a test" />
    <ListItem content="This is a test" background="#333" color="#fff" />
    <ListItem avatarUrl="https://cdn.filepicker.io/api/file/J3xt1hPrT5KZeCuXWUDa" showAvatar />
    <h4>Horizontal list items</h4>
    <ListItem content="This is a test" orientation="horizontal" />
    <ListItem content="This is a test" orientation="horizontal" />
    <ListItem orientation="horizontal" content="This is a test" background="#333" color="#fff" />
    <ListItem avatarUrl="https://cdn.filepicker.io/api/file/J3xt1hPrT5KZeCuXWUDa" orientation="horizontal" showAvatar />
  </>
);
export const Playground = () => (
  <ListItem orientation="horizontal" background="#333" color="#fff">
    This is a test
  </ListItem>
);
Playground.decorators = [withSmartKnobs()];
