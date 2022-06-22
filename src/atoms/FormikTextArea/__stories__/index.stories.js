import React, { useRef } from 'react';
import { Flex } from 'rebass/styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormikTextArea from '../index';

export default { title: 'Atoms/Formik Text Area' };

const formSchema = Yup.object().shape({
  customMessage: Yup.string()
    // eslint-disable-next-line
    .min(60, 'Please write at least ${min} characters.')
    .required('Please let us know why you want to be introduced.'),
});
const defaultValues = {
  member: {},
  activeNetwork: {},
  children: {},
  customMessage: '',
};

export const Overview = () => {
  const formRef = useRef(null);
  return (
    <Flex>
      <Formik
        validationSchema={formSchema}
        enableReinitialize
        initialValues={defaultValues}
        onSubmit={() => {}}
        innerRef={formRef}
      >
        <FormikTextArea
          label="Why you want to be introduced*"
          name="customMessage"
          placeholder="Share why this person is stand out and should be excited about the opportunity to join your team. Be specific!"
        />
      </Formik>
    </Flex>
  );
};
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};
