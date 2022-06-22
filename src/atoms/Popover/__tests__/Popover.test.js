import React from 'react';
import { render } from '@testing-library/react';
import Popover from '../index';

describe('Popover', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      header: 'Header',
      content: 'Content',
      trigger: <span>I&apos;m the trigger</span>,
    };
  });

  it('renders', () => {
    component = render(<Popover {...props} />);
    expect(component).toMatchSnapshot();
  });
});
