import React from 'react';
import { render } from '@testing-library/react';
import Radio from '../index';

describe('Radio Component', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'Monday',
      checked: false,
      onChange: () => {},
      size: 'md',
    };
  });

  it('renders correctly', () => {
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders lg', () => {
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders checked', () => {
    props.checked = true;
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled', () => {
    props.disabled = true;
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });
});
