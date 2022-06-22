import React from 'react';
import { Card, Text, Button, Flex, Box } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { HelpCircle, Edit2 } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import Popover from '../../atoms/Popover';
import theme from '../../theme';

const ButtonSchema = PropTypes.shape({
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
});

export const Panel = ({
  headerButton,
  popover,
  title,
  children,
  footer,
  ...rest
}) => (
  <ThemeProvider theme={theme}>
    <Card
      tx="card"
      variant="editPanel"
      width={1}
      data-testid="edit-box"
      flexDirection={['column']}
      {...rest}
    >
      {(title || popover) && (
        <Flex
          data-testid="header"
          pb={3}
          mb={3}
          sx={{ borderBottom: 1, borderBottomColor: 'neutral.100' }}
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            flex="1 1"
            pr={2}
            alignItems="center"
          >
            {title && (
              <Text fontSize={3} fontWeight="medium" color="textDark">
                {title}
              </Text>
            )}
            {popover && (
              <Box color="neutral.400" ml={2}>
                <Popover
                  trigger={
                    <Box
                      height="24px"
                      width="auto"
                      as={HelpCircle}
                      strokeWidth="1.5"
                    />
                  }
                  {...popover}
                />
              </Box>
            )}
          </Box>
          {headerButton && (
            <Button
              data-testid="header-action"
              display="flex"
              alignItems="center"
              px={2}
              py={1}
              variant="panelEdit"
              type="button"
              sx={{ fontSize: 1 }}
              {...headerButton}
            />
          )}
        </Flex>
      )}
      <Flex
        data-testid="content"
        width={1}
        alignItems="start"
        sx={{ position: 'relative' }}
      >
        {!title && !popover && headerButton && (
          <Button
            data-testid="content-action"
            ml={2}
            display="flex"
            alignItems="center"
            px={2}
            py={1}
            variant="panelEdit"
            type="button"
            fontSize={1}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            {...headerButton}
          >
            {headerButton.children || (
              <>
                <Box
                  height="16px"
                  width="auto"
                  as={Edit2}
                  strokeWidth="1.5"
                  mr={2}
                />
                Edit
              </>
            )}
          </Button>
        )}
        <Box flex="1 1">{children}</Box>
      </Flex>
      {footer && (
        <Flex
          data-testid="footer"
          alignItems="center"
          pt={3}
          mt={3}
          sx={{ borderTop: 1, borderTopColor: 'neutral.100' }}
        >
          {footer}
        </Flex>
      )}
    </Card>
  </ThemeProvider>
);

Panel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  popover: PropTypes.shape({
    header: PropTypes.string,
    content: PropTypes.string,
    trigger: PropTypes.string,
  }),
  headerButton: ButtonSchema,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Panel.defaultProps = {
  title: null,
  popover: null,
  headerButton: null,
  footer: null,
};
