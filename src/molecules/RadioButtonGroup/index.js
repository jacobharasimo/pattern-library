import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';
import { Field } from 'formik';
import Radio from '../../atoms/Radio';

export const RadioButtonGroup = ({
  name,
  labelFontWeight,
  labelTextColor,
  options,
  label,
  id,
  selected,
  onChange,
}) => (
  <Flex role="radiogroup" aria-labelledby={id} width={[1]} flexWrap={['wrap']}>
    <Text
      color={labelTextColor}
      fontWeight={labelFontWeight}
      variant="default"
      id={id}
      width={[1, 1 / 4]}
      pb={[3]}
      pr={[0, 2]}
    >
      {label}
    </Text>

    <Box width={[1, 3 / 4]} pl={[0, 2]}>
      <Flex width={[1]} flexWrap={['wrap']}>
        {options.map(item => (
          <Box key={item.value} width={[1]} m={0}>
            <Field
              component={Radio}
              name={name}
              value={item.value}
              checked={selected && item.value === selected}
              onChange={onChange}
              label={item.label}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  </Flex>
);

RadioButtonGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.string,
  labelTextColor: PropTypes.string,
  labelFontWeight: PropTypes.string,
  name: PropTypes.string.isRequired,
};

RadioButtonGroup.defaultProps = {
  options: [],
  selected: null,
  labelTextColor: null,
  labelFontWeight: null,
};
