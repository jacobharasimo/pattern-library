import React from 'react';
import { Form, Formik } from 'formik';
import { Card } from 'rebass/styled-components';
import { RadioButtonGroup } from '../index';

export default { title: 'Molecules/Radio Button Group' };

export const Overview = () => (
  <Card>
    <Formik enableReinitialize initialValues={{ jobSearchStatus: [] }} onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <Form>
          <RadioButtonGroup
            options={[
              { label: 'Not Looking', value: 'not_looking' },
              { label: 'Casually browsing', value: 'casually_browsing' },
              { label: 'Actively looking', value: 'actively_looking' },
            ]}
            label="Job search stage"
            id="jobSearchStatus-legend"
            name="jobSearchStatus"
            selected={values.jobSearchStatus}
            onChange={e => {
              setFieldValue('jobSearchStatus', e.target.value);
            }}
          />
        </Form>
      )}
    </Formik>
  </Card>
);
