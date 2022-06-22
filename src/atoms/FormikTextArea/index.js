import React, { useMemo } from 'react';
import { useField } from 'formik';
import { Box, Text } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import FormLabel from '../FormLabel';
import TextArea from '../TextArea';
import { FormFieldError } from '../formFieldError';

const FormikTextArea = ({ label, optionalText, ...props }) => {
  const [field, meta] = useField(props);
  const { name, id } = field;
  const renderedLabel = useMemo(() => {
    if (typeof label === 'string') {
      return (
        <FormLabel htmlFor={id || name}>
          {label}
          &nbsp;
          {optionalText && (
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
  }, [label, id, name, optionalText]);

  return (
    <Box sx={{ ':not(:last-child)': { mb: 3 } }}>
      {renderedLabel}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TextArea {...field} {...props} name={name} id={id} />
      {meta.touched && meta.error ? (
        <FormFieldError error={meta.error} />
      ) : null}
    </Box>
  );
};

FormikTextArea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  id: PropTypes.string,
  name: PropTypes.string,
  optionalText: PropTypes.string,
};

FormikTextArea.defaultProps = {
  label: '',
  id: null,
  name: null,
  optionalText: null,
};

export default FormikTextArea;
