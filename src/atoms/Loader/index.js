import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const animationSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: ${props => (props.display === 'inline' ? 'inline-block' : 'block')};
  margin: auto;
  width: ${props => (props.size === 'sm' ? 'var(--space-lg)' : 'var(--space-xxl)')};
  height: ${props => (props.size === 'sm' ? 'var(--space-lg)' : 'var(--space-xxl)')};
  border-radius: 50%;
  border: solid var(--color-gray-4);
  border-width: ${props => (props.size === 'sm' ? '3px' : '4px')};
  border-top-color: ${props => props.accentColor || 'var(--color-accent)'};
  animation: ${animationSpin} 1s linear infinite;
`;

const Loader = ({ accentColor, ...rest }) => <LoaderWrapper accentColor={accentColor} {...rest} />;

Loader.propTypes = {
  accentColor: PropTypes.string,
  display: PropTypes.oneOf(['inline', 'block']),
  size: PropTypes.oneOf(['sm', 'md']),
};

Loader.defaultProps = {
  accentColor: null,
  display: 'block',
  size: 'md',
};

export default Loader;
