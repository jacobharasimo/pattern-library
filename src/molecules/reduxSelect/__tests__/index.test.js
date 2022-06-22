import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ReduxSelect from '../index';
import theme from '../../../theme';

describe('ReduxSelect', () => {
  let initialProps = {};

  beforeEach(() => {
    initialProps = {
      optionsMessage: 'No options',
      noResultsMessage: 'No results found',
      menuIsOpen: true,
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ],
    };
  });

  it('renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ReduxSelect {...initialProps} />
      </ThemeProvider>,
    );
    expect(container).not.toBeNull();
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('shows optionsMessage', () => {
    initialProps.options = [];
    const { getByText, container } = render(
      <ThemeProvider theme={theme}>
        <ReduxSelect {...initialProps} />
      </ThemeProvider>,
    );
    expect(container).not.toBeNull();
    expect(getByText(initialProps.optionsMessage)).not.toBeNull();
  });

  it('shows noResultsMessage', () => {
    const { getByText, container } = render(
      <ThemeProvider theme={theme}>
        <ReduxSelect {...initialProps} />
      </ThemeProvider>,
    );
    expect(container).not.toBeNull();
    const input = container.querySelector('input');
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'abc123' } });
    expect(getByText(initialProps.noResultsMessage)).not.toBeNull();
  });
});
