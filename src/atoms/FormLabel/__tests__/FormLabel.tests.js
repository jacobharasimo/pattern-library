import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '..';

describe('FormLabel', () => {
  it('renders default', () => {
    const text = 'Label';
    const { getByText } = render(<FormLabel>{text}</FormLabel>);

    expect(getByText(text)).toBeInTheDocument();
  });

  it('renders with htmlFor', () => {
    const { container } = render(
      <FormLabel htmlFor="another-field-id">Label</FormLabel>,
    );

    expect(container).not.toBeNull();
  });
});
