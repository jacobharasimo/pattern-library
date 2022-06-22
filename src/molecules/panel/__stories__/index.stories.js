import React from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import { ChevronLeft, Airplay } from 'react-feather';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { boolean, text } from '@storybook/addon-knobs';
import { Panel } from '../index';

export default { title: 'Molecules/Panel' };

export const Overview = () => (
  <Flex flexDirection="column">
    <Box mb={3}>
      <Panel title="A sample panel">Content goes here.</Panel>
    </Box>
    <Box mb={3}>
      <Panel title="panel ready to edit content" headerButton={{ children: 'ACTION', onClick: () => {} }}>
        Content goes here.
      </Panel>
    </Box>
    <Box mb={3}>
      <Panel>Content goes here.</Panel>
    </Box>
    <Box mb={3}>
      <Panel
        title="A panel with help icon"
        popover={{ header: 'Help title', content: 'Help content goes here<br/><br/>Accepting html content' }}
      >
        Content goes here.
      </Panel>
    </Box>
    <Box mb={3}>
      <Panel
        title="panel can have a footer"
        footer={
          <Button color="text" type="button" variant="underlineLink" px={0} alignItems="center" display="flex">
            <Box height="16px" width="auto" as={ChevronLeft} strokeWidth="1.5" mr={2} />
            Back
          </Button>
        }
      >
        Content goes here.
      </Panel>
    </Box>
  </Flex>
);

export const HeaderAction = () => (
  <Flex flexDirection="column">
    <Box mb={3}>
      <Panel
        errorMessage={text('errorMessage', '')}
        isEditing={boolean('isEditing', false)}
        title="panel ready to edit content"
        headerButton={{ children: 'ACTION', onClick: () => {} }}
      >
        Content goes here.
      </Panel>
    </Box>
    <Box mb={3}>
      <Panel
        errorMessage={text('errorMessage', '')}
        isEditing={boolean('isEditing', false)}
        title="panel with icon action"
        headerButton={{
          children: (
            <>
              <Box height="16px" as={Airplay} strokeWidth="1.5" mr={2} />
              Custom
            </>
          ),
          onClick: () => {},
        }}
      >
        Content goes here.
      </Panel>
    </Box>
  </Flex>
);
HeaderAction.decorators = [withSmartKnobs()];

export const Popover = () => (
  <Flex flexDirection="column">
    <Box mb={3}>
      <Panel
        title="A panel with help icon"
        popover={{ header: 'Help title', content: 'Help content goes here<br/><br/>Accepting html content' }}
      >
        Content goes here.
      </Panel>
    </Box>
    <Box mb={3}>
      <Panel
        popover={{ header: 'Help title', content: 'Help content goes here<br/><br/>Accepting html content' }}
        headerButton={{ children: 'ACTION', onClick: () => {} }}
      >
        Content goes here.
      </Panel>
    </Box>
    <Box mb={3}>
      <Panel
        title="Nullam at ligula dignissim, hendrerit est nec, iaculis ligula. Nulla nec elementum orci. Donec eget posuere ligula. Fusce ac lacinia ex, non semper lorem. Phasellus in tincidunt risus. "
        popover={{ header: 'Help title', content: 'Help content goes here<br/><br/>Accepting html content' }}
        headerButton={{ children: 'ACTION', onClick: () => {} }}
      >
        Content goes here.
      </Panel>
    </Box>
  </Flex>
);
