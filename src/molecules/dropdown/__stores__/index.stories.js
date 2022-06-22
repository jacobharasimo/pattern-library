/* eslint-disable react/no-multi-comp */
import React, { useRef } from 'react';
import { Flex, Card, Box } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { number } from '@storybook/addon-knobs';
import { Dropdown } from '../index';
import { Button } from '../../../atoms/button';

export default { title: 'Molecules/Dropdown' };

export const Overview = () => {
  const dropdownRef = useRef();
  return (
    <Flex flexDirection="column">
      <Card p={3} height="400px" width={1}>
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Dropdown
            placement="bottom"
            onClose={() => {
              // eslint-disable-next-line no-console
              console.log('close');
            }}
            onOpen={() => {
              // eslint-disable-next-line no-console
              console.log('open');
            }}
            ref={dropdownRef}
            triggerProps={{ variant: 'primary', children: 'Click to Open' }}
          >
            <Card>
              <Flex as="ul" flexDirection="column" width="200px;">
                <Box as="li">
                  <Button
                    onClick={() => {
                      dropdownRef.current.closeDropdown();
                    }}
                  >
                    test
                  </Button>
                </Box>
                <Box as="li">b</Box>
                <Box as="li">
                  <a href="/">c</a>
                </Box>
              </Flex>
            </Card>
          </Dropdown>
        </Flex>
      </Card>
    </Flex>
  );
};
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = () => {
  const dropdownRef = useRef();
  return (
    <Flex flexDirection="column">
      <Card p={3} height="400px" width={1}>
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Dropdown
            delayHide={number('delayHide', 30000)}
            placement="bottom"
            onClose={() => {
              // eslint-disable-next-line no-console
              console.log('close');
            }}
            onOpen={() => {
              // eslint-disable-next-line no-console
              console.log('open');
            }}
            ref={dropdownRef}
            triggerProps={{ variant: 'primary', children: 'Click to Open' }}
          >
            <Card>
              <Flex as="ul" flexDirection="column" width="200px;">
                <Box as="li">
                  <Button
                    onClick={() => {
                      dropdownRef.current.closeDropdown();
                    }}
                  >
                    test
                  </Button>
                </Box>
                <Box as="li">b</Box>
                <Box as="li">
                  <a href="/">c</a>
                </Box>
              </Flex>
            </Card>
          </Dropdown>
        </Flex>
      </Card>
    </Flex>
  );
};
Playground.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};
Playground.decorators = [
  withSmartKnobs({
    ignoreProps: ['content', 'type', 'size', 'sx', 'triggerProps', 'dropDownProps'],
  }),
];
