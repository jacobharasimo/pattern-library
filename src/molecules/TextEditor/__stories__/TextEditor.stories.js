import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import TextEditor from '../index';

export default { title: 'Molecules/Text Editor' };

export const Overview = () => {
  const defaultValue = `# Markdown example
  ## Subtitle
  This is a _short_ example of **Markdown**

  [Link here](https://www.getro.com)

  Feel free to edit this as you play with the editor!`;
  return (
    <Flex>
      <Box sx={{ width: '400px', height: '600px' }}>
        <TextEditor value={defaultValue} options={['bold', 'list', 'italic', 'h1', 'h2', 'link']} />
      </Box>
    </Flex>
  );
};

export const Playground = () => <TextEditor />;
Playground.decorators = [withSmartKnobs()];
