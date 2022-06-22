import React from 'react';
import { render } from '@testing-library/react';
import { VouchesList } from '../index';

const relationshipLevelOptions = {
  1: 'I’ve worked with [Member Name]',
  2: 'I’ve interviewed [Member Name]',
  3: 'I’ve been mentored by [Member Name]',
  4: 'I’ve mentored [Member Name]',
  5: 'I don’t know [Member Name] personally',
};

const scoreOptions = {
  1: 'Low info personally and professionally',
  2: 'High confidence personally; low info professionally',
  3: 'Low info personally; high confidence professionally',
  4: 'High confidence personally and professionally',
  5: 'High confidence personally and professionally, plus, I would bet my career on them',
};

describe('VouchesList Component', () => {
  let voucheslist;
  beforeEach(() => jest.resetModules());
  beforeEach(() => {
    voucheslist = {
      relationshipLevelOptions,
      scoreOptions,
      getUserDisplayName: () => {},
      vouches: [
        {
          createdAt: '2018-10-29T14:57:56.210-04:00',
          id: 387,
          recommendationText:
            "He's been a fantastic resources to me and the team at USV. I'd recommend him to another company for sure!",
          score: 5,
          status: 'sent',
          voucher: {
            avatarUrl: 'https://cdn.filestackcontent.com/oKET77WEQCuRlKnyBWc5',
            bio: 'Software Engineer en Monday, Inc.',
            email: 'carlos@monday.vc',
            firstName: 'Carlos',
            id: 6413,
            lastName: 'Muñoz',
            linkedinUrl: 'https://linkedin.com/in/cmunozgar',
          },
          vouched: {
            avatarUrl:
              'https://cdn.filepicker.io/api/file/J3xt1hPrT5KZeCuXWUDa',
            bio: 'CEO at Monday.vc // Passionate about helping people find meaningful work.',
            email: 'evan@monday.vc',
            firstName: 'Evan',
            id: 6174,
            lastName: 'Walden',
            linkedinUrl: '',
          },
        },
      ],
      show: 'vouched',
      size: 'md',
      blankContent: 'Nothing to show.',
    };
  });

  it('renders', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component1 = render(<VouchesList {...voucheslist} />);
    expect(component1).not.toBeNull();
  });
});
