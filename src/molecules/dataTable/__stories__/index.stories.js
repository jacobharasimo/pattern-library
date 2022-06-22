import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Text, Box } from 'rebass/styled-components';
import serverSort from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import { Share } from 'react-feather';
import { DataTable } from '../index';
import { Button } from '../../../atoms/button';
export default { title: 'Molecules/Data Table' };

let resultCount = 0;
const totalResults = 1000;

const fakeDataFetch = async ({ length = 20, delay = 500 }) => {
  const results = [];

  for (let i = resultCount; i < resultCount + length; i += 1) {
    results.push({ col1: `random name ${i}`, col2: <Text>random description {1000 - i}</Text>, col3: `no sort ${i}` });
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resultCount += results.length;
      resolve(results);
    }, delay),
  );
};

// eslint-disable-next-line consistent-return
const mockServerSort = async (items, column, delay = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (items && items.length && column) {
        let sortedItems = [];
        if (column.desc) {
          sortedItems = serverSort(items, [column.id]).reverse();
        } else {
          sortedItems = serverSort(items, [column.id]);
        }
        resolve(sortedItems);
      } else {
        reject();
      }
    }, delay),
  );

export const Overview = () => {
  const [items, setItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastSort, setLastSort] = useState();
  const columnDefinition = [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
      width: `${(1 / 3) * 100}%`,
      sx: {},
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
      width: `${(1 / 3) * 100}%`,
    },
    {
      Header: 'Column 3',
      accessor: 'col3',
      width: `${(1 / 3) * 100}%`,
      disableSortBy: true,
    },
  ];

  useEffect(() => {
    setIsInitialized(false);
    fakeDataFetch({ delay: 0, length: 40 }).then(results => {
      setItems(results);
      setIsInitialized(true);
    });
  }, []);

  const onSort = useCallback(
    c => {
      const column = c[0];
      if (!isEqual(column, lastSort)) {
        setLastSort(column);
        setIsInitialized(false);
        mockServerSort(items, column).then(result => {
          setItems(result);
          setIsInitialized(true);
        });
      }
    },
    [items, lastSort],
  );

  return (
    <Flex flexDirection="column" bg="neutral.20">
      <Text px={4}>Check the code in the docs for info on how to use the table</Text>
      <Box py={4} px={4} width={['736px', 1]} sx={{ height: '1000px' }}>
        <DataTable
          hasMore={items.length < totalResults}
          rowActions={{
            height: 145,
            items: [
              {
                isDisabled: row => !!(parseInt(row.id, 10) % 2),
                Item: Button,
                width: 1,
                textAlign: 'left',
                variant: 'tertiary',
                children: (
                  <>
                    <Box mr={1} height="12p16pxx" width="16px" strokeWidth="1.5" aria-hidden="true" as={Share} />
                    Share
                  </>
                ),
                onClick: e => {
                  // eslint-disable-next-line no-console
                  console.log(e.value);
                },
              },
              {
                children: 'test 2',
                onClick: e => {
                  // eslint-disable-next-line no-console
                  console.log(e.value);
                },
              },
              {
                Item: Box,
                px: 3,
                children: <Box as="hr" variant="hr" />,
              },
              {
                children: 'test 3',
                onClick: e => {
                  // eslint-disable-next-line no-console
                  console.log(e.value);
                },
              },
            ],
          }}
          canSort
          initialSortBy={{ id: 'col1', desc: false }}
          isInitialized={isInitialized}
          isLoadingMore={isLoadingMore}
          loadMore={() => {
            setIsLoadingMore(true);
            fakeDataFetch({ length: 20, delay: 400 }).then(results => {
              setItems([...items, ...results]);
              setIsLoadingMore(false);
            });
          }}
          items={items}
          columnDefinition={columnDefinition}
          onSort={onSort}
        />
      </Box>
    </Flex>
  );
};
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};
