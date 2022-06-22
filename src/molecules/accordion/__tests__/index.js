/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Accordion } from '../index';

describe('<Accordion  />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      title: 'sample title',
      children: 'sample children',
    };
  });

  it('should render collapsed', () => {
    const { container, getByTestId } = render(<Accordion {...props} />);
    expect(container).not.toBeNull();
    expect(getByTestId('accordion')).not.toBeNull();
    expect(getByTestId('collapse-section')).toHaveStyle('maxHeight: 0');
    expect(getByTestId('collapse-section')).toHaveStyle('paddingBottom: 0');
    expect(getByTestId('collapse-section')).toHaveStyle('transform: scaleY(0)');
  });

  it('should show the drawer content when open', () => {
    const { container, getByTestId } = render(<Accordion {...props} />);
    expect(container).not.toBeNull();
    expect(getByTestId('accordion')).not.toBeNull();
    const title = getByTestId('title');
    fireEvent.click(title);
    expect(getByTestId('collapse-section')).toHaveStyle('transform: scaleY(1)');
    expect(getByTestId('collapse-section')).toHaveStyle('maxHeight: 999999px');
  });
});
