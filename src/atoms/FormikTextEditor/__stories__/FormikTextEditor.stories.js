import React from 'react';
import { Formik, Form } from 'formik';
import FormikTextEditor from '../index';

export default { title: 'Atoms/Formik text editor' };

export const Overview = () => (
  <Formik initialValues={{ meaningOfLife: 'Initial value' }} onSubmit={async (values) => console.log(values)}>
    <Form>
      <FormikTextEditor name="meaningOfLife" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);
