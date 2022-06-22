import React, { forwardRef } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { Button, Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import theme from '../../theme';
import { LoadingSpinner } from '../loadingSpinner';

export const AsyncButton = forwardRef(
  ({ variant, loadingVariant, size, sx, onClick, loading, children, ...rest }, ref) => {
    const rebassTheme = useTheme();
    const { buttonSizes = {} } = rebassTheme || {};
    let loaderVariant = loadingVariant;
    let sizeStyles = {};

    if (!loaderVariant) {
      loaderVariant = variant;
    }

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
        <Button
          css={{ pointerEvents: loading ? 'none' : 'unset' }}
          data-loading={loading}
          display="flex"
          alignItems="center"
          data-testid="async-button"
          ref={ref}
          onClick={e => {
            if (!loading && onClick && typeof onClick === 'function') {
              onClick(e);
            }
          }}
          variant={variant}
          sx={{ ...sizeStyles, ...sx }}
          {...rest}
        >
          <LoadingSpinner isLoading={loading} variant={loaderVariant} />
          <Box
            display="flex"
            alignItems="center"
            data-testid="children"
            sx={{ visibility: loading ? 'hidden' : 'visible' }}
          >
            {children}
          </Box>
        </Button>
      </ThemeProvider>
    );
  },
);

AsyncButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loadingVariant: PropTypes.string,
};

AsyncButton.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'medium',
  sx: {},
  onClick: () => {},
  loading: false,
  loadingVariant: null,
};
