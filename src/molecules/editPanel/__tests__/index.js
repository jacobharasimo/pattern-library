import React from 'react';
import { render, queryByText } from '@testing-library/react';
import { EditPanel } from '../index';

describe('EditPanel', () => {
  let initProps = {};
  beforeEach(() => {
    initProps = {
      isEditMode: false,
      isLoading: false,
      canEdit: true,
      onEditClick: jest.fn(),
      closeEditAfterSave: true,
      saveButton: { children: 'save', onClick: jest.fn(), isLoading: false },
      cancelButton: { children: 'cancel', onClick: jest.fn() },
      title: 'A sample edit panel',
    };
  });

  it('renders', () => {
    const { queryByTestId, getByTestId, container } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    expect(getByTestId('header')).not.toBeNull();
    expect(getByTestId('header-action')).not.toBeNull();
    expect(getByTestId('content')).not.toBeNull();
    expect(queryByTestId('footer')).toBeNull();
  });

  it('shows a loader', () => {
    initProps.isLoading = true;
    const { queryByTestId, container } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    expect(queryByTestId('loader')).not.toBeNull();
  });

  it('renders children', () => {
    const { container } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    expect(queryByText(container, 'Content goes here.')).not.toBeNull();
  });

  it('renders children functions', () => {
    const { container } = render(<EditPanel {...initProps}>{() => <>some other children</>}</EditPanel>);
    expect(container).not.toBeNull();
    expect(queryByText(container, 'some other children')).not.toBeNull();
  });

  it('renders a header button', () => {
    const { queryByTestId, container, rerender } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    const headerButton = queryByTestId('header-action');
    expect(queryByText(headerButton, 'Edit')).not.toBeNull();
    initProps.canEdit = false;
    rerender(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(queryByTestId('header-action')).toBeNull();

    initProps.canEdit = true;
    initProps.isLoading = true;
    rerender(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(queryByTestId('header-action')).toBeNull();
  });

  it('calls onEditClick as needed', () => {
    const { queryByTestId, container } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    queryByTestId('header-action').click();
    expect(initProps.onEditClick).toHaveBeenCalledTimes(1);
  });

  it('can render the footer as needed', () => {
    initProps.isLoading = true;
    const { queryByTestId, container, rerender } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    expect(queryByTestId('footer')).toBeNull();

    initProps.isLoading = false;
    initProps.footer = <>This is the footer</>;
    rerender(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(queryByTestId('footer')).not.toBeNull();
    expect(queryByText(container, 'This is the footer')).not.toBeNull();
    queryByTestId('header-action').click();
    expect(queryByTestId('footer')).not.toBeNull();
    expect(queryByText(container, 'This is the footer')).toBeNull();
    expect(queryByTestId('footer-actions')).not.toBeNull();
  });

  it('has a cancel button when in edit mode', () => {
    const { queryByTestId, container } = render(<EditPanel {...initProps}>Content goes here.</EditPanel>);
    expect(container).not.toBeNull();
    queryByTestId('header-action').click();
    expect(queryByTestId('footer-actions')).not.toBeNull();
    const cancelButton = queryByTestId('cancel-button');
    expect(cancelButton).not.toBeNull();
    cancelButton.click();
    expect(initProps.cancelButton.onClick).toHaveBeenCalledTimes(1);
  });
});
