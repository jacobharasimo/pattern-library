import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass/styled-components';
import TextEditor from '../TextEditor';
import { FormFieldError } from '../../atoms/formFieldError';
import FormLabel from '../../atoms/FormLabel';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';

const getComponent = as => {
  switch (as) {
    case 'textEditor':
      return TextEditor;
    case 'textarea':
      return TextArea;
    default:
      return Input;
  }
};

const FormField = ({
  optional,
  optionalText,
  as,
  className,
  field,
  form,
  label,
  onChange,
  size,
  ...rest
}) => {
  const error = !!(form && form.touched[field.name] && form.errors[field.name]);
  const Component = getComponent(as);

  const handleOnChange = value => {
    if (as === 'textEditor') {
      form.setFieldValue(field.name, value);
    }

    if (onChange) {
      onChange(value);
    }
  };

  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <FormLabel htmlFor={field.id || field.name}>
          {label}
          &nbsp;
          {optional && (
            <Text
              as="span"
              sx={{
                color: 'textSubtle',
                fontStyle: 'italic',
                fontWeight: 'normal',
              }}
            >
              {optionalText}
            </Text>
          )}
        </FormLabel>
      );
    }

    return <>{label}</>;
  };

  return (
    <Box sx={{ ':not(:last-child)': { mb: 3 } }}>
      {label && renderLabel()}
      <Component
        error={error}
        id={field.id || field.name}
        size={size}
        onChange={handleOnChange}
        {...field}
        {...rest}
      />
      {error && <FormFieldError error={form.errors[field.name]} />}
    </Box>
  );
};

FormField.propTypes = {
  as: PropTypes.oneOf(['textarea', 'input', 'textEditor']),
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  optional: PropTypes.bool,
  optionalText: PropTypes.string,
};

FormField.defaultProps = {
  as: 'input',
  className: '',
  field: {},
  form: null,
  label: '',
  onChange: null,
  size: 'md',
  optional: false,
  optionalText: '(optional)',
};

export default FormField;
