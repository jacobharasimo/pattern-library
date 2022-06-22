import React, { useEffect } from 'react';
import { Flex, Box, Text, Button } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import FocusTrap from 'focus-trap-react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export const Modal = ({
  'data-testid': dataTestId,
  title,
  isOpen,
  onCancel,
  actions,
  variant,
  children,
}) => {
  const wrapperId = `modal-wrapper ${dataTestId}`;

  const escapeKeyClose = e => {
    if (isOpen && e.keyCode === 27) {
      onCancel();
    }
  };

  useEffect(
    () => () => {
      document.removeEventListener('keydown', escapeKeyClose, false);
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', escapeKeyClose, false);
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = '';
      document.removeEventListener('keydown', escapeKeyClose, false);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Flex
        data-testid={`${wrapperId}`}
        tx="modals"
        variant={`${variant}.wrapper`}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          height: '100%',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          data-testid="overlay"
          tx="modals"
          variant={`${variant}.overlay`}
          onClick={onCancel}
        />
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '[data-testid="close"]',
            initialFocus: `[data-testid="${wrapperId}"]`,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
          }}
        >
          <Flex
            sx={{ tabIndex: 0 }}
            flexDirection="column"
            data-testid="modal"
            tx="modals"
            variant={`${variant}.modal`}
          >
            {title && (
              <Flex
                data-testid="header"
                tx="modals"
                variant={`${variant}.header`}
              >
                <Text
                  data-testid="title"
                  tx="modals"
                  variant={`${variant}.title`}
                >
                  {title}
                </Text>
                <Button
                  data-testid="close"
                  tx="modals"
                  variant={`${variant}.closeButton`}
                  display="flex"
                  onClick={onCancel}
                >
                  <Box
                    height="24px"
                    width="24px"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    as={X}
                  />
                  <Text variant="srOnly">Close</Text>
                </Button>
              </Flex>
            )}
            <Box data-testid="body" tx="modals" variant={`${variant}.body`}>
              {!title && (
                <Button
                  sx={{
                    m: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                  data-testid="close"
                  tx="modals"
                  variant={`${variant}.closeButton`}
                  display="flex"
                  onClick={onCancel}
                >
                  <Box
                    height="24px"
                    width="24px"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    as={X}
                  />
                  <Text variant="srOnly">Close</Text>
                </Button>
              )}
              {children}
            </Box>
            {actions && (
              <Box
                data-testid="footer"
                tx="modals"
                variant={`${variant}.footer`}
              >
                {actions}
              </Box>
            )}
          </Flex>
        </FocusTrap>
      </Flex>
    </ThemeProvider>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  'data-testid': PropTypes.string,
  title: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.string,
};

Modal.defaultProps = {
  'data-testid': '',
  isOpen: true,
  variant: 'default',
  actions: null,
  children: '',
  title: null,
};
