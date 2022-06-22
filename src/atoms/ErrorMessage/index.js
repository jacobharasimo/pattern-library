import React from 'react';
import { Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const ErrorMessage = ({ children, ...rebassProps }) => (
  <ThemeProvider theme={theme}>
    <Box
      mt={2}
      fontWeight="body"
      fs={1}
      color="danger"
      sx={{
        fontStyle: 'italic',
        '&:first-letter': {
          textTransform: 'capitalize',
        },
      }}
      {...rebassProps}
    >
      {children}
    </Box>
  </ThemeProvider>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorMessage;
