import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Card, Flex, Text } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import { useSortBy, useTable } from 'react-table';
import isEqual from 'lodash.isequal';
import { Virtuoso } from 'react-virtuoso';
import theme from '../../theme';
import { LoadingSpinner } from '../../atoms/loadingSpinner';
import { Dropdown } from '../dropdown';
import { usePrevious } from '../../hooks/usePrevious';
import { LoadMore } from './loadMore';
import { Button } from '../../atoms/button';

/**
 * Used aria safe roles and patterns to render a virtualized flex box driven table
 *
 * @param isLoadingMore - are more items loading
 * @param loadMore - function that is called when you want more items
 * @param items - array of items to show in the table
 * @param columnDefinition - pre-defined columns for the table
 * @param canSort - can the table be sorted by columns
 * @param initialSortBy - what is the initial sort column/direction (if any)
 * @param onSort - call back to sort the data when clicking on a column header
 * @param rowActions - an array of actions that can be done per row in the actionMenu
 * @param height - how tall is the body of the data table
 * @param hasMore - are there more results on the server to fetch
 * @param isInitialized - has the initial data fetch been called from teh server. used to allow separate loading for the whole table vs loadingMore
 * @param initialItemCount - used mainly for testing, set an initial count of how many rows to render prior. This is due to virtualization
 * @param overscan - how many items (of teh whole list) are rendered to the dom (the size 'per page') before loadMore is called
 */
