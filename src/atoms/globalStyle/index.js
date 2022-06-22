import React from 'react';
import { Box } from 'rebass/styled-components';
import './animations.css';

const GlobalStyle = props => (
  <Box
    sx={theme => ({
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.body,
      fontStyle: 'normal',
      fontSize: theme.fontSizes[2],
      color: theme.colors.text,
    })}
    {...props}
  />
);

export default GlobalStyle;
