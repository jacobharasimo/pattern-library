import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Search from '../index';

export default { title: 'Atoms/Legacy/Search' };

const SearchComponent = props => {
  const [selectedValues, setSelectedValues] = useState([]);

  const values = [
    { value: 'value-1', label: 'Value 1' },
    { value: 'value-2', label: 'Value 2' },
    { value: 'value-3', label: 'Value 3' },
  ];

  const handleLocationsSearch = async query => {
    if (!query.length) {
      return [];
    }
    return values.filter(v => v.label.toLowerCase().includes(query));
  };

  const handleChange = ({ target }) => setSelectedValues(target.value);

  return (
    <>
      <Search
        multiple
        label="Default search"
        name="sample-search"
        onSearch={handleLocationsSearch}
        onChange={handleChange}
        value={selectedValues}
        showAvatar
        {...props}
      />
    </>
  );
};

export const Overview = () => <SearchComponent />;

export const Playground = () => (
  <SearchComponent
    disabled={boolean('Disabled', false)}
    label={text('Label', 'Search something')}
    orientation={select('Orientation', ['vertical', 'horizontal'], 'vertical')}
    placeholder={text('Placeholder', 'Start typing')}
    size={select('Size', ['sm', 'md', 'lg'], 'md')}
  />
);
Playground.decorators = [withSmartKnobs()];
