import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SearchableList } from '../index';

describe('SearchableList', () => {
  let initProps = {};
  beforeEach(() => {
    initProps = {
      onSearchChange: jest.fn(),
      list: [],
      onSearchSubmit: jest.fn(),
    };
  });

  it('renders the search box', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('searchable-list-form')).not.toBeNull();
  });

  it('renders the error message', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} error="list error" />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('searchable-list-error')).not.toBeNull();
  });

  it('does not show create button', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('create-button')).toBeNull();
  });

  it('can show create button', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} showCreate />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('create-button')).not.toBeNull();
  });

  it('does not show empty state', () => {
    const { container, queryByTestId } = render(
      <SearchableList
        {...initProps}
        emptyState={() => <div data-testid="empty-state">empty state</div>}
      />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('empty-state')).toBeNull();
  });

  it('can show empty state', () => {
    const { container, queryByTestId } = render(
      <SearchableList
        {...initProps}
        showEmptyState
        emptyState={() => <div data-testid="empty-state">empty state</div>}
      />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('empty-state')).not.toBeNull();
  });

  it('renders the list of items', () => {
    const { container, queryByTestId } = render(
      <SearchableList
        {...initProps}
        list={[
          { label: 'a', id: 1 },
          { label: 'b', id: 2 },
        ]}
        itemTemplate={({ id, label }) => (
          <div data-testid={`list-item-${id}`}> {label}</div>
        )}
      />,
    );
    expect(container).not.toBeNull();
    expect(queryByTestId('list-item-1')).toHaveTextContent('a');
    expect(queryByTestId('list-item-2')).toHaveTextContent('b');
  });

  it('fire onSearchSubmit callback on submit', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} />,
    );
    const trigger = queryByTestId('searchable-list-form');
    expect(container).not.toBeNull();
    fireEvent.submit(trigger);
    expect(trigger).not.toBeNull();
    expect(initProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  it('fire onSearch change', () => {
    const { container, queryByTestId } = render(
      <SearchableList {...initProps} />,
    );
    const trigger = queryByTestId('searchable-list-input');
    expect(container).not.toBeNull();
    fireEvent.change(trigger, { target: { value: 'word' } });
    expect(trigger).not.toBeNull();
    expect(initProps.onSearchChange).toHaveBeenCalledTimes(1);
  });
});
