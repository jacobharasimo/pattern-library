import React, { useRef, useState } from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { boolean } from '@storybook/addon-knobs';
import { EditPanel } from '../index';

export default { title: 'Molecules/Edit Panel' };

export const Overview = () => {
  const panelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Flex flexDirection="column">
      <Box mb={3}>
        <EditPanel
          canEdit={boolean('canEdit', true)}
          ref={panelRef}
          closeEditAfterSave={boolean('closeEditAfterSave', true)}
          title="Box can have a footer"
          saveButton={{
            loading: isLoading,
            onClick: () => {
              setIsLoading(true);
              // use a time out to simulate an net request
              setTimeout(() => {
                // you can manually change edit mode by using a ref like this
                // panelRef.current.setIsEditing(false);
                setIsLoading(false);
              }, 1000);
            },
            children: 'Post',
          }}
          cancelButton={{
            onClick: () => {},
            children: 'Cancel',
          }}
        >
          {({ isEditing }) => (
            <>
              <Text mb={2}>this is the content zone</Text>
              {isEditing && <Text>In edit mode</Text>}
              {!isEditing && <Text>In read mode</Text>}
            </>
          )}
        </EditPanel>
      </Box>
    </Flex>
  );
};
Overview.decorators = [withSmartKnobs({ ignoreProps: ['isLoading'] })];
