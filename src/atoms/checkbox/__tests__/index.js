import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from '../index';

/* LoadingButton uses 2 libraries to create itself. As such we dont have to test anything because its covered in those libraries */
describe('AsyncCheckbox', () => {
  const label = 'Hey, Click me!';
  it('renders without a loader', () => {
    const { getByText, container, queryByTestId } = render(<Checkbox isLoading={false} label={label} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loader')).toBeNull();
    expect(getByText(label)).not.toBeNull();
    expect(queryByTestId('checkbox')).not.toBeNull();
  });

  it('can load', () => {
    const { getByText, container, queryByTestId } = render(<Checkbox isLoading label={label} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('loader')).not.toBeNull();
    expect(getByText(label)).not.toBeNull();
    expect(queryByTestId('checkbox')).toBeNull();
  });
});
