import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import Popover from '../../atoms/Popover';
import theme from '../../theme';

export const Tooltip = ({
  position,
  dark,
  children,
  popover,
  triggerProps,
  popoverProps,
}) => (
  <ThemeProvider theme={theme}>
    <Box
      as={Popover}
      dark={dark}
      position={position}
      content={popover}
      trigger={
        <Text
          css={{
            position: 'relative',
            display: 'inline-block',
            textDecoration: 'dashed',
            textDecorationLine: 'underline',
            textUnderlinePosition: 'under',
            textUnderlineOffset: '2px',
          }}
          {...triggerProps}
        >
          {children}
        </Text>
      }
      {...popoverProps}
    />
  </ThemeProvider>
);

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  popover: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  dark: PropTypes.bool,
  position: PropTypes.string,
  triggerProps: PropTypes.object,
  popoverProps: PropTypes.object,
};

Tooltip.defaultProps = {
  position: 'top left',
  dark: true,
  triggerProps: null,
  popoverProps: null,
};
