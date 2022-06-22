import React from 'react'
import { TextEditor } from '@getro/rombo'
import { Box, Flex } from 'rebass/styled-components';

const App = () => {
  const defaultValue = `# Markdown example
  ## Subtitle
  This is a _short_ example of **Markdown**

  [Link here](https://www.getro.com)

  Feel free to edit this as you play with the editor!`;

  return (
    <Flex>
      <Box sx={{ width: '400px', height: '600px', border: 1, borderColor: 'black' }}>
        <TextEditor value={defaultValue} options={['bold', 'list', 'italic', 'h1', 'h2', 'link']} />
      </Box>
    </Flex>
  );
}

export default App
