import React from 'react';
import {
  fireEvent,
  queryAllByTestId as globalQueryAllByTestId,
  queryByTestId as globalQueryByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import { Text } from 'rebass/styled-components';
import { DataTable } from '../index';
import { Button } from '../../../atoms/button';

describe('Data Table', () => {
  let props = {};
  beforeEach(() => {
    props = {
      height: 400,
      rowHeight: 48,
      hasMore: true,
      canSort: true,
      rowActions: null,
      initialSortBy: { id: 'col1', desc: false },
      isInitialized: false,
      total: 0,
      loadMore: jest.fn(),
      items: [],
      columnDefinition: [
        {
          Header: 'Column 1',
          accessor: 'col1', // accessor is the "key" in the data
          width: '50%',
        },
        {
          Header: 'Column 2',
          accessor: 'col2',
          width: '50%',
        },
      ],
      onSort: jest.fn(),
    };
  });

  describe('renders colum headers', () => {
    it('and a loader when not ready', () => {
      const { container, queryByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      expect(queryByTestId('thead')).not.toBeNull();
      expect(queryByTestId('loading-spinner')).not.toBeNull();
    });
    it('with column per property', () => {
      const { container, queryByTestId, queryAllByTestId } = render(
        <DataTable {...props} />,
      );
      expect(container).not.toBeNull();
      expect(queryByTestId('thead')).not.toBeNull();
      const columnHeaders = queryAllByTestId(`th`);
      expect(columnHeaders).not.toBeNull();
      expect(columnHeaders).toHaveLength(props.columnDefinition.length);
    });
  });

  describe('uses a virtualized list', () => {
    it('renders only a subset of the list when given large data set', () => {
      const resultCount = 40;
      props.isInitialized = true;
      props.total = resultCount;
      props.initialItemCount = 20;

      props.items = [];
      for (let i = 0; i < resultCount; i += 1) {
        props.items.push({
          col1: `random name ${i}`,
          col2: <Text>random description {1000 - i}</Text>,
        });
      }
      const { container, queryAllByTestId, queryByTestId } = render(
        <DataTable {...props} />,
      );
      expect(queryByTestId('row-loader')).toBeNull();
      const rows = queryAllByTestId('data-row');
      expect(rows.length).toBeGreaterThan(0);
      expect(rows.length).toBeLessThan(resultCount);
      expect(container).not.toBeNull();
    });
  });
  describe('can sort', () => {
    it('can enabled/disable sort feature', () => {
      const { rerender, container, queryAllByTestId } = render(
        <DataTable {...props} />,
      );
      expect(container).not.toBeNull();
      expect(queryAllByTestId('sort-controls')).not.toBeNull();
      props.canSort = false;
      rerender(<DataTable {...props} />);
      expect(queryAllByTestId('sort-controls')).toHaveLength(0);
    });
    it('allows initial sort to be set', () => {
      const { container, queryAllByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      expect(queryAllByTestId('sort-controls')).not.toBeNull();
      const sortedHeader = container.querySelector(
        `[data-columnaccessor="${props.initialSortBy.id}"]`,
      );
      expect(sortedHeader).not.toBeNull();
      if (props.initialSortBy.desc) {
        expect(
          sortedHeader.querySelector(`[data-testid="sort-ascending"]`),
        ).not.toBeNull();
      } else {
        expect(
          sortedHeader.querySelector(`[data-testid="sort-descending"]`),
        ).not.toBeNull();
      }
    });
    it('uses can use server side sorting on columns', () => {
      props.initialSortBy = null;
      const { container, queryAllByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      const columnHeaders = queryAllByTestId(`th`);
      expect(columnHeaders).not.toBeNull();
      fireEvent.click(columnHeaders[0]);
      expect(props.onSort).toHaveBeenCalledWith([{ id: 'col1', desc: false }]);
      fireEvent.click(columnHeaders[0]);
      expect(props.onSort).toHaveBeenCalledWith([{ id: 'col1', desc: true }]);
      fireEvent.click(columnHeaders[1]);
      expect(props.onSort).toHaveBeenCalledWith([{ id: 'col2', desc: false }]);
      fireEvent.click(columnHeaders[1]);
      expect(props.onSort).toHaveBeenCalledWith([{ id: 'col2', desc: true }]);
    });
    it('sort when initialSortBy is set', () => {
      const { container, queryAllByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      const columnHeaders = queryAllByTestId(`th`);
      expect(columnHeaders).not.toBeNull();
      expect(queryAllByTestId('sort-controls')).not.toBeNull();

      fireEvent.click(
        container.querySelector(
          `[data-columnaccessor="${props.initialSortBy.id}"]`,
        ),
      );
      expect(props.onSort).toHaveBeenCalledWith([
        { id: props.initialSortBy.id, desc: !props.initialSortBy.desc },
      ]);

      fireEvent.click(
        container.querySelector(
          `[data-columnaccessor="${props.initialSortBy.id}"]`,
        ),
      );
      expect(props.onSort).toHaveBeenCalledWith([props.initialSortBy]);

      const otherColumn = props.columnDefinition.find(
        (col) => col.accessor !== props.initialSortBy.id,
      );

      fireEvent.click(
        container.querySelector(
          `[data-columnaccessor="${otherColumn.accessor}"]`,
        ),
      );
      expect(props.onSort).toHaveBeenCalledWith([
        { id: otherColumn.accessor, desc: false },
      ]);

      fireEvent.click(
        container.querySelector(
          `[data-columnaccessor="${otherColumn.accessor}"]`,
        ),
      );
      expect(props.onSort).toHaveBeenCalledWith([
        { id: otherColumn.accessor, desc: true },
      ]);
    });
  });
  describe('can lazy load', () => {
    it('shows a row loader for itesm that are fetching', () => {
      const { container } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
    });
    it('loads more when you scroll to the bottom', () => {
      const { container } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
    });
  });
  describe('supports row level actions', () => {
    const testClick = jest.fn();
    beforeEach(() => {
      props.initialItemCount = 20;
      props.rowActions = {
        height: 100,
        items: [
          {
            isHidden: (row) => !!(parseInt(row.id, 10) % 3),
            isDisabled: (row) => !!(parseInt(row.id, 10) % 2),
            Item: Button,
            width: 1,
            textAlign: 'left',
            variant: 'tertiary',
            children: 'test 1',
            onClick: (e) => testClick({ original: e.original }),
          },
          {
            Item: Button,
            width: 1,
            textAlign: 'left',
            variant: 'tertiary',
            children: 'test 2',
            onClick: (e) => testClick({ original: e.original }),
          },
        ],
      };
      props.isInitialized = true;
      props.total = 40;
      props.items = [];
      for (let i = 0; i < props.total; i += 1) {
        props.items.push({
          col1: `random name ${i}`,
          col2: `random description ${1000 - i}`,
        });
      }
    });
    it('renders the action menu if defined', () => {
      const { container, queryAllByTestId, queryByTestId, rerender } = render(
        <DataTable {...props} />,
      );
      expect(container).not.toBeNull();
      expect(queryAllByTestId('dropdown')).not.toBeNull();
      expect(queryAllByTestId('dropdown').length).toBeGreaterThan(0);
      props.rowActions = null;
      rerender(<DataTable {...props} />);
      expect(container).not.toBeNull();
      expect(queryByTestId('dropdown')).toBeNull();
    });

    it('allows actions to hide per row', async () => {
      const { container, queryAllByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      const rows = queryAllByTestId('data-row');
      expect(rows).not.toBeNull();
      expect(rows.length).toBeGreaterThan(0);

      let dropDownTrigger = globalQueryByTestId(rows[0], 'dropdown-trigger');
      expect(dropDownTrigger).not.toBeNull();
      fireEvent.click(dropDownTrigger);
      await (() => {
        const dropdownContainer = globalQueryByTestId(
          rows[0],
          'dropdown-content',
        );
        expect(dropdownContainer).not.toBeNull();
        const dropdownOptions = globalQueryAllByTestId(
          dropdownContainer,
          'base-button',
        );
        expect(dropdownOptions).not.toBeNull();
        expect(dropdownOptions.length).toEqual(2);
      });

      dropDownTrigger = globalQueryByTestId(rows[2], 'dropdown-trigger');
      expect(dropDownTrigger).not.toBeNull();
      fireEvent.click(dropDownTrigger);
      await (() => {
        const dropdownContainer = globalQueryByTestId(
          rows[2],
          'dropdown_content',
        );
        expect(dropdownContainer).not.toBeNull();
        const dropdownOptions = globalQueryAllByTestId(
          dropdownContainer,
          'base-button',
        );
        expect(dropdownOptions).not.toBeNull();
        expect(dropdownOptions.length).toEqual(1);
      });
    });

    it('allows actions to disable per row', async () => {
      const { container, queryAllByTestId } = render(<DataTable {...props} />);
      expect(container).not.toBeNull();
      const rows = queryAllByTestId('data-row');
      expect(rows).not.toBeNull();
      expect(rows.length).toBeGreaterThan(0);

      let dropDownTrigger = globalQueryByTestId(rows[0], 'dropdown-trigger');
      expect(dropDownTrigger).not.toBeNull();
      fireEvent.click(dropDownTrigger);
      await waitFor(() => {
        const dropdownContainer = globalQueryByTestId(
          rows[0],
          'dropdown-content',
        );
        expect(dropdownContainer).not.toBeNull();
        const dropdownOptions = globalQueryAllByTestId(
          dropdownContainer,
          'base-button',
        );
        expect(dropdownOptions).not.toBeNull();
        expect(dropdownOptions.filter((item) => item.disabled).length).toEqual(
          0,
        );
      });

      dropDownTrigger = globalQueryByTestId(rows[3], 'dropdown-trigger');
      expect(dropDownTrigger).not.toBeNull();
      fireEvent.click(dropDownTrigger);
      await waitFor(() => {
        const dropdownContainer = globalQueryByTestId(
          rows[3],
          'dropdown-content',
        );
        expect(dropdownContainer).not.toBeNull();
        const dropdownOptions = globalQueryAllByTestId(
          dropdownContainer,
          'base-button',
        );
        expect(dropdownOptions).not.toBeNull();
        expect(dropdownOptions.filter((item) => item.disabled).length).toEqual(
          1,
        );
      });
    });

    it('passes the row to the click action', async () => {
      const targetRowNumber = 0;
      const { container, queryAllByTestId, queryByText } = render(
        <DataTable {...props} />,
      );
      expect(container).not.toBeNull();
      const rows = queryAllByTestId('data-row');
      expect(rows).not.toBeNull();
      expect(rows.length).toBeGreaterThan(0);

      const dropDownTrigger = globalQueryByTestId(
        rows[targetRowNumber],
        'dropdown-trigger',
      );
      expect(dropDownTrigger).not.toBeNull();
      fireEvent.click(dropDownTrigger);
      await waitFor(() => {
        const dropdownContainer = globalQueryByTestId(
          rows[targetRowNumber],
          'dropdown-content',
        );
        expect(dropdownContainer).not.toBeNull();
      });
      const option = queryByText(props.rowActions.items[0].children);
      expect(option).not.toBeNull();
      fireEvent.click(option);
      expect(testClick).toHaveBeenLastCalledWith({
        original: props.items[targetRowNumber],
      });
    });
  });
});
