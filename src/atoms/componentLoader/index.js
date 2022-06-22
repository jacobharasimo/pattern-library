import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import './animation.css';

export const ComponentLoader = ({ size, display, ...rest }) => (
  <Box
    m="auto"
    sx={{
      width: size === 'sm' ? '24px' : '40px',
      height: size === 'sm' ? '24px' : '40px',
      borderWidth: size === 'sm' ? '3px' : '4px',
      borderRadius: 'circle',
      borderStyle: 'solid',
      borderColor: 'loaderSecondary',
      borderTopColor: 'loaderPrimary',
      animation: 'animationSpin 1s linear infinite',
    }}
    display={display}
    {...rest}
  />
);

ComponentLoader.propTypes = {
  display: PropTypes.oneOf(['inline', 'block']),
  size: PropTypes.oneOf(['sm', 'md']),
};

ComponentLoader.defaultProps = {
  display: 'block',
  size: 'md',
};
