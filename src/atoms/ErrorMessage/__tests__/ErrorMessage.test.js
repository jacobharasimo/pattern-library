import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from '../index';

describe('ErrorMessage', () => {
  const errorText = 'Error text';

  it('renders', () => {
    const { container } = render(<ErrorMessage>{errorText}</ErrorMessage>);
    expect(container).toHaveTextContent(errorText);
  });
});
