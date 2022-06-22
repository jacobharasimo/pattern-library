import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Card, Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { Popper } from '../popper';
import { ComponentLoader } from '../../atoms/componentLoader';
import { ProfilePicture } from '../profilePicture';

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

const vouchRelationship = (relationshipLevel, vouched) => {
  let result = null;
  if (relationshipLevel > 0 && relationshipLevel <= Object.keys(RELATIONSHIP_LEVEL_OPTIONS).length) {
    result = RELATIONSHIP_LEVEL_OPTIONS[relationshipLevel].replace(
      '[Member Name]',
      vouched && vouched.firstName ? vouched.firstName : 'this person',
    );
  }
  return result;
};

export const VouchPanel = forwardRef(({ title, emptyMessage, vouches, isLoading }, ref) => (
  <ThemeProvider theme={theme}>
    <Card variant="card.default" width={1} flexDirection={['column']} ref={ref}>
      <Flex flexDirection="column">
        <Flex
          data-testid="header"
          pb={3}
          mb={3}
          sx={{ borderBottom: 1, borderBottomColor: 'neutral.100' }}
          alignItems="center"
        >
          <Text mr={2} fontSize={3} color="textDark" fontWeight="medium">
            {title}
          </Text>
          <Popper
            popover={
              <Box>
                <Text>
                  These are the people in your corner who recognize your professional strengths and potential enough to
                  put their name behind you. When you are connected to other members in your network, they will see who
                  vouched for you and how they know you. Queue a fantastic first impression!
                </Text>
              </Box>
            }
          />
        </Flex>
        <Box data-testid="content" pt={3}>
          {isLoading && <ComponentLoader />}
          {!isLoading && (
            <>
              {vouches.length === 0 && (
                <Text color="textSubtle" data-testid="empty-message">
                  {emptyMessage}
                </Text>
              )}
              {vouches.length !== 0 &&
                vouches.map((vouch, index) => {
                  const isFirst = index === 0;
                  const isLast = index + 1 === vouches.length;
                  return (
                    <Flex key={vouch.id} pt={isFirst ? 0 : 2} mb={isLast ? 0 : 3} data-testid="vouch-item" width={1}>
                      <Box width={['56px']} height={['56px']}>
                        <ProfilePicture
                          verifiedSize="24px"
                          verified={vouch.voucher.verified}
                          name={`${vouch.voucher.firstName} ${vouch.voucher.lastName}`}
                          imageUrl={vouch.voucher.avatarUrl}
                        />
                      </Box>
                      <Flex ml={3} flex={1} flexDirection="column">
                        <Text
                          data-testid="name"
                          as="h4"
                          color="textDark"
                          fontWeight="semibold"
                        >{`${vouch.voucher.firstName} ${vouch.voucher.lastName}`}</Text>
                        {vouch.score && (
                          <Text data-testid="vouch-score" color="textDark" my={2}>
                            {SCORE_OPTIONS[vouch.score]}
                          </Text>
                        )}
                        <Text data-testid="relationship-level" color="textDark" fontStyle="italic" my={2}>
                          {vouchRelationship(vouch.relationshipLevel, vouch.vouched)}
                        </Text>
                        <Text data-testid="relationship-text">{vouch.relationshipText}</Text>
                      </Flex>
                    </Flex>
                  );
                })}
            </>
          )}
        </Box>
      </Flex>
    </Card>
  </ThemeProvider>
));

VouchPanel.propTypes = {
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  vouches: PropTypes.array,
  title: PropTypes.string.isRequired,
};

VouchPanel.defaultProps = {
  isLoading: false,
  emptyMessage: 'Nothing to show',
  vouches: [],
};
