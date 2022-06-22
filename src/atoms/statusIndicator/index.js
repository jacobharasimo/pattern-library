import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export const StatusIndicator = ({ textColor, statusColor, status }) => (
  <ThemeProvider theme={theme}>
    <Flex alignItems="center" color={textColor} data-testid="status-indicator">
      <Box tx="statusIndicator" variant="status" bg={statusColor} />
      <Text tx="statusIndicator" variant="text" data-testid="text-status">
        {status}
      </Text>
    </Flex>
  </ThemeProvider>
);

StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.string,
  textColor: PropTypes.string,
};

StatusIndicator.defaultProps = {
  statusColor: 'neutral.300',
  textColor: 'text',
};
