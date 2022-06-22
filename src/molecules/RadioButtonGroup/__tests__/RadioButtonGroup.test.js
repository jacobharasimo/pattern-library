import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { RadioButtonGroup } from '../index';

describe('BoxSection', () => {
  let props;

  const formikProps = {
    initialValues: {
      radioButtoGroup: '1',
    },
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
      label: 'Radio button group',
      id: 'radio-button-group',
      selected: '1',
      name: 'radioButtonGroup',
    };
  });

  it('renders', () => {
    const { container } = render(
      <Formik {...formikProps}>
        <RadioButtonGroup {...props} />
      </Formik>,
    );
    expect(container).toMatchSnapshot();
  });
});
