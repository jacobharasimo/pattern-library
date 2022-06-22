import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Flex, Image, Box, Text } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import { Check } from 'react-feather';
import theme from '../../theme';
import { Popper } from '../popper';

export const ProfilePicture = forwardRef(({ verifiedSize, imageUrl, name, variant, verified, ...rebassProps }, ref) => {
  const getInitials = string =>
    string
      .split(/\s/)
      .map(part => part.substring(0, 1).toUpperCase())
      .filter(v => !!v)
      .slice(0, 2)
      .join('');

  return (
    <ThemeProvider theme={theme}>
      <Flex tx="profilePicture" variant={`${variant}.wrapper`} data-testid="profile-picture" ref={ref} {...rebassProps}>
        {!imageUrl && (
          <Image
            tx="profilePicture"
            data-testid="text"
            variant={`${variant}.text`}
            as="svg"
            fill="currentColor"
            viewBox="-50 -50 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <text fontSize="45.5" dy=".34em" textAnchor="middle">
              {getInitials(name)}
            </text>
          </Image>
        )}
        {imageUrl && (
          <Image tx="profilePicture" data-testid="image" variant={`${variant}.image`} src={imageUrl} alt={name} />
        )}
        {verified && (
          <Popper
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
            containerProps={{ width: '250px' }}
            popover={
              <Box>
                <Text pb={2}>Verified Member</Text>
                <Text mt={3}>
                  Trusted people in the network have vouched for their professional credibility giving them the ability
                  to request intros.
                </Text>
              </Box>
            }
          >
            <Flex
              tx="profilePicture"
              data-testid="verified"
              variant={`${variant}.verified`}
              height={verifiedSize}
              width={verifiedSize}
            >
              <Box strokeWidth="1.5" as={Check} height="75%" width="75%" />
            </Flex>
          </Popper>
        )}
      </Flex>
    </ThemeProvider>
  );
});

ProfilePicture.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  variant: PropTypes.string,
  verified: PropTypes.bool,
  verifiedSize: PropTypes.string,
};
ProfilePicture.defaultProps = {
  name: '',
  imageUrl: null,
  variant: 'default',
  verified: false,
  verifiedSize: '32px',
};
