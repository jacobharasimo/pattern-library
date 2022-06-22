import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import { Button, Box } from 'rebass/styled-components';
import theme from '../../theme';
export const Tag = props => {
  const { variant, canRemove, children } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button
        tx="tag"
        data-testid="tag"
        disabled={!canRemove}
        {...props}
        variant={variant}
      >
        {children}
        {canRemove && (
          <Box
            data-item="close-icon"
            height="1em"
            width="1em"
            strokeWidth="1.5"
            as={X}
            ml={2}
          />
        )}
      </Button>
    </ThemeProvider>
  );
};

Tag.propTypes = {
  canRemove: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  variant: PropTypes.string,
};

Tag.defaultProps = {
  canRemove: false,
  variant: 'tag.default',
};
