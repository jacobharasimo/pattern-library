import React from 'react';
import { render } from '@testing-library/react';
import { MessageIcon } from '../index';

describe('MessageIcon', () => {
  it('renders', () => {
    const { container } = render(<MessageIcon />);

    expect(container).not.toBeNull();
  });

  it('renders with props', () => {
    const props = {
      type: 'success',
      height: '16px',
      width: '16px',
    };
    const { container } = render(<MessageIcon {...props} />);

    expect(container).not.toBeNull();
  });
});
