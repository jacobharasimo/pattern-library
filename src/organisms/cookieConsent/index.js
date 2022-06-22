import React, { useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { Flex, Text, Card, Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../atoms/button';
import { Modal } from '../../molecules/modal';
import { Checkbox } from '../../atoms/checkbox';
import { Accordion } from '../../molecules/accordion';
import theme from '../../theme';

// todo: create a hook that can be used to control the cookie consent manager modal dialog
export const CookieConsent = ({
  necessaryCookies,
  consentCookieName,
  children,
  cookiePolicyPage,
  cookieDuration,
  variant,
  showCookieModal,
  setShowCookieModal,
  ...props
}) => {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(!!Cookies.get(consentCookieName));
  const acceptCookie = () => {
    Cookies.set(consentCookieName, true, { expires: cookieDuration });
    setIsCookiesAccepted(true);
    setShowCookieModal(false);
  };
  const showCookieWarning = isCookiesAccepted || !necessaryCookies.items.length;
  const modalActions = useMemo(
    () => (
      <Flex justifyContent="flex-end" alignItems="baseLine" data-testid="interactive-renew-action-buttons">
        <Button data-testid="accept-all" variant="primary" onClick={acceptCookie}>
          Accept all
        </Button>
      </Flex>
    ),
    [acceptCookie],
  );

  return (
    <ThemeProvider theme={theme}>
      {!showCookieWarning && (
        <Card data-testid="cookie-consent" tx="cookieConsent" variant="drawer" {...props}>
          <Text pb={3}>{children}</Text>
          <Flex flexDirection="row" justifyContent="flex-end">
            <Button
              size="small"
              data-testid="cookie-details"
              variant="secondary"
              mr={2}
              onClick={() => setShowCookieModal(true)}
            >
              Cookies details
            </Button>
            <Button size="small" data-testid="accept-cookies" onClick={acceptCookie}>
              OK
            </Button>
          </Flex>
        </Card>
      )}
      <Modal
        actions={modalActions}
        onCancel={() => setShowCookieModal(false)}
        isOpen={showCookieModal}
        title="Cookies details"
        data-testid="cookie-consent-details"
      >
        <Box pb={3} fontSize={0}>
          <Text pb={2}>
            This website uses cookies and similar technologies, for example, HTML5 localStorage, (hereafter
            collectively, &ldquo;cookies&rdquo;) to provide this service, as well as to analyze its usage.
          </Text>
          <Text pb={2}>
            Cookies are small amounts of information stored on the user’s browser by a website they visit. When the user
            returns to a website, the cookies belonging to that site are sent back to it. This allows the website to
            &ldquo;remember&rdquo; data about a user between requests or browser sessions.
          </Text>
          <Text pb={2}>
            Below we categorise the cookies this website stores by their use. You can choose to turn each type on or
            off.
          </Text>
          <Text>
            For more information, and an explanation of some of the terms used here, please see our{' '}
            <Button
              as="a"
              variant="underlineLink"
              display="inline-flex"
              m={0}
              p={0}
              fontSize="inherit"
              target={cookiePolicyPage.target || '_parent'}
              href={cookiePolicyPage.url}
            >
              Cookie Policy
            </Button>
            .
          </Text>
        </Box>
        {necessaryCookies && (
          <Accordion
            data-testid="necessary-cookies"
            isOpen={necessaryCookies.isInitOpen}
            title="Strictly Necessary Cookies"
          >
            <Flex as="ul" flexDirection="column" sx={{ listStyle: 'none' }} p={0}>
              <Text mb={2} fontSize={0}>
                These cookies are used to perform essential functions to enable the website to work properly. Without
                them, services you’ve asked for can’t be provided. You cannot turn these cookies off.
              </Text>
              {necessaryCookies.items.map(({ checked, name }) => (
                <Box as="li" key={`necessary_cookies_${name}`}>
                  <Checkbox label={name} checked={checked} disabled />
                </Box>
              ))}
            </Flex>
          </Accordion>
        )}
      </Modal>
    </ThemeProvider>
  );
};

CookieConsent.propTypes = {
  cookiePolicyPage: PropTypes.shape({
    target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
    url: PropTypes.string,
  }),
  showCookieModal: PropTypes.bool,
  setShowCookieModal: PropTypes.func,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  consentCookieName: PropTypes.string,
  cookieDuration: PropTypes.number,
  necessaryCookies: PropTypes.shape({
    isInitOpen: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        cookies: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }),
};

CookieConsent.defaultProps = {
  cookiePolicyPage: {
    target: '_parent',
    url: 'https://www.getro.com/cookies/',
  },
  variant: 'default',
  cookieDuration: 365,
  children: 'We use cookies to optimise your experience',
  consentCookieName: 'getro_gdpr',
  necessaryCookies: { isInitOpen: false, items: [] },
  showCookieModal: false,
  setShowCookieModal: () => {},
};
