import React from 'react';
import { render } from '@testing-library/react';
import Progress from '../index';

describe('Progress Component', () => {
  let progress;
  let component;

  beforeEach(() => {
    progress = {
      showText: false,
      step: 1,
      total: 8,
    };
  });

  it('render correctly with snapshot', () => {
    component = render(<Progress showText={progress.showText} step={progress.step} total={progress.total} />);
    expect(component).toMatchSnapshot();
  });

  it('render correctly with step greater than total', () => {
    component = render(<Progress showText={progress.showText} step={progress.total + 1} total={progress.total} />);
    expect(component).toMatchSnapshot();
  });
});
