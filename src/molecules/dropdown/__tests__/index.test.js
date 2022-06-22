import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Dropdown } from '../index';

describe('Dropdown', () => {
  let initProps = {};
  beforeEach(() => {
    initProps = {
      onClose: jest.fn(),
      onOpen: jest.fn(),
      triggerProps: { children: 'trigger' },
    };
  });
  it('renders the trigger', () => {
    const { container, queryByTestId } = render(<Dropdown {...initProps}>Test Content</Dropdown>);
    expect(container).not.toBeNull();
    expect(queryByTestId('dropdown-trigger')).not.toBeNull();
    expect(queryByTestId('dropdown_content')).toBeNull();
  });
  it('renders the dropdown when triggered', async () => {
    const { container, queryByTestId } = render(<Dropdown {...initProps}>Test Content</Dropdown>);
    expect(container).not.toBeNull();
    expect(queryByTestId('dropdown-trigger')).not.toBeNull();
    const trigger = queryByTestId('dropdown-trigger');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).not.toBeNull();
    });
  });
  it('escape key closes the dropdown', async () => {
    const { container, queryByTestId } = render(<Dropdown {...initProps}>Test Content</Dropdown>);
    expect(container).not.toBeNull();
    expect(queryByTestId('dropdown-trigger')).not.toBeNull();
    const trigger = queryByTestId('dropdown-trigger');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).not.toBeNull();
    });
    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', charCode: 27 });
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).toBeNull();
    });
  });
  it('can call an onOpen function when open only', async () => {
    const { container, queryByTestId } = render(<Dropdown {...initProps}>Test Content</Dropdown>);
    expect(container).not.toBeNull();
    expect(initProps.onClose).not.toHaveBeenCalled();
    expect(queryByTestId('dropdown-trigger')).not.toBeNull();
    const trigger = queryByTestId('dropdown-trigger');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).not.toBeNull();
      expect(initProps.onOpen).toHaveBeenCalledTimes(1);
    });
    expect(initProps.onClose).not.toHaveBeenCalled();
  });
  it('can call an onClose function when open only', async () => {
    initProps.interactive = false;
    const { container, queryByTestId, queryByText } = render(<Dropdown {...initProps}>Test Content</Dropdown>);
    expect(container).not.toBeNull();
    expect(queryByTestId('dropdown-trigger')).not.toBeNull();
    expect(initProps.onClose).not.toHaveBeenCalled();
    const trigger = queryByTestId('dropdown-trigger');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).not.toBeNull();
    });
    const content = queryByText(initProps.triggerProps.children);
    expect(content).not.toBeNull();
    fireEvent.click(content);
    await waitFor(() => {
      expect(queryByTestId('dropdown-content')).toBeNull();
      expect(initProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
