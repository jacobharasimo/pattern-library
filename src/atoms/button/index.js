import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme } from 'styled-components';
import { Button as BaseButton } from 'rebass/styled-components';
import theme from '../../theme';

export const Button = ({ type, size, sx, ...props }) => {
  const rebassTheme = useTheme();
  const { buttonSizes = {} } = rebassTheme || {};
  let sizeStyles = {};
  switch (size) {
    case 'small':
      sizeStyles = buttonSizes.small;
      break;
    case 'large':
      sizeStyles = buttonSizes.large;
      break;
    default:
      sizeStyles = buttonSizes.medium;
  }
  return (
    <ThemeProvider theme={theme}>
      <BaseButton sx={{ ...sizeStyles, ...sx }} type={type} data-testid="base-button" {...props} />
    </ThemeProvider>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
};
Button.defaultProps = {
  type: 'button',
  size: 'medium',
  sx: {},
};
