import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputMultiple from '../index';

describe('InputMultiple', () => {
  let props;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      value: [],
      className: '',
      type: 'text',
      placeholder: 'Type and press `Enter`',
      selectedOptionsOrientation: 'horizontal',
      name: 'inputMultiple',
    };
  });

  it('renders', () => {
    const { component } = render(<InputMultiple {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with label', () => {
    props.label = 'This is the component label';
    const { component } = render(<InputMultiple {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with errors', () => {
    props.form = {
      touched: {
        inputMultiple: true,
      },
      errors: {
        inputMultiple: 'Error message',
      },
    };
    const { component } = render(<InputMultiple {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with already selected options', () => {
    props.value = ['option 1', 'option 2'];
    const { component } = render(<InputMultiple {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('the value is set by typing and pressing intro', () => {
    props.label = 'Label text';
    const { queryByLabelText } = render(<InputMultiple {...props} />);

    const input = queryByLabelText('Label text');
    fireEvent.change(input, { target: { value: 'option 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('duplicated values are not allowed', () => {
    props.label = 'Label text';
    props.value = ['option 1', 'option 2'];
    const { queryByLabelText } = render(<InputMultiple {...props} />);

    const input = queryByLabelText('Label text');
    fireEvent.change(input, { target: { value: 'option 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onChange).not.toHaveBeenCalled();
  });
});
