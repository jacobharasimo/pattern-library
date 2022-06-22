import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { ProfilePicture } from '../index';

export default {
  title: 'Molecules/Profile Picture',
  parameters: {
    knobs: {
      disable: true,
    },
  },
};

export const Overview = () => (
  <Flex flexDirection="column">
    <Box width="120px">
      <ProfilePicture
        verified
        name="Alexandre Mouriec"
        imageUrl="https://cdn.filepicker.io/api/file/kbvHK1paSqHLkLJLSHOV"
      />
    </Box>
    <Box width="200px">
      <ProfilePicture name="Alexandre Mouriec" />
    </Box>
    <Box width="200px">
      <ProfilePicture
        name="Polychain Capital"
        imageUrl="https://cdn.filestackcontent.com/rcHZwEsuSX68fIcR0M6Q"
        variant="square"
      />
    </Box>
    <Box width="70px" height="70px">
      <ProfilePicture
        name="Polychain Capital"
        imageUrl="https://cdn.filestackcontent.com/output=f:webp,t:true,q:80,c:true/cache=expiry:max/resize=w:340/YqDpw0D4TNC6Tg7nvPxd"
        variant="square"
      />
    </Box>
    <Box width="200px">
      <ProfilePicture imageUrl={null} name="novahq.com" variant="square" />
    </Box>
  </Flex>
);
Overview.parameters = {
  knobs: { disable: true },
  actions: { disable: true },
  controls: { disable: true },
};

// eslint-disable-next-line react/prop-types
export const Playground = ({ width, ...rest }) => (
  <Box width={width}>
    <ProfilePicture {...rest} />
  </Box>
);
Playground.parameters = {
  actions: { disable: true },
  knobs: { disable: true },
};

Playground.args = {
  width: '120px',
  name: 'Alexandre Mouriec',
  imageUrl: 'https://cdn.filepicker.io/api/file/kbvHK1paSqHLkLJLSHOV',
  verified: false,
  verifiedSize: '32px',
};
