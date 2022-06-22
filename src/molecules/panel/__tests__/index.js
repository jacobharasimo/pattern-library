import React from 'react';
import { render } from '@testing-library/react';
import { Panel } from '../index';

describe('Panel', () => {
  it('renders', () => {
    const { getByTestId, container } = render(
      <Panel title="A sample panel" footer={<>footer</>}>
        Content goes here.
      </Panel>,
    );
    expect(container).not.toBeNull();
    expect(getByTestId('header')).not.toBeNull();
    expect(getByTestId('content')).not.toBeNull();
    expect(getByTestId('footer')).not.toBeNull();
  });
});
