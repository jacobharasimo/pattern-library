/* eslint-disable react/no-multi-comp */
import React, { forwardRef } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { props as systemProps } from '@styled-system/should-forward-prop';
import PropTypes from 'prop-types';
import { colors } from '../../theme';

const rebassProps = [...systemProps, 'sx', 'variant'];

const getProps = test => props => {
  const next = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in props) {
    if (test(key || '')) next[key] = props[key];
  }
  return next;
};
const PRE = new RegExp(`^(${rebassProps.join('|')})$`);
const getSystemProps = getProps(k => PRE.test(k));

// eslint-disable-next-line react/prop-types
const SVG = ({ size = 16, ...props }) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={16}
    viewBox="0 0 16 16"
    fill="currentcolor"
    {...props}
  />
);
// This is setup if design desires we can replace the svg
const CheckboxChecked = props => (
  <SVG {...props}>
    <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" />
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
);
// This is setup if design desires we can replace the svg
const CheckboxUnchecked = props => (
  <SVG {...props}>
    <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" />
  </SVG>
);

// This is setup if design desires we can replace the svg
const CheckboxDisabledChecked = props => (
  <SVG {...props}>
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      rx="2.5"
      stroke={colors.border}
    />
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
);

const CheckboxIcon = ({ checked, disabled, ...props }) => (
  <>
    {!checked && (
      <CheckboxUnchecked data-testid="checkbox-unchecked" {...props} />
    )}
    {checked && !disabled && (
      <CheckboxChecked data-testid="checkbox-checked" {...props} />
    )}
    {checked && disabled && (
      <CheckboxDisabledChecked
        data-testid="checkbox-disabled-checked"
        {...props}
      />
    )}
  </>
);
CheckboxIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export const Checkbox = forwardRef(
  (
    { checked, className, disabled, sx, variant = 'checkbox', ...props },
    ref,
  ) => (
    <Flex>
      <Box
        ref={ref}
        as="input"
        type="checkbox"
        disabled={disabled}
        checked={checked}
        {...props}
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
        as={CheckboxIcon}
        aria-hidden="true"
        tx="forms"
        variant={variant}
        className={className}
        sx={sx}
        {...getSystemProps(props)}
        checked={checked}
        disabled={disabled}
        __css={{
          mr: 2,
          borderRadius: 4,
          color: 'gray',
          'input:checked ~ &': {
            color: 'primary',
          },
          'input:focus ~ &': {
            color: 'primary',
            bg: 'highlight',
          },
        }}
      />
    </Flex>
  ),
);

Checkbox.propTypes = {
  className: PropTypes.string,
  sx: PropTypes.object,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: '',
  sx: {},
  variant: 'checkbox',
  onChange: () => {},
  disabled: false,
  checked: false,
};
