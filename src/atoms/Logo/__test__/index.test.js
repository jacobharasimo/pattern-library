import React from 'react';
import renderer from 'react-test-renderer';
import Logo from '../index';

describe('Logo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly minimal', () => {
    const tree = renderer.create(<Logo minimal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly showPoweredBy', () => {
    const tree = renderer.create(<Logo showPoweredBy />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
