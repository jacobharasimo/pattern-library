import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from '../src/theme';
import GlobalStyle from '../src/atoms/globalStyle';
import 'react-popper-tooltip/dist/styles.css';
import '@draft-js-plugins/anchor/lib/plugin.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '414px',
      height: '963px',
    },
    type: "mobile"
  },
};

export const parameters = {
  viewport: {
    viewports: {
      ...customViewports,
    },
  },
};

export const decorators = [(Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle data-testid="global-style">
      <div style={{ padding: 24, background: '#fff' }}>
        <Story />
      </div>
    </GlobalStyle>
  </ThemeProvider>
)];
