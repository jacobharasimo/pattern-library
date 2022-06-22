import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../index';

describe('Loader', () => {
  it('renders', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
