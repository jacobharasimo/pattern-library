import React, { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';

export const VirtualizedList = ({ items, variant, ...rest }) => {
  const resizeObserverErrorFix = e => {
    if (
      e.message ===
        'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      e.stopImmediatePropagation();
    }
  };

  useEffect(() => {
    window.addEventListener('error', resizeObserverErrorFix);
    return () => {
      window.removeEventListener('error', resizeObserverErrorFix);
    };
  }, []);

  return (
    <Flex
      tx="virtualizedList"
      variant={`${variant}.wrapper`}
      height="100%"
      width="100%"
      as={Virtuoso}
      data={items}
      role="list"
      data-testid="virtualized-list"
      itemContent={(index, listItem) => (
        <Box
          role="listitem"
          tx="virtualizedList"
          variant={`${variant}.listItem`}
          {...listItem}
        />
      )}
      {...rest}
    />
  );
};
VirtualizedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
        .isRequired,
      sx: PropTypes.object,
    }),
  ),
  variant: PropTypes.string,
};

VirtualizedList.defaultProps = {
  items: [],
  variant: 'default',
};
