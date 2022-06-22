import React from 'react';
import { List } from 'react-feather';

import Select from '../index';

export default { title: 'Atoms/Legacy/Select' };

const exampleOptions = [
  {
    value: 1,
    label: 'Option 1',
    icon: <List />,
    tooltipText: 'Lorem Ipsum dolor',
  },
  { value: 2, label: 'Option 2', tooltipText: 'Lorem Ipsum dolor' },
  {
    value: 3,
    label: 'Option 3 is super long to see how it looks when something is too long',
    icon: '🎨',
    tooltipText: 'Lorem Ipsum dolor',
  },
];

const exampleGroupedOptions = [
  {
    label: 'Group 1',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
  },
];

export const Overview = () => (
  <div>
    <div style={{ display: 'flex', flexBasis: '' }}>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select
          name="demo1"
          label="Size sm"
          options={exampleOptions}
          placeholder="Select one option"
          size="sm"
          disabled
          value={exampleOptions[0]}
        />
      </div>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select name="demo2" label="Size md (default)" options={exampleOptions} placeholder="Select one option" />
      </div>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select
          name="demo3"
          label="Size lg"
          options={exampleOptions}
          placeholder="Select one option"
          size="lg"
          value={exampleOptions[0]}
        />
      </div>
    </div>

    <div style={{ display: 'flex', flexBasis: '' }}>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select
          name="demo4"
          label="Size sm"
          options={exampleGroupedOptions}
          placeholder="Select one option"
          size="sm"
        />
      </div>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select
          name="demo5"
          label="Size md (default)"
          options={exampleGroupedOptions}
          placeholder="Select one option"
        />
      </div>
      <div style={{ flex: '1 1 0', padding: 8 }}>
        <Select
          name="demo6"
          label="Size lg"
          options={exampleGroupedOptions}
          placeholder="Select one option"
          size="lg"
        />
      </div>
    </div>
  </div>
);
