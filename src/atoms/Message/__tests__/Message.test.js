import React from 'react';
import { render } from '@testing-library/react';
import Message from '../index';

describe('Message', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      type: 'info',
      content: 'Message subtitle goes here',
    };
  });

  it('renders', () => {
    component = render(<Message {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with icon type success', () => {
    props.type = 'success';
    component = render(<Message {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with icon type warning', () => {
    props.type = 'warning';
    component = render(<Message {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with icon type error', () => {
    props.type = 'error';
    component = render(<Message {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with children', () => {
    component = render(<Message {...props}>Children test</Message>);
    expect(component).toMatchSnapshot();
  });
});
