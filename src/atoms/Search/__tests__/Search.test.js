import React from 'react';
import { render } from '@testing-library/react';
import Search from '../index';

describe('Search', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      name: 'search',
      label: 'Search me',
      multiple: false,
      value: null,
      selectedItemLabelFormatter: undefined,
    };
  });

  it('renders', () => {
    component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with label', () => {
    props.label = 'Label';
    component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders multiple values', () => {
    props.multiple = true;
    props.value = [
      { label: 'option 1', value: 'option1' },
      { label: 'option 2', value: 'option2' },
    ];
    component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders multiple values with selected item formatter', () => {
    props.multiple = true;
    props.value = [
      { label: 'option 1', value: 'option1' },
      { label: 'option 2', value: 'option2' },
    ];
    props.selectedItemLabelFormatter = jest
      .fn()
      .mockImplementation(() => 'Generated label ');
    component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });
});
