import React, { useState } from 'react';
import { Flex, Card, Text, Box } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import ReduxSelect from '../index';

const testOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default { title: 'Molecules/Redux Select' };

export const Overview = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = () => {
    // dispatch action with the value
    setIsLoading(true);
    setTimeout(() => {
      setOptions(testOptions);
      // eslint-disable-next-line no-console
      console.log('set options');
      setIsLoading(false);
    }, 500);
  };

  const formatOptionLabel = ({ label }) => <Text>{label}</Text>;

  return (
    <Flex flexDirection="column">
      <Text as="h2" mb={3}>
        Select Box
      </Text>

      <Card mb={2} p={3}>
        <Text mb={2}>Loads data from api</Text>
        <Box width={[1 / 2]}>
          <ReduxSelect
            formatOptionLabel={formatOptionLabel}
            onInputChange={onInputChange}
            isLoading={isLoading}
            options={options}
          />
        </Box>
      </Card>

      <Card mb={2} p={3}>
        <Text mb={2}>Default Value and List Options</Text>
        <Box width={[1 / 2]}>
          <ReduxSelect
            formatOptionLabel={formatOptionLabel}
            defaultValue={testOptions[2]}
            isLoading={isLoading}
            options={testOptions}
          />
        </Box>
      </Card>

      <Card mb={2} p={3}>
        <Text mb={2}>Default Value and List Options</Text>
        <Box width={[1 / 2]}>
          <ReduxSelect
            formatOptionLabel={formatOptionLabel}
            defaultValue={testOptions[2]}
            isLoading={isLoading}
            options={testOptions}
            error="you did not select the right thing"
          />
        </Box>
      </Card>
    </Flex>
  );
};
export const Playground = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = () => {
    // dispatch action with the value
    setIsLoading(true);
    setTimeout(() => {
      setOptions(testOptions);
      // eslint-disable-next-line no-console
      console.log('set options');
      setIsLoading(false);
    }, 500);
  };

  const formatOptionLabel = ({ label }) => <Text>{label}</Text>;

  return (
    <Flex flexDirection="column">
      <Text as="h2" mb={3}>
        Select Box
      </Text>
      <Card mb={2} p={3}>
        <Box width={[1 / 2]}>
          <ReduxSelect
            formatOptionLabel={formatOptionLabel}
            onInputChange={onInputChange}
            isLoading={isLoading}
            options={options}
          />
        </Box>
      </Card>
    </Flex>
  );
};
Playground.decorators = [withSmartKnobs()];
