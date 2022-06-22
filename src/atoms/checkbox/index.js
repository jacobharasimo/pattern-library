import React from 'react';
import { Text } from 'rebass/styled-components';
import { Label } from '@rebass/forms/styled-components';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import { Checkbox as BaseCheckbox } from './checkbox';
import theme from '../../theme';
import { LoadingSpinner } from '../loadingSpinner';

export const Checkbox = props => {
  const { loadingVariant, checkboxVariant, label, isLoading, disabled, checked } = props;
  if (Object.prototype.hasOwnProperty.call(props, 'toggle')) {
    throw new Error("pointing to legacy checkbox, use 'Toggle' component instead");
  }
  if (Object.prototype.hasOwnProperty.call(props, 'size')) {
    throw new Error('pointing to legacy checkbox, check the component definition in Rombo');
  }
  return (
    <ThemeProvider theme={theme}>
      <Label alignItems="flex-start" py={2} m={0}>
        <LoadingSpinner
          tx="loader"
          variant={loadingVariant}
          fontSize="16px"
          mr={2}
          data-testid="loader"
          isLoading={isLoading}
          sx={{ borderTopColor: 'primary' }}
        />
        {!isLoading && (
          <BaseCheckbox
            checked={checked}
            {...props}
            data-testid="checkbox"
            variant={checkboxVariant}
            disabled={disabled || isLoading}
          />
        )}
        {label && (
          <Text flex={1} sx={{ lineHeight: '1.1' }} color={disabled ? 'textSubtle' : 'inherit'}>
            {label}
          </Text>
        )}
      </Label>
    </ThemeProvider>
  );
};

Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingVariant: PropTypes.string,
  checkboxVariant: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: () => {},
  label: null,
  isLoading: false,
  disabled: false,
  checked: false,
  loadingVariant: 'default',
  checkboxVariant: 'checkbox',
  name: null,
  id: null,
};
