import React, { useState } from 'react';
import { Flex, Card, Text } from 'rebass/styled-components';

import { SearchableList } from '../index';

export default { title: 'Molecules/Searchable List' };

export const Overview = () => {
  const INT_LIST = [
    { id: 1, label: 'test' },
    { id: 2, label: 'fuzz' },
    { id: 3, label: 'buzz' },
    { id: 4, label: 'foo' },
    { id: 5, label: 'bar' },
  ];
  // eslint-disable-next-line react/prop-types
  const [list, setList] = useState(INT_LIST);
  const [keyword, setKeyword] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);

  // eslint-disable-next-line react/prop-types
  const ItemTemplate = ({ label }) => <Card>{label}</Card>;
  const EmptyState = () => <p>No list items</p>;

  const onSearchChange = e => {
    setKeyword(e.target.value);
    setList(INT_LIST.filter(i => i.label.includes(e.target.value)));
    setShowCreate(INT_LIST.filter(i => i.label === e.target.value).length === 0 && e.target.value !== '');
  };
  const onSearchSubmit = term => {
    // eslint-disable-next-line no-console
    setCreateIsLoading(true);
    setTimeout(() => {
      if (list.filter(i => i.label === term).length === 0) setList([...list, { label: term, id: null }]);
      setCreateIsLoading(false);
      setKeyword('');
    }, 1000);
  };
  return (
    <Flex flexDirection="column">
      <Card mb={2} p={3}>
        <Text as="h4" mb={3}>
          List with create ability
        </Text>
        <SearchableList
          keyword={keyword}
          onSearchChange={onSearchChange}
          list={list}
          itemTemplate={ItemTemplate}
          showCreate={showCreate}
          loading={createIsLoading}
          onSearchSubmit={onSearchSubmit}
          listHeight="120px"
          createListColor="red"
        />
      </Card>
      <Card mb={2} p={3}>
        <Text as="h4" mb={3}>
          List is empty example
        </Text>
        <SearchableList list={[]} itemTemplate={ItemTemplate} showEmptyState emptyState={EmptyState} />
      </Card>
      <Card mb={2} p={3}>
        <Text as="h4" mb={3}>
          creation error example
        </Text>
        <SearchableList
          list={[
            { label: 'test 1', id: 1 },
            { label: 'test 2', id: 2 },
          ]}
          itemTemplate={ItemTemplate}
          error="List `sample list` already exists"
        />
      </Card>
    </Flex>
  );
};
