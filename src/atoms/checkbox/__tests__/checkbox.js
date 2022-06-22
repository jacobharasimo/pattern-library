import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    const { container } = render(<Checkbox />);
    expect(container).not.toBeNull();
  });
});
