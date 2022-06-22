import React from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'rebass/styled-components';

const LabelWrapper = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  height: var(--space-lg);
  background: ${props => props.$background || 'var(--color-gray-4)'};
  color: ${props => props.$color || 'var(--color-text)'};
  border-radius: 99px;
  padding: var(--space-xs) calc(1.5 * var(--space-unit));
  margin: 0 var(--space-xs) var(--space-xs) 0;
  font-size: var(--text-sm);
  line-height: var(--space-md);
`;

const Label = ({ background, children, className, color, content, onRemove, ...rest }) => (
  <LabelWrapper className={className} $background={background} $color={color} {...rest}>
    {content || children}
    {onRemove && (
      <Box
        as={X}
        strokeWidth="1.5"
        aria-hidden="true"
        onClick={onRemove}
        data-testid="remove-button"
        display="inline-flex"
        verticalAlign="middle"
        opacity="0.6"
        sx={{
          color: ({ colors }) => color || colors.text,
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          '&:hover': {
            opacity: 1,
          },
        }}
      />
    )}
  </LabelWrapper>
);

Label.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
  onRemove: PropTypes.func,
};

Label.defaultProps = {
  background: null,
  children: null,
  className: '',
  color: null,
  content: '',
  onRemove: null,
};

export default Label;
