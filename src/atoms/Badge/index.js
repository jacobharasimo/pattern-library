import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const BadgeWrapper = styled.div`
  display: inline-block;
  min-width: var(--space-lg);
  height: var(--space-lg);
  padding: 0 var(--space-xs);

  font-size: var(--text-sm);
  font-weight: var(--text-bold);
  line-height: var(--space-lg);
  font-family: var(--font-main);

  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  box-shadow: ${props => props.boxShadow};
  text-align: center;
  border-radius: 500rem;

  ${props =>
    props.size === 'sm' &&
    css`
      font-size: var(--text-xs);
      min-width: var(--space-md);
      height: var(--space-md);
      line-height: var(--space-md);
    `}
`;

const Badge = ({
  children,
  className,
  size,
  textColor,
  backgroundColor,
  boxShadow,
}) => (
  <BadgeWrapper
    size={size}
    className={className}
    textColor={textColor}
    backgroundColor={backgroundColor}
    boxShadow={boxShadow}
  >
    {children}
  </BadgeWrapper>
);

Badge.propTypes = {
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
  textColor: PropTypes.string,
};

Badge.defaultProps = {
  backgroundColor: 'var(--color-primary)',
  boxShadow: 'var(--shadow-sm)',
  children: 0,
  className: '',
  size: 'md',
  textColor: 'var(--color-white)',
};

export default Badge;