export const DataTable = ({
  emptyView,
  isLoadingMore,
  loadMore,
  items,
  columnDefinition,
  canSort,
  initialSortBy,
  onSort,
  rowActions,
  hasMore,
  isInitialized,
  initialItemCount,
  overscan,
  virtuosoProps,
  ...rest
}) => {
  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => columnDefinition, [columnDefinition]);
  const resizeObserverErrorFix = e => {
    if (
      e.message ===
        'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      e.stopImmediatePropagation();
    }
  };

  let initialState = {};
  if (initialSortBy) {
    initialState = { sortBy: [initialSortBy] };
  }
  const tableInstance = useTable(
    {
      columns,
      data,
      disableSortBy: !canSort,
      disableMultiSort: true,
      disableSortRemove: true,
      initialState,
      manualSortBy: true,
    },
    useSortBy,
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;
  const previousSort = usePrevious(state.sortBy);

  useEffect(() => {
    window.addEventListener('error', resizeObserverErrorFix);
    return () => {
      window.removeEventListener('error', resizeObserverErrorFix);
    };
  }, []);
  useEffect(() => {
    if (previousSort && !isEqual(previousSort, state.sortBy)) {
      onSort(state.sortBy);
    }
  }, [onSort, previousSort, state.sortBy]);

  const isItemLoaded = useCallback(
    index => !hasMore || !!items[index],
    [hasMore, items],
  );
  const renderActionMenu = useCallback(
    ({ row, isLast = true }) => {
      if (!isLast || !rowActions || !rowActions.items) {
        return null;
      }
      const yOffset = Math.abs(rowActions.height || 1) * -1;
      const actionMenuWidth = 200;
      return (
        <Box
          tx="dataTable"
          data-testid="row-action"
          display="flex"
          alignItems="flex-start"
          justifyCcontent="center"
          mr={3}
        >
          <Dropdown
            offset={[yOffset, actionMenuWidth]}
            placement="left-end"
            triggerProps={{
              variant: 'tertiary',
              display: 'unset',
              sx: {
                '&[data-is-open=true]': {
                  bg: 'neutral.20',
                },
              },
              children: (
                <Box
                  variant="icon"
                  sx={{ stroke: 'text' }}
                  height="16px"
                  width="16px"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  as={MoreHorizontal}
                />
              ),
            }}
          >
            <Card
              variant="card.default"
              sx={{ position: 'fixed' }}
              py={2}
              px={0}
            >
              <Flex flexDirection="column" width={`${actionMenuWidth}px`}>
                {rowActions.items.map(
                  ({
                    isDisabled = () => false,
                    Item = Button,
                    onClick = () => {},
                    ...props
                  }) => (
                    <Item
                      key={`row_actions${JSON.stringify(props)}`}
                      row={row}
                      width={1}
                      textAlign="left"
                      variant="tertiary"
                      pl={3}
                      {...props}
                      disabled={isDisabled(row)}
                      onClick={e => {
                        e.original = row.original;
                        onClick(e);
                      }}
                    />
                  ),
                )}
              </Flex>
            </Card>
          </Dropdown>
        </Box>
      );
    },
    [rowActions],
  );
  const renderRow = useCallback(
    ({ index }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <Flex
          role="row"
          tx="dataTable"
          variant="tr"
          {...row.getRowProps()}
          width={1}
          data-testid="data-row"
        >
          <Flex width={1} flexDirection="row" flexGrow={1}>
            {isItemLoaded(index) &&
              row.cells.map(cell => (
                <Box
                  key={`item_${row.id}_${JSON.stringify(cell.column)}`}
                  data-testid="td"
                  tx="dataTable"
                  variant="td"
                  role="cell"
                  {...cell.getCellProps()}
                  flexBasis={cell.column.width || 'auto'}
                >
                  {cell.render('Cell')}
                </Box>
              ))}
          </Flex>
          <>{renderActionMenu({ row })}</>
        </Flex>
      );
    },
    [isItemLoaded, prepareRow, renderActionMenu, rows],
  );
  const isEmpty = useMemo(() => items.length === 0, [items]);
  return (
    <ThemeProvider theme={theme}>
      <Flex data-testid="data-table" height="100%" width={1} {...rest}>
        <Box width={1}>
          <Flex
            role="table"
            tx="dataTable"
            variant="table"
            data-testid="table"
            {...getTableProps()}
          >
            <Flex
              role="rowgroup"
              tx="dataTable"
              variant="thead"
              data-testid="thead"
              width={1}
              flexDirection="row"
            >
              {headerGroups.map(headerGroup => (
                <Flex
                  role="row"
                  tx="dataTable"
                  variant="thead.tr"
                  {...headerGroup.getHeaderGroupProps()}
                  data-testid="thead.tr"
                  flexGrow="1"
                >
                  {headerGroup.headers.map(column => (
                    <Flex
                      role="columnheader"
                      tx="dataTable"
                      data-testid="th"
                      data-columnaccessor={column.id}
                      variant="th"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      flexBasis={column.width}
                      sx={column.sx || {}}
                    >
                      <Text>{column.render('Header')}</Text>
                      {canSort && !column.disableSortBy && (
                        <Flex
                          className="sortControls"
                          data-testid="sort-controls"
                        >
                          {!column.isSorted && (
                            <Flex
                              sx={{ position: 'absolute', top: '4px' }}
                              height="100%"
                              width="16px"
                              flexDirection="column"
                              ml={2}
                              color="neutral.300"
                            >
                              <Box
                                mb="-2px"
                                data-testid="sort-ascending"
                                variant="icon"
                                sx={{ stroke: 'currentColor' }}
                                height="14px"
                                width="14px"
                                strokeWidth="1.5"
                                aria-hidden="true"
                                as={ChevronUp}
                              />
                              <Box
                                mt="-2px"
                                data-testid="sort-descending"
                                variant="icon"
                                sx={{ stroke: 'currentColor' }}
                                height="14px"
                                width="14px"
                                strokeWidth="1.5"
                                aria-hidden="true"
                                as={ChevronDown}
                              />
                            </Flex>
                          )}

                          {column.isSorted && !column.isSortedDesc && (
                            <Box
                              data-testid="sort-descending"
                              variant="icon"
                              sx={{ stroke: 'text' }}
                              ml={2}
                              height="16px"
                              width="16px"
                              strokeWidth="1.5"
                              aria-hidden="true"
                              as={ChevronDown}
                            />
                          )}
                          {column.isSorted && column.isSortedDesc && (
                            <Box
                              data-testid="sort-ascending"
                              variant="icon"
                              sx={{ stroke: 'text' }}
                              ml={2}
                              height="16px"
                              width="16px"
                              strokeWidth="1.5"
                              aria-hidden="true"
                              as={ChevronUp}
                            />
                          )}
                        </Flex>
                      )}
                    </Flex>
                  ))}
                </Flex>
              ))}
              {rowActions && rowActions.items.length > 0 && (
                <Flex
                  role="columnheader"
                  tx="dataTable"
                  data-testid="actions-header"
                  mr={3}
                  px={3}
                  sx={{ height: '100%' }}
                >
                  <Box
                    variant="icon"
                    sx={{ visibility: 'hidden', stroke: 'text' }}
                    height="16px"
                    width="16px"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    as={MoreHorizontal}
                  />
                  <Text variant="srOnly">Actions</Text>
                </Flex>
              )}
            </Flex>
            <Flex
              role="rowgroup"
              tx="dataTable"
              variant="tbody"
              {...getTableBodyProps()}
              width={1}
              flexGrow={1}
              data-testid="tbody"
            >
              {isEmpty && isInitialized && <>{emptyView}</>}
              {!isEmpty && isInitialized && (
                <Flex
                  tx="dataTable"
                  variant="content"
                  as={Virtuoso}
                  initialItemCount={initialItemCount}
                  data={items}
                  endReached={() => {
                    if (hasMore) {
                      loadMore();
                    }
                  }}
                  overscan={overscan}
                  itemContent={index => renderRow({ index })}
                  components={{
                    // eslint-disable-next-line react/no-multi-comp
                    Footer: () => (
                      <LoadMore
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                      />
                    ),
                  }}
                  {...virtuosoProps}
                />
              )}
              {!isInitialized && (
                <Flex
                  role="row"
                  width={1}
                  sx={{ minHeight: '2em' }}
                  data-testid="loading-zone"
                >
                  <Box
                    data-testid="table-loader-row"
                    role="cell"
                    textAlign="center"
                    width={1}
                    sx={{ position: 'relative', height: '100%' }}
                  >
                    <LoadingSpinner tx="dataTable" isLoading variant="loader" />
                  </Box>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

DataTable.propTypes = {
  loadMore: PropTypes.func.isRequired,
  items: PropTypes.array,
  initialSortBy: PropTypes.shape({
    id: PropTypes.string,
    desc: PropTypes.bool,
  }),
  canSort: PropTypes.bool,
  columnDefinition: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }),
  ).isRequired,
  onSort: PropTypes.func,
  rowActions: PropTypes.shape({
    height: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
  }),
  hasMore: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool,
  isInitialized: PropTypes.bool.isRequired,
  initialItemCount: PropTypes.number,
  overscan: PropTypes.number,
  emptyView: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  virtuosoProps: PropTypes.object,
};
DataTable.defaultProps = {
  initialItemCount: 0,
  isLoadingMore: false,
  initialSortBy: null,
  canSort: false,
  items: [],
  rowActions: null,
  onSort: () => {},
  overscan: 20,
  virtuosoProps: {},
  emptyView: (
    <Flex width={1} justifyContent="center" mt={2}>
      <Text>No Results Found</Text>
    </Flex>
  ),
};
