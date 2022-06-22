import React from 'react';
import { render } from '@testing-library/react';
import { Vouch } from '../index';

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

describe('Vouch Component', () => {
  let vouchItem;
  beforeEach(() => {
    vouchItem = {
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
        avatarUrl: 'https://cdn.filepicker.io/api/file/J3xt1hPrT5KZeCuXWUDa',
        bio: 'CEO at Monday.vc // Passionate about helping people find meaningful work.',
        email: 'evan@monday.vc',
        firstName: 'Evan',
        id: 6174,
        lastName: 'Walden',
        linkedinUrl: '',
      },
    };
  });

  it('renders', () => {
    const { container } = render(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => {}}
        show="vouched"
        size="md"
        vouch={vouchItem}
        collapsed
        userId={0}
      />,
    );
    expect(container).not.toBeNull();
  });

  it('can collapse', () => {
    const { rerender, container } = render(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => {}}
        show="vouched"
        size="md"
        vouch={vouchItem}
        collapsed
        userId={0}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.Vouch__main')).toBeNull();
    rerender(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => {}}
        show="vouched"
        size="md"
        vouch={vouchItem}
        collapsed={false}
        userId={0}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.Vouch__main')).not.toBeNull();
  });

  it('can get a user name', async () => {
    const { getByText, rerender, container } = render(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => 'bob'}
        show="vouched"
        size="md"
        vouch={vouchItem}
        collapsed={false}
        userId={0}
      />,
    );
    expect(container.querySelector('.Vouch__name')).not.toBeNull();
    expect(await getByText('bob')).not.toBeNull();

    rerender(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => 'bob'}
        show="vouched"
        size="md"
        vouch={vouchItem}
        collapsed={false}
        userId={6174}
      />,
    );
    expect(await getByText('bob (You)')).not.toBeNull();
  });

  it('knows relationship level', async () => {
    const { getByText } = render(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => 'bob'}
        show="vouched"
        size="md"
        vouch={{ ...vouchItem, relationshipLevel: 1 }}
        collapsed={false}
        userId={6174}
      />,
    );
    expect(await getByText('I’ve worked with Evan')).not.toBeNull();
  });
  it('knows vouch score', async () => {
    const { getByText } = render(
      <Vouch
        relationshipLevelOptions={relationshipLevelOptions}
        scoreOptions={scoreOptions}
        getUserDisplayName={() => 'bob'}
        show="vouched"
        size="md"
        vouch={{ ...vouchItem, relationshipLevel: 1 }}
        collapsed={false}
        userId={6174}
      />,
    );
    expect(await getByText(scoreOptions[5])).not.toBeNull();
  });
});
