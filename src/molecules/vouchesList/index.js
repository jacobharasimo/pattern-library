import React from 'react';
import PropTypes from 'prop-types';
import { Vouch } from '../vouch';
import './index.scss';

export const VouchesList = ({
  scoreOptions,
  relationshipLevelOptions,
  getUserDisplayName,
  vouches,
  show,
  size,
  blankContent,
  collapsed,
  maxCollapsed,
  userId,
}) => {
  let users = vouches;
  let collapsedClass = '';

  if (!users || !users.length) {
    return (
      <div className={`VouchesList ${collapsedClass}`}>
        <div className="VouchesList__blank">{blankContent}</div>
      </div>
    );
  }

  if (collapsed) {
    collapsedClass = 'collapsed';
    users = vouches.filter((value, key) => key < maxCollapsed);
    const more = vouches.length - users.length;
    if (more > 0) {
      users.push({
        id: 'more',
        voucher: {
          firstName: `+ ${more}`,
        },
      });
    }
  }

  return (
    <div className={`VouchesList ${collapsedClass}`}>
      {users.map(ref => (
        <Vouch
          relationshipLevelOptions={relationshipLevelOptions}
          scoreOptions={scoreOptions}
          getUserDisplayName={getUserDisplayName}
          key={ref.id}
          show={show}
          size={size}
          vouch={ref}
          collapsed={collapsed}
          userId={userId}
        />
      ))}
    </div>
  );
};
VouchesList.propTypes = {
  relationshipLevelOptions: PropTypes.object.isRequired,
  scoreOptions: PropTypes.object.isRequired,
  getUserDisplayName: PropTypes.func.isRequired,
  blankContent: PropTypes.node,
  collapsed: PropTypes.bool,
  maxCollapsed: PropTypes.number,
  vouches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      voucher: PropTypes.shape({
        avatarUrl: PropTypes.string,
        firstName: PropTypes.string,
        verified: PropTypes.bool,
      }),
      vouched: PropTypes.shape({
        avatarUrl: PropTypes.string,
        firstName: PropTypes.string,
        verified: PropTypes.bool,
      }),
      relationshipLevel: PropTypes.number,
      relationshipText: PropTypes.string,
    }),
  ).isRequired,
  show: PropTypes.string,
  userId: PropTypes.number,
  size: PropTypes.oneOf(['md', 'sm']),
};

VouchesList.defaultProps = {
  blankContent: 'Nothing to show.',
  collapsed: false,
  maxCollapsed: 3,
  show: 'voucher',
  size: 'md',
  userId: 0,
};
