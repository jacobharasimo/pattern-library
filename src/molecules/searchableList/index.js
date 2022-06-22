import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';
import { Input } from '@rebass/forms/styled-components';
import { Plus } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import { AsyncButton } from '../../atoms/asyncButton';
import theme from '../../theme';

export const SearchableList = ({
  list,
  loading,
  itemTemplate,
  onSearchChange,
  showCreate,
  showEmptyState,
  emptyState,
  onSearchSubmit,
  onItemChange,
  placeholder,
  error,
  keyword,
  listHeight,
}) => {
  const ItemTemplate = itemTemplate;
  const EmptyState = emptyState;

  return (
    <ThemeProvider theme={theme}>
      <Flex
        as="form"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        onSubmit={ev => {
          ev.preventDefault();
          onSearchSubmit(keyword);
        }}
        sx={{ overflow: 'hidden' }}
      >
        <Box data-testid="searchable-list-form">
          <Input
            placeholder={placeholder}
            value={keyword}
            data-testid="searchable-list-input"
            onChange={e => {
              onSearchChange(e);
            }}
          />
        </Box>
        {showEmptyState ? (
          <EmptyState />
        ) : (
          <Flex flexDirection="column" sx={{ overflowY: 'auto' }}>
            {list.length > 0 && (
              <Box
                data-testid="searchable-list-list"
                pt={2}
                overflow="hidden"
                overflowY="auto"
                sx={{ height: listHeight, position: 'relative' }}
              >
                {list.map(item => (
                  <ItemTemplate key={JSON.stringify(item)} {...item} onChange={onItemChange} />
                ))}
              </Box>
            )}

            {showCreate && (
              <Box data-testid="create-button" variant="header.borderTop" mt={2} width={1}>
                <AsyncButton width={1} pl={0} variant="link" type="submit" loading={loading} sx={{ textAlign: 'left' }}>
                  <Box height="16px" width="auto" as={Plus} strokeWidth="1.5" mr={2} />
                  Create list for &quot;{keyword}&quot;
                  {list.includes(keyword)}
                </AsyncButton>
              </Box>
            )}

            {error && (
              <ThemeProvider theme={theme}>
                <Text data-testid="searchable-list-error" color="danger" mt={3}>
                  {error}
                </Text>
              </ThemeProvider>
            )}
          </Flex>
        )}
      </Flex>
    </ThemeProvider>
  );
};

SearchableList.propTypes = {
  list: PropTypes.array.isRequired,
  itemTemplate: PropTypes.node,
  onItemChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  showCreate: PropTypes.bool,
  showEmptyState: PropTypes.bool,
  emptyState: PropTypes.node,
  error: PropTypes.string,
  listHeight: PropTypes.string,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  keyword: PropTypes.string,
};

SearchableList.defaultProps = {
  keyword: '',
  placeholder: '',
  showCreate: false,
  showEmptyState: false,
  emptyState: null,
  itemTemplate: null,
  error: null,
  onSearchSubmit: () => {},
  onSearchChange: () => {},
  onItemChange: () => {},
  listHeight: null,
  loading: false,
};
