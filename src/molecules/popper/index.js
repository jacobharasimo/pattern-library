import React, { useEffect } from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { usePopperTooltip } from 'react-popper-tooltip';
import { HelpCircle } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export const Popper = ({
  popperConfig,
  children,
  popover,
  triggerProps,
  containerProps,
  ...rebassProps
}) => {
  const [controlledVisible, setControlledVisible] = React.useState(false);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    ...{ trigger: ['hover', 'focus'] },
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
    ...popperConfig,
  });

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
    return () => {};
  }, [visible]);

  return (
    <ThemeProvider theme={theme}>
      <Flex tx="popover" data-testid="popover" {...rebassProps}>
        <Button
          data-testid="popover-trigger"
          tx="popover"
          variant="trigger"
          ref={setTriggerRef}
          {...triggerProps}
        >
          {children}
        </Button>
        {visible && (
          <Box
            data-testid="popover-container"
            tx="popover"
            variant="container"
            ref={setTooltipRef}
            {...getTooltipProps({ className: 'tooltip-container' })}
            {...containerProps}
          >
            <Box
              tx="popover"
              variant="arrow"
              {...getArrowProps({ className: 'tooltip-arrow' })}
            />
            {popover}
          </Box>
        )}
      </Flex>
    </ThemeProvider>
  );
};

Popper.propTypes = {
  triggerProps: PropTypes.object,
  containerProps: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  header: PropTypes.string,
  popperConfig: PropTypes.shape({
    closeOnOutsideClick: PropTypes.bool,
    closeOnTriggerHidden: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    followCursor: PropTypes.bool,
    interactive: PropTypes.bool,
    mutationObserverOptions: PropTypes.object,
    offset: PropTypes.arrayOf(PropTypes.number),
    onVisibleChange: PropTypes.bool,
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
    trigger: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    visible: PropTypes.bool,
  }),
  popover: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

Popper.defaultProps = {
  triggerProps: {},
  containerProps: {},
  header: '',
  popperConfig: {},
  children: (
    <Box height="24px" width="auto" as={HelpCircle} strokeWidth="1.5" />
  ),
};
