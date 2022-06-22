import React, { memo } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'react-feather';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';

const MessageIcon = memo(({ type, ...rest }) => {
  let Icon = Info;

  if (type === 'success') Icon = CheckCircle;
  if (type === 'warning') Icon = AlertCircle;
  if (type === 'error') Icon = XCircle;

  return <Box as={Icon} strokeWidth="1.5" aria-hidden="true" {...rest} />;
});

MessageIcon.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};

MessageIcon.defaultProps = {
  type: 'info',
};

export { MessageIcon };
