import React, { useState } from 'react';
import { Flex, Button } from 'rebass/styled-components';
import { Modal } from '../index';

export default {
  title: 'Molecules/Modal',
  argTypes: {
    variant: {
      control: { type: 'select', options: ['default', 'large'] },
    },
  },
};

export const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        title="Sample modal"
        variant="large"
        actions={
          <Flex justifyContent={['flex-end']}>
            <Button mr={[2]} onClick={() => {}} variant="text">
              Cancel and close
            </Button>
            <Button ml={[2]} onClick={() => {}}>
              Confirm and close
            </Button>
          </Flex>
        }
      >
        This is the body of the modal
      </Modal>
    </Flex>
  );
};
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
};

export const Playground = args => (
  <Flex>
    <Button onClick={() => {}}>Open Modal</Button>
    <Modal
      onCancel={() => {}}
      actions={
        <Flex justifyContent={['flex-end']}>
          <Button mr={[2]} onClick={() => {}} variant="text">
            Cancel and close
          </Button>
          <Button ml={[2]} onClick={() => {}}>
            Confirm and close
          </Button>
        </Flex>
      }
      {...args}
    >
      This is the body of the modal
    </Modal>
  </Flex>
);

Playground.args = {
  variant: 'default',
  isOpen: false,
  title: 'Sample title',
};
