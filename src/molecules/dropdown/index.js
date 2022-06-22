import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { usePopperTooltip } from 'react-popper-tooltip';
import { MoreHorizontal } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { usePrevious } from '../../hooks/usePrevious';

export const Dropdown = forwardRef(
  (
    {
      onOpen,
      onClose,
      trigger,
      interactive,
      offset,
      placement,
      variant,
      popperConfig,
      delayHide,
      children,
      triggerProps,
      dropDownProps,
      ...rebassProps
    },
    ref,
  ) => {
    const [controlledVisible, setControlledVisible] = useState(false);

    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
      usePopperTooltip({
        ...popperConfig,
        trigger,
        offset,
        visible: controlledVisible,
        onVisibleChange: setControlledVisible,
        interactive,
        placement,
        delayHide,
      });

    const previousVisibility = usePrevious(controlledVisible);

    useImperativeHandle(ref, () => ({
      closeDropdown,
      openDropdown,
      isOpen: visible,
    }));

    const closeDropdown = () => {
      setControlledVisible(false);
    };

    const openDropdown = () => {
      setControlledVisible(true);
    };

    useEffect(() => {
      if (previousVisibility !== undefined) {
        if (previousVisibility !== controlledVisible && (onOpen || onClose)) {
          if (controlledVisible && onOpen) {
            onOpen();
          }
          if (!controlledVisible && onClose) {
            onClose();
          }
        }
      }
    }, [controlledVisible, onClose, onOpen, previousVisibility]);

    useEffect(() => {
      const handleKeyDown = ({ key }) => {
        if (key === 'Escape') {
          setControlledVisible(false);
        }
      };

      if (visible) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [visible]);

    return (
      <ThemeProvider theme={theme}>
        <Flex ref={ref} data-testid="dropdown" {...rebassProps}>
          <Button
            data-testid="dropdown-trigger"
            ref={setTriggerRef}
            data-is-open={visible}
            {...triggerProps}
          >
            {triggerProps.children}
          </Button>
          {visible && (
            <Box
              data-testid="dropdown-content"
              tx="dropdown"
              variant={`${variant}.container`}
              ref={setTooltipRef}
              {...getTooltipProps({ className: 'dropdown-container' })}
              {...dropDownProps}
            >
              {children}
            </Box>
          )}
        </Flex>
      </ThemeProvider>
    );
  },
);

Dropdown.propTypes = {
  triggerProps: PropTypes.object,
  variant: PropTypes.string,
  popperConfig: PropTypes.shape({
    closeOnOutsideClick: PropTypes.bool,
    closeOnTriggerHidden: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    delayShow: PropTypes.number,
    followCursor: PropTypes.bool,
    mutationObserverOptions: PropTypes.object,
    onVisibleChange: PropTypes.bool,
    visible: PropTypes.bool,
  }),
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  interactive: PropTypes.bool,
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ]),
  offset: PropTypes.arrayOf(PropTypes.number),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  dropDownProps: PropTypes.object,
  delayHide: PropTypes.number,
};

Dropdown.defaultProps = {
  triggerProps: {
    children: (
      <Box height="16px" width="auto" as={MoreHorizontal} strokeWidth="1.5" />
    ),
    variant: 'primary',
  },
  onOpen: null,
  onClose: null,
  trigger: ['click'],
  interactive: true,
  placement: 'bottom',
  offset: [0, 1],
  variant: 'default',
  dropDownProps: {},
  delayHide: 300,
  popperConfig: {},
};
