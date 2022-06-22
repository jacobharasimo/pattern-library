import React from 'react';
import { render } from '@testing-library/react';
import { Tag } from '../index';

describe('Tag', () => {
  it('renders without a remove control', () => {
    const { container, getByTestId } = render(<Tag>Test Tag</Tag>);
    expect(container).not.toBeNull();
    expect(getByTestId('tag')).not.toBeNull();
  });
  it('renders with a remove control', () => {
    const { container, getByTestId } = render(<Tag canRemove>Test Tag</Tag>);
    expect(container).not.toBeNull();
    expect(getByTestId('tag')).not.toBeNull();
    expect(container.querySelector('[data-item=close-icon]')).not.toBeNull();
  });
  it('renders the right children in the tag', () => {
    const children = 'Test Tag';
    const { getByText, container, getByTestId } = render(<Tag>{children}</Tag>);
    expect(container).not.toBeNull();
    expect(getByTestId('tag')).not.toBeNull();
    expect(getByText(children)).not.toBeNull();
  });
});
