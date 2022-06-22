import React from 'react';
import { render } from '@testing-library/react';
import Badge from '../index';

describe('Badge component', () => {
  it('renders', () => {
    const { container } = render(<Badge>9</Badge>);
    expect(container).toMatchSnapshot();
  });

  it('renders in sm size', () => {
    const props = { size: 'sm' };
    const { container } = render(<Badge {...props}>9</Badge>);
    expect(container).toMatchSnapshot();
  });

  it('renders with className', () => {
    const props = { className: 'test-class' };
    const { container } = render(<Badge {...props}>9</Badge>);
    expect(container).toMatchSnapshot();
  });
});
