import React from 'react';
import { Textarea } from '@rebass/forms/styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const TextArea = ({ className, error, onChange, placeholder, rows, size, value, ...rebassProps }) => {
  const getVariant = () => {
    switch (size) {
      case 'lg':
        return 'textareaLarge';
      case 'sm':
        return 'textareaSmall';
      default:
        return 'textarea';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Textarea
        className={className}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        size={size}
        sx={{
          fontFamily: theme.fonts.body,
          borderColor: error ? 'danger' : 'neutral.300',
        }}
        tx="forms"
        value={value}
        variant={getVariant()}
        {...rebassProps}
      />
    </ThemeProvider>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.string,
};

TextArea.defaultProps = {
  className: '',
  error: false,
  onChange: () => {},
  placeholder: '',
  rows: 7,
  size: 'md',
  value: '',
};

export default TextArea;
