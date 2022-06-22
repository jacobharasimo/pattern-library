import React from 'react';
import { render } from '@testing-library/react';
import Select from '../index';

describe('Select', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'Select',
      label: 'Select me',
      multiple: false,
      value: null,
      options: [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
      ],
    };
  });

  it('renders', () => {
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with label', () => {
    props.label = 'Label';
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders sm', () => {
    props.size = 'sm';
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders lg', () => {
    props.size = 'lg';
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiple selected values', () => {
    props.multiple = true;
    props.value = [
      { label: 'option 1', value: 1 },
      { label: 'option 2', value: 2 },
    ];
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiple values with option label formatter', () => {
    props.customFormatOptionLabel = jest
      .fn()
      .mockImplementation(() => 'Generated label ');
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with icon and tooltip in options', () => {
    props.options = [
      {
        label: 'option 1',
        value: 'option1',
        tooltipText: 'Lorem Ipsum dolor',
        icon: '🎨',
      },
      {
        label: 'option 2',
        value: 'option2',
        tooltipText: 'Lorem Ipsum dolor',
        icon: '🎨',
      },
    ];
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with error', () => {
    props.form = {
      touched: {
        Select: true,
      },
      errors: {
        Select: 'Error Message',
      },
    };
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });
});
