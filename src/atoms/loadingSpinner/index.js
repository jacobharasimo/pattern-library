import React from 'react';
import { Box, Text } from 'rebass/styled-components';
import { css, keyframes, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../theme';

const animationSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animationCss = css`
  animation: ${animationSpin} 1s linear infinite;
`;

export const LoadingSpinner = ({ isLoading, variant, ...props }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Box data-testid="loading-spinner" css={animationCss} tx="buttonLoader" variant={variant} {...props}>
        <Text variant="srOnly">Loading</Text>
      </Box>
    </ThemeProvider>
  );
};

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  isLoading: false,
  variant: 'primary',
};
