import React, { forwardRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Box } from 'rebass/styled-components';
import { Label } from '@rebass/forms';
import PropTypes from 'prop-types';
import theme from '../../theme';

export const Toggle = forwardRef((props, ref) => {
  const { labelProps, disabled, onChange, size, checked, className, label, sx, variant, ...rest } = props;
  const labelSx = { width: 'max-content', cursor: 'pointer', ...(labelProps.sx || {}) };
  let labelFlexDirection = 'row';
  if (variant === 'reverse') {
    labelFlexDirection = 'row-reverse';
  }
  return (
    <ThemeProvider theme={theme}>
      <Label sx={labelSx} alignItems="center" data-testid="toggle" flexDirection={labelFlexDirection} {...labelProps}>
        <Box
          data-testid="hidden-input"
          ref={ref}
          as="input"
          type="checkbox"
          tx="forms"
          aria-label={label}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
          sx={{
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        />
        <Box
          data-testid="toggle-slide"
          css={{
            padding: 2,
          }}
          tx="toggle"
          variant={variant}
          className={className}
          sx={sx}
          __css={{
            bg: 'neutral.300',
            position: 'relative',
            flexShrink: 0,
            borderRadius: size,
            height: size + 2 * 2,
            width: size * 2 + 2 * 2,
            mr: 2,
            'input:disabled ~ &': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
            '& > div': {
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              height: size,
              width: size,
              bg: 'white',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              transform: 'translateX(0%)',
              transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`,
            },
            'input:checked ~ &': {
              bg: 'primary',
              '> div': {
                transform: 'translateX(100%)',
              },
            },
          }}
        >
          <Box />
        </Box>
        <span>{label}</span>
      </Label>
    </ThemeProvider>
  );
});

Toggle.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  sx: PropTypes.object,
  size: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  labelProps: PropTypes.object,
};

Toggle.defaultProps = {
  checked: false,
  variant: 'default',
  className: '',
  sx: {},
  size: 16,
  onChange: () => {},
  disabled: false,
  labelProps: {},
};
