import React from 'react';
import { render } from '@testing-library/react';
import ListItem from '../index';

describe('ListItem', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      content: 'LIST ITEM',
      orientation: 'vertical',
      showAvatar: false,
      checkbox: false,
      remove: false,
    };
  });

  it('renders', () => {
    component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders horizontal', () => {
    props.orientation = 'horizontal';
    component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders when showAvatar', () => {
    props.showAvatar = true;
    component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders when checkbox', () => {
    props.checkbox = true;
    component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders when remove', () => {
    props.remove = true;
    component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with children', () => {
    component = render(<ListItem {...props}>Ehlo hi</ListItem>);
    expect(component).toMatchSnapshot();
  });
});
