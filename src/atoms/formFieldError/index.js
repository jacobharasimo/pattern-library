import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export const FormFieldError = ({ error }) => (
  <ThemeProvider theme={theme}>
    <Text
      width={1}
      role="alert"
      variant="default"
      sx={{ color: 'danger', mt: 2, fontSize: 1, fontStyle: 'italic' }}
    >
      {error.toString()}
    </Text>
  </ThemeProvider>
);

FormFieldError.propTypes = {
  error: PropTypes.string,
};

FormFieldError.defaultProps = {
  error: null,
};
