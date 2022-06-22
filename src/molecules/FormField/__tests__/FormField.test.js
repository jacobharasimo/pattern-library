import React from 'react';
import { render } from '@testing-library/react';
import FormField from '../index';

describe('FormField', () => {
  let props;

  beforeEach(() => {
    props = {
      field: {
        name: 'fieldName',
      },
      as: 'input',
      label: '',
      onChange: jest.fn(),
      form: {
        setFieldValue: jest.fn(),
        touched: {},
        errors: {},
      },
    };
  });

  it('renders input', () => {
    const { container } = render(<FormField {...props} />);

    container.querySelector('input');
  });

  it('renders textarea', () => {
    props.as = 'textarea';

    const { container } = render(<FormField {...props} />);

    container.querySelector('textarea');
  });

  it('renders with label', () => {
    const text = 'input label';
    const optionalText = 'optional';

    props.label = text;
    props.optional = true;
    props.optionalText = optionalText;

    const { getByText } = render(<FormField {...props} />);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(optionalText)).toBeInTheDocument();
  });

  it('renders with label as a component', () => {
    const text = 'input label';

    props.label = <span>{text}</span>;

    const { getByText } = render(<FormField {...props} />);

    expect(getByText(text)).toBeInTheDocument();
  });

  it('renders with error', () => {
    const errorText = 'error message';

    props.form.touched = { fieldName: true };
    props.form.errors = { fieldName: errorText };

    const { getByText } = render(<FormField {...props} />);

    expect(getByText(errorText)).toBeInTheDocument();
  });
});
