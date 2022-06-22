import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'rebass/styled-components';

export const LinkDecorator = ({ contentState, entityKey, children, ...props }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      color="text"
      sx={{ textDecoration: 'underline' }}
    >
      {children}
    </Link>
  );
};

const strategy = (block, callback, contentState) => {
  block.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

LinkDecorator.propTypes = {
  children: PropTypes.node.isRequired,
  entityKey: PropTypes.string,
  contentState: PropTypes.shape({
    getEntity: PropTypes.func,
  }),
};

LinkDecorator.defaultProps = {
  entityKey: null,
  contentState: null,
};

export default strategy;
