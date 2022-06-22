import React, { useMemo } from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Box, Flex, Button } from 'rebass/styled-components';
import { Checkbox } from '../checkbox';
import theme from '../../theme';
import { ProfilePicture } from '../../molecules/profilePicture';

const ListItem = ({
  avatarUrl,
  checkbox,
  checked,
  children,
  content,
  onRemove,
  name,
  onChange,
  orientation,
  showAvatar,
  size,
  value,
  ...rest
}) => {
  const horizontal = orientation === 'horizontal';
  const fontSize = useMemo(() => {
    if (size === 'sm') return 1;
    if (size === 'lg') return 3;

    return 2;
  }, [size]);

  const marginTop = useMemo(() => {
    if (size === 'lg') return 3;
    if (horizontal) return 2;

    return undefined;
  }, [horizontal, size]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        alignItems="center"
        justifyContent="space-between"
        fs={fontSize}
        color="text"
        fontWeight="body"
        sx={{
          display: horizontal ? 'inline-flex' : 'flex',
          backgroundColor: horizontal ? 'neutral.100' : 'transparent',
          borderRadius: horizontal ? '99px' : undefined,
          marginTop: horizontal ? 0 : undefined,
          marginRight: horizontal ? 2 : undefined,
          marginBottom: horizontal ? 2 : undefined,
          marginLeft: horizontal ? 0 : undefined,
          paddingTop: horizontal ? 1 : undefined,
          paddingRight: horizontal ? 2 : undefined,
          paddingBottom: horizontal ? 1 : undefined,
          paddingLeft: horizontal ? '12px' : undefined,

          '& + &': {
            marginTop,
            marginLeft: horizontal ? 0 : undefined,
          },
        }}
        {...rest}
      >
        {children && <Flex alignItems="center">{children}</Flex>}

        {!children && (
          <>
            {showAvatar && (
              <Box width="16px" height="16px" mr={2}>
                <ProfilePicture imageUrl={avatarUrl} name={content} />
              </Box>
            )}
            {checkbox ? (
              <Checkbox label={content} name={name} value={value} checked={checked} onChange={onChange} />
            ) : (
              content
            )}
          </>
        )}

        {onRemove && (
          <Button
            py={0}
            pr={0}
            pl={2}
            sx={{
              appearance: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'inherit',
              opacity: 0.6,
              transition: 'opacity 0.3s',
              marginLeft: showAvatar ? 'auto' : undefined,
              '&:hover': {
                opacity: 1,
                background: 'transparent!important',
              },
            }}
            type="button"
            onClick={onRemove}
          >
            <Box width="16px" height="16px" as={X} strokeWidth="1.5" aria-hidden="true" display="block" />
          </Button>
        )}
      </Box>
    </ThemeProvider>
  );
};

ListItem.propTypes = {
  avatarUrl: PropTypes.string,
  checkbox: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  showAvatar: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

ListItem.defaultProps = {
  avatarUrl: '',
  checkbox: false,
  checked: false,
  children: null,
  content: null,
  name: '',
  onChange: () => {},
  onRemove: null,
  orientation: 'vertical',
  showAvatar: false,
  size: 'md',
  value: '',
};

export default ListItem;
