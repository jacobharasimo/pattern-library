import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';

import Label from '../index';

describe('Label Component', () => {
  let props;

  it('renders with snapshot', () => {
    const { container } = render(<Label>Test label</Label>);
    expect(container).toMatchSnapshot();
  });

  it('renders with custom colors', () => {
    props = {
      background: '#333',
      color: '#fff',
    };
    const { container } = render(<Label {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('calls onRemove when present', () => {
    const onRemove = jest.fn();
    props = {
      onRemove,
    };

    render(
      <ThemeProvider theme={theme}>
        <Label {...props} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('remove-button'));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
