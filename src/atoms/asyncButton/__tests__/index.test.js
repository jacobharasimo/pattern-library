import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { AsyncButton } from '../index';

describe('Async Button', () => {
  it('renders a button and its children with no loader', () => {
    const props = {
      children: 'test button',
    };
    const { container, queryByTestId } = render(<AsyncButton {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loading-spinner')).toBeNull();
    expect(queryByTestId('children')).toHaveStyle('visibility: visible');
    expect(queryByTestId('children')).toHaveTextContent(props.children);
  });
  it('renders a loading spinner when loading', () => {
    const props = {
      children: 'test button',
      loading: true,
    };
    const { container, queryByTestId } = render(<AsyncButton {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loading-spinner')).not.toBeNull();
    expect(queryByTestId('children')).toHaveStyle('visibility: hidden');
    expect(queryByTestId('children')).toHaveTextContent(props.children);
  });
  it('renders a loading spinner with different size', () => {
    const props = {
      children: 'test button',
      loading: true,
      size: 'large',
    };
    const { container, queryByTestId } = render(<AsyncButton {...props} />);

    expect(container).not.toBeNull();
    expect(queryByTestId('children')).toHaveTextContent(props.children);
  });
  it("doesn't trigger click events when loading", () => {
    const onClick = jest.fn();
    const props = {
      children: 'test button',
      loading: true,
      onClick,
    };
    const { container, queryByTestId } = render(<AsyncButton {...props} />);
    expect(container).not.toBeNull();
    const trigger = queryByTestId('async-button');
    fireEvent.click(trigger);
    expect(onClick).not.toHaveBeenCalled();
  });
});
