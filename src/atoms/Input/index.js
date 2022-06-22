import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Input as RebassInput } from '@rebass/forms/styled-components';
import { debounce } from 'debounce';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const DEBOUNCE_TIME = 500;
const Input = forwardRef(
  (
    { className, delayed, error, onChange, size, style, value, ...rebassProps },
    ref,
  ) => {
    const innerRef = useRef(ref);
    const [currentValue, setCurrentValue] = useState(value);
    const currentOnChange = delayed
      ? debounce(onChange, DEBOUNCE_TIME)
      : onChange;

    useEffect(() => setCurrentValue(value), [value]);

    const getVariant = () => {
      switch (size) {
        case 'lg':
          return 'inputLarge';
        case 'sm':
          return 'inputSmall';
        default:
          return 'input';
      }
    };

    const handleOnChange = event => {
      setCurrentValue(event.target.value);

      currentOnChange(event.persist() || event);
    };

    return (
      <ThemeProvider theme={theme}>
        <RebassInput
          ref={innerRef}
          className={className}
          error={error}
          onChange={handleOnChange}
          style={style}
          sx={{
            borderColor: error ? 'danger' : 'neutral.300',
          }}
          tx="forms"
          value={currentValue}
          variant={getVariant()}
          {...rebassProps}
        />
      </ThemeProvider>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  delayed: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  className: '',
  delayed: false,
  error: false,
  onChange: () => {},
  placeholder: '',
  size: 'md',
  style: {},
  value: '',
};

export default Input;
