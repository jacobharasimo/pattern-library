import React from 'react';
import { useField } from 'formik';
import TextEditor from '../../molecules/TextEditor';
import { FormFieldError } from '../formFieldError';

const FormikTextEditor = props => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <>
      <TextEditor {...field} {...props} onChange={value => setValue(value)} />
      {meta.touched && meta.error ? (
        <FormFieldError error={meta.error} />
      ) : null}
    </>
  );
};

export default FormikTextEditor;
