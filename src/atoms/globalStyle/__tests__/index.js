import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../index';
import theme from '../../../theme';
/* LoadingButton uses 2 libraries to create itself. As such we dont have to test anything because its covered in those libraries */

describe('GlobalStyle', () => {
  it('renders with theme', () => {
    const text = 'Children';
    const { container, findByText } = render(
      <ThemeProvider theme={theme}>
        <GlobalStyle>{text}</GlobalStyle>
      </ThemeProvider>,
    );
    expect(container).not.toBeNull();
    expect(findByText(text)).not.toBeNull();
  });
});
