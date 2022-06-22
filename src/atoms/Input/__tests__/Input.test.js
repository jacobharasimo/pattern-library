import React from 'react';
import { render } from '@testing-library/react';
import Input from '..';

describe('Input', () => {
  it('renders', () => {
    const { container } = render(<Input />);

    expect(container).not.toBeNull();
  });

  it('has a value and a placeholder', () => {
    const placeholder = 'test placeholder';
    const { queryByPlaceholderText } = render(
      <Input placeholder={placeholder} value="test" />,
    );
    const searchInput = queryByPlaceholderText(placeholder);

    expect(searchInput.value).toBe('test');
  });

  it('renders using different sizes', () => {
    const { container, rerender } = render(<Input size="sm" />);

    expect(container).not.toBeNull();

    rerender(<Input size="lg" />);

    expect(container).not.toBeNull();
  });
});
