import React from 'react';
import { Label } from '@rebass/forms/styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const FormLabel = ({ children, className, htmlFor, ...rebassProps }) => (
  <ThemeProvider theme={theme}>
    <Label className={className} htmlFor={htmlFor} {...rebassProps}>
      {children}
    </Label>
  </ThemeProvider>
);

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

FormLabel.defaultProps = {
  className: null,
  htmlFor: null,
};

export default FormLabel;
