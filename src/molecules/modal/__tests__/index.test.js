import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Modal } from '../index';

describe('Rebass Modal', () => {
  let initProps = {};
  beforeEach(() => {
    initProps = {
      dataTestId: 'test',
      isOpen: true,
      onCancel: jest.fn(),
      title: 'Sample Modal',
      actions: <>this is a footer</>,
      children: <>This is the body of the modal</>,
    };
  });

  it('renders when open', () => {
    const { container, queryByTestId } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();
  });

  it('renders nothing when not open', () => {
    initProps.isOpen = false;
    const { queryByTestId } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).toBeNull();
  });

  it('renders a title when provided', () => {
    const { queryByTestId, rerender } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();

    expect(queryByTestId('title')).not.toBeNull();
    initProps.title = null;
    rerender(<Modal {...initProps} />);
    expect(queryByTestId('title')).toBeNull();
  });

  it('renders actions when provided', () => {
    const { queryByTestId, rerender } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();

    expect(queryByTestId('footer')).not.toBeNull();
    initProps.actions = null;
    rerender(<Modal {...initProps} />);
    expect(queryByTestId('footer')).toBeNull();
  });

  it('closes when clicking on the overlay', () => {
    const { queryByTestId } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();

    const overlay = queryByTestId('overlay');
    fireEvent.click(overlay);
    expect(initProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking on the close button', () => {
    const { queryByTestId } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();

    const closeButton = queryByTestId('close');
    fireEvent.click(closeButton);
    expect(initProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('closes when pressing escape an not others', () => {
    const { queryByTestId } = render(<Modal {...initProps} />);
    expect(queryByTestId('modal')).not.toBeNull();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'd',
        code: 'keyD',
        keyCode: 0,
        charCode: 0,
      }),
    );
    expect(initProps.onCancel).toHaveBeenCalledTimes(0);
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      }),
    );
    expect(initProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
