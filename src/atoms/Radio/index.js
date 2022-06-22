import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Box } from 'rebass/styled-components';
import theme from '../../theme';

const Radio = ({
  checked,
  className,
  disabled,
  label,
  onChange,
  size,
  ...rest
}) => {
  const borderColor = useMemo(() => {
    if (checked) return 'primary';
    if (disabled) return 'neutral.100';

    return 'neutral.300';
  }, [checked, disabled]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        as="label"
        fs={size === 'lg' ? 3 : 2}
        py={2}
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          position: 'relative',
          cursor: disabled ? 'default' : 'pointer',
          color: disabled ? 'textSubtle' : 'text',
          userSelect: 'none',
          lineHeight: size === 'lg' ? '8px' : '16px',
          input: {
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: 0,
            width: 0,
          },
        }}
        className={className}
      >
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        <Box
          as="span"
          mr={2}
          sx={{
            position: 'relative',
            height: size === 'lg' ? '24px' : '16px',
            width: size === 'lg' ? '24px' : '16px',
            flexBasis: size === 'lg' ? '24px' : '16px',
            flexGrow: 0,
            flexShrink: 0,
            borderRadius: '50%',
            border: '0.0625rem solid',
            borderColor,
            backgroundColor: disabled ? 'neutral.20' : 'transparent',
            transition: 'all ease 0.3s 0.15s',
            '&::after': {
              content: '""',
              position: 'absolute',
              display: 'block',
              opacity: checked ? 1 : 0,
              top: '50%',
              left: '50%',
              width:
                size === 'lg' ? 'calc(24px - 0.6rem)' : 'calc(16px - 0.5rem)',
              height:
                size === 'lg' ? 'calc(24px - 0.6rem)' : 'calc(16px - 0.5rem)',
              borderRadius: '50%',
              backgroundColor: disabled ? 'neutral.100' : 'primary',
              transform: checked
                ? 'scale(1) translate(-50%, -50%)'
                : 'scale(0) translate(-50%, -50%)',
              transformOrigin: '0 0',
              transition: 'all ease 0.3s',
            },
          }}
          checked={checked}
          disabled={disabled}
          size={size}
        />
        {label}
      </Box>
    </ThemeProvider>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['md', 'lg']),
};

Radio.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  label: '',
  onChange: () => {},
  size: 'md',
};

export default Radio;
