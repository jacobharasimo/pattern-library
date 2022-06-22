import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { ProfilePicture } from '../profilePicture';
import './index.scss';

export const Vouch = ({
  relationshipLevelOptions,
  scoreOptions,
  getUserDisplayName,
  show,
  size,
  vouch,
  collapsed,
  userId,
}) => {
  const { id, voucher = {}, vouched = {}, relationshipLevel, relationshipText, score } = vouch;
  let user = vouched;

  if (show === 'voucher') {
    user = voucher;
  }

  let scoreString = null;
  if (score && score > 0 && score <= Object.keys(scoreOptions).length) {
    scoreString = scoreOptions[score];
  }

  let relationshipString = null;

  if (relationshipLevel > 0 && relationshipLevel <= Object.keys(relationshipLevelOptions).length) {
    relationshipString = relationshipLevelOptions[relationshipLevel].replace(
      '[Member Name]',
      vouched && vouched.firstName ? vouched.firstName : 'this person',
    );
  }

  if (collapsed) {
    return (
      <div key={id} className={`Vouch Vouch--${size}`}>
        <Box width={['40px', '56px']}>
          <ProfilePicture imageUrl={user.avatarUrl} name={getUserDisplayName(user)} verified={user.verified} />
        </Box>
      </div>
    );
  }

  let displayName = getUserDisplayName(user);
  if (user.id === userId) {
    displayName = `${getUserDisplayName(user)} (You)`;
  }
  return (
    <div key={id} className={`Vouch Vouch--${size}`}>
      <Box width={['40px', '56px']}>
        <ProfilePicture imageUrl={user.avatarUrl} name={displayName} verified={user.verified} />
      </Box>
      <div className="Vouch__main">
        <h4 className="Vouch__name">{displayName}</h4>
        {scoreString && <p className="Vouch__score">{scoreString}</p>}
        {relationshipString && <p className="Vouch__score">{relationshipString}</p>}
        <p className="Vouch__text text-hyphenate">{relationshipText}</p>
      </div>
    </div>
  );
};
Vouch.propTypes = {
  relationshipLevelOptions: PropTypes.object.isRequired,
  scoreOptions: PropTypes.object.isRequired,
  getUserDisplayName: PropTypes.func.isRequired,
  show: PropTypes.oneOf(['voucher', 'vouched']).isRequired,
  size: PropTypes.oneOf(['md', 'sm']).isRequired,
  vouch: PropTypes.shape({
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
    score: PropTypes.number,
    relationshipLevel: PropTypes.number,
    relationshipText: PropTypes.string,
  }).isRequired,
  collapsed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
