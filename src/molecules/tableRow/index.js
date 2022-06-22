import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';

export const TableRow = ({ title, value }) => (
  <Flex flexDirection={['column', 'row']}>
    <Box width={[1, 1 / 4]}>
      <Text variant="default" color="textSubtle">
        {title}
      </Text>
    </Box>
    <Box width={[1, 3 / 4]} pl={[0, 2]}>
      <Text variant="sentenceCase">{value}</Text>
    </Box>
  </Flex>
);

TableRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
