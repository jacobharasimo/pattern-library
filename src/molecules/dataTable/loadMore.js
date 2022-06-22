import React from 'react';
import { Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../../atoms/loadingSpinner';

export const LoadMore = ({ hasMore, isLoadingMore }) => {
  if (!hasMore || !isLoadingMore) {
    return null;
  }
  return (
    <Box
      data-testid="table-load-more"
      role="cell"
      textAlign="center"
      width={1}
      mt={-3}
      sx={{ position: 'relative', height: '1.5em' }}
    >
      <LoadingSpinner tx="dataTable" isLoading variant="loader" />
    </Box>
  );
};
LoadMore.propTypes = {
  hasMore: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
};

LoadMore.defaultProps = {
  hasMore: false,
  isLoadingMore: false,
};
