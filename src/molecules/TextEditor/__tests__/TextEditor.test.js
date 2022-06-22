import React from 'react';
import { render } from '@testing-library/react';
import TextEditor from '../index';

describe('TextEditor', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  it('renders', () => {
    const { queryByTestId } = render(<TextEditor {...props} />);
    expect(queryByTestId('text-editor')).not.toBeNull();
  });
});
