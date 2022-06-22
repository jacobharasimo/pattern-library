import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinner } from '../index';

describe('Loading Spinner', () => {
  it('renders a loading spinner', () => {
    const props = {
      children: 'test button',
      isLoading: true,
    };
    const { container, queryByTestId } = render(<LoadingSpinner {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loading-spinner')).not.toBeNull();
  });
  it('renders null when not loading', () => {
    const props = {
      children: 'test button',
      isLoading: false,
    };
    const { container, queryByTestId } = render(<LoadingSpinner {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loading-spinner')).toBeNull();
  });
});
