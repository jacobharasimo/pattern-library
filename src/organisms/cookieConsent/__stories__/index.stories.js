import React, { useState } from 'react';
import { Flex, Text } from 'rebass/styled-components';
import { CookieConsent } from '../index';
import { Button } from '../../../atoms/button';

export default { title: 'Organisms/Cookie Consent' };

export const Overview = () => {
  const [showCookieModal, setShowCookieModal] = useState(false);
  return (
    <Flex flexDirection="column">
      <Text mb={3}>This is just a sample page</Text>
      <Button
        width="200px"
        onClick={() => {
          setShowCookieModal(true);
        }}
      >
        open cookie modal
      </Button>
      <CookieConsent
        showCookieModal={showCookieModal}
        setShowCookieModal={setShowCookieModal}
        cookiePolicyPage={{
          url: 'https://getro.com/',
        }}
        necessaryCookies={{
          isInitOpen: false,
          items: [
            { name: 'Woopra', checked: true, cookieName: [''] },
            { name: 'hotjar', checked: true, cookieName: [''] },
            { name: 'Segment', checked: true, cookieName: [''] },
            { name: 'Google Analytics', checked: true, cookieName: [''] },
            { name: 'Keen', checked: true, cookieName: [''] },
          ],
        }}
      >
        We only use strictly necessary, first-party cookies on this job board. These are cookies that are necessary to
        deliver this service to you, or are necessary for Techstars to understand how it is being used. Read our{' '}
        <Button
          fontSize="inherit"
          as="a"
          variant="underlineLink"
          m={0}
          p={0}
          sx={{ lineHeight: 1 }}
          display="inline-flex"
          href="https://jobs.techstars.com/cookie-policy"
        >
          cookies policy
        </Button>
        .
      </CookieConsent>
    </Flex>
  );
};
