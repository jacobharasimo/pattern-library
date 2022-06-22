/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { VouchPanel } from '../index';
import { userProfile } from '../../../organisms/userProfile.mock';

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
  title: 'Molecules/Vouch Panel',
};
export const Overview = () => (
  <Flex flexDirection="column">
    <Box width={[1]} mb={3}>
      <VouchPanel
        title="Vouches received"
        relationshipLevelOptions={RELATIONSHIP_LEVEL_OPTIONS}
        scoreOptions={SCORE_OPTIONS}
        getUserDisplayName={getUserDisplayName}
        vouches={userProfile.referralsReceived}
      />
    </Box>
    <Box width={[1]}>
      <VouchPanel
        title="Vouches made"
        relationshipLevelOptions={RELATIONSHIP_LEVEL_OPTIONS}
        scoreOptions={SCORE_OPTIONS}
        getUserDisplayName={getUserDisplayName}
        vouches={userProfile.referralsGiven}
      />
    </Box>
  </Flex>
);
Overview.parameters = {
  actions: { disable: true },
  controls: { disable: true },
  knobs: { disable: true },
};

export const Playground = args => (
  <Box width={[1]} mb={3}>
    <VouchPanel
      title="Vouches received"
      relationshipLevelOptions={RELATIONSHIP_LEVEL_OPTIONS}
      scoreOptions={SCORE_OPTIONS}
      getUserDisplayName={getUserDisplayName}
      vouches={userProfile.referralsReceived}
      {...args}
    />
  </Box>
);

Playground.parameters = {
  actions: { disable: true },
  knobs: { disable: true },
};

Playground.args = {
  isLoading: false,
  vouches: userProfile.referralsReceived,
  emptyMessage: 'Nothing to show',
};
