/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { Vouch } from '../index';

const SCORE_OPTIONS = {
  1: 'Low info personally and professionally',
  2: 'High confidence personally; low info professionally',
  3: 'Low info personally; high confidence professionally',
  4: 'High confidence personally and professionally',
  5: 'High confidence personally and professionally, plus, I would bet my career on them',
};

const RELATIONSHIP_LEVEL_OPTIONS = {
  1: 'I’ve worked with [Member Name]',
  2: 'I’ve interviewed [Member Name]',
  3: 'I’ve been mentored by [Member Name]',
  4: 'I’ve mentored [Member Name]',
  5: 'I don’t know [Member Name] personally',
};

const vouch = {
  createdAt: '2018-10-29T14:57:56.210-04:00',
  id: 387,
  relationshipText:
    "He's been a fantastic resources to me and the team at USV. I'd recommend him to another company for sure!",
  relationshipLevel: 3,
  score: 5,
  status: 'sent',
  voucher: {
    avatarUrl: 'https://cdn.filestackcontent.com/oKET77WEQCuRlKnyBWc5',
    bio: 'Software Engineer en Monday, Inc.',
    email: 'carlos@monday.vc',
    firstName: 'Carlos',
    id: 6413,
    lastName: 'Muñoz',
    linkedinUrl: 'https://linkedin.com/in/cmunozgar',
  },
  vouched: {
    avatarUrl: 'https://cdn.filepicker.io/api/file/J3xt1hPrT5KZeCuXWUDa',
    bio: 'CEO at Monday.vc // Passionate about helping people find meaningful work.',
    email: 'evan@monday.vc',
    firstName: 'Evan',
    id: 6174,
    lastName: 'Walden',
    linkedinUrl: '',
  },
};

function getUserDisplayName(user, fallbackToEmail = true) {
  if (user.firstName) {
    return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`;
  }

  if (fallbackToEmail && user.email) {
    return user.email;
  }

  return '';
}

export default {
  title: 'Molecules/Vouch (deprecated)',
};
export const Overview = () => (
  <Flex flexDirection="column">
    <Box width={[1]} mb={3}>
      <Vouch
        relationshipLevelOptions={RELATIONSHIP_LEVEL_OPTIONS}
        scoreOptions={SCORE_OPTIONS}
        getUserDisplayName={getUserDisplayName}
        show="voucher"
        size="md"
        collapsed
        userId={-1}
        vouch={vouch}
      />
    </Box>

    <Box width={[1]} mb={3}>
      <Vouch
        relationshipLevelOptions={RELATIONSHIP_LEVEL_OPTIONS}
        scoreOptions={SCORE_OPTIONS}
        getUserDisplayName={getUserDisplayName}
        show="voucher"
        size="md"
        userId={-1}
        collapsed={false}
        vouch={vouch}
      />
    </Box>
  </Flex>
);
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
  knobs: { disable: true },
};
