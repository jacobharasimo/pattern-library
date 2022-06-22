import React from 'react';
import { render } from '@testing-library/react';
import TextArea from '..';

describe('TextArea', () => {
  it('renders', () => {
    const { container } = render(<TextArea />);

    expect(container).not.toBeNull();
  });

  it('has a value and a placeholder', () => {
    const placeholder = 'test placeholder';
    const { queryByPlaceholderText } = render(<TextArea placeholder={placeholder} value="test" />);
    const searchInput = queryByPlaceholderText(placeholder);

    expect(searchInput.value).toBe('test');
  });

  it('renders using different sizes', () => {
    const { container, rerender } = render(<TextArea size="sm" />);

    expect(container).not.toBeNull();

    rerender(<TextArea size="lg" />);

    expect(container).not.toBeNull();
  });

  it('renders with error', () => {
    const { container } = render(<TextArea error />);

    expect(container).not.toBeNull();
  });
});
