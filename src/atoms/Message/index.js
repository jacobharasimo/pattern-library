import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import { MessageIcon } from '../messageIcon';
import theme from '../../theme';

const Message = ({ type, content, children, ...rest }) => {
  const color = useMemo(() => {
    if (type === 'success') return 'success';
    if (type === 'error') return 'danger';
    if (type === 'warning') return 'warning';

    return 'info';
  }, [type]);

  return (
    <ThemeProvider theme={theme}>
      <Flex
        bg="neutral.0"
        textAlign="left"
        alignItems="center"
        p={[2]}
        sx={{
          borderRadius: '4px',
          boxShadow: theme.shadows.small,
          borderLeft: '0.1875rem solid',
          borderLeftColor: color,
          lineHeight: 1.4,
        }}
        {...rest}
      >
        <Box
          as={MessageIcon}
          type={type}
          mr={3}
          sx={{
            flexShrink: 0,
            flexGrow: 0,
            flexBasis: '24px',
            color,
          }}
        />
        <Box
          color="text"
          sx={{
            fontWeight: 'medium',
            fontSize: 1,
          }}
        >
          {content || children}
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

Message.propTypes = {
  children: PropTypes.node,
  content: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};

Message.defaultProps = {
  children: null,
  content: '',
  type: 'info',
};

export default Message;
