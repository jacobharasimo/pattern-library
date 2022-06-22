import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';

import FormLabel from '../FormLabel';
import Input from '../Input';
import ListItem from '../ListItem';
import theme from '../../theme';

const InputMultiple = ({
  className,
  form,
  label,
  name,
  onChange,
  placeholder,
  selectedOptionsOrientation,
  type,
  value,
}) => {
  const inputRef = useRef();
  const [inputValue, setValue] = useState('');
  const [elements, setElements] = useState(value);

  const handleInputChange = evt => {
    setValue(evt.target.value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = evt => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();
      const val = inputValue.trim();
      if (val && isValid(val)) {
        setValue('');
        setElements([...elements, val]);
        onChange({ name, value: [...elements, val] });
      }
    }
  };

  const isValid = val => !elements.includes(val);

  const handleDelete = element => {
    const filteredElements = elements.filter(e => e !== element);
    setElements(filteredElements);
    onChange({ name, value: filteredElements });
  };

  const error = form && form.touched[name] && form.errors[name];

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={error}
          ref={inputRef}
        />

        {error && (
          <Box color="danger" mt="0.5rem">
            {form.errors[name]}
          </Box>
        )}
        {!!elements.length && (
          <Box sx={{ margin: '0.9375rem auto' }}>
            {elements.map((e, idx) => (
              <ListItem
                key={idx}
                content={e}
                onRemove={() => handleDelete(e)}
                orientation={selectedOptionsOrientation}
              />
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

InputMultiple.propTypes = {
  className: PropTypes.string,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  selectedOptionsOrientation: PropTypes.oneOf(['horizontal', 'vertical']),
  type: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

InputMultiple.defaultProps = {
  className: '',
  form: null,
  label: null,
  onChange: () => {},
  placeholder: 'Type and press `Enter`',
  selectedOptionsOrientation: 'horizontal',
  type: 'text',
};

export default InputMultiple;
