/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Cookies from 'js-cookie';
import { fireEvent, render } from '@testing-library/react';
import { CookieConsent } from '../index';

describe('<CookieConsent  />', () => {
  let props = {};
  beforeEach(() => {
    props = {
      setShowCookieModal: jest.fn(),
      showCookieModal: false,
      cookiePolicyPage: { url: 'https://getro.com/' },
      necessaryCookies: {
        isInitOpen: false,
        items: [
          { name: 'Woopra', checked: true, cookieName: [''] },
          { name: 'hotjar', checked: true, cookieName: [''] },
          { name: 'Segment', checked: true, cookieName: [''] },
          { name: 'Google Analytics', checked: true, cookieName: [''] },
          { name: 'Keen', checked: true, cookieName: [''] },
        ],
      },
    };
  });

  it('should mount if no cookie', () => {
    const { container, getByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(getByTestId('cookie-consent')).not.toBeNull();
  });

  it('should open the details modal when clicked', () => {
    const { container, getByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(getByTestId('cookie-consent')).not.toBeNull();
    const modalTrigger = getByTestId('cookie-details');
    expect(modalTrigger).not.toBeNull();
    fireEvent.click(modalTrigger);
    expect(props.setShowCookieModal).toHaveBeenCalledTimes(1);
  });

  it("won't show if no cookies", () => {
    props.necessaryCookies = { items: [] };
    const { container, queryByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('cookie-consent')).toBeNull();
  });

  it('should create a cookie when modal terms accepted', () => {
    props.showCookieModal = true;
    const setCookie = jest.fn();
    Cookies.set = setCookie;
    const { container, queryByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('cookie-consent')).not.toBeNull();
    const acceptAll = queryByTestId('accept-all');
    expect(acceptAll).not.toBeNull();
    fireEvent.click(acceptAll);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(queryByTestId(' cookie-consent')).toBeNull();
  });

  it('should create a cookie when terms accepted', () => {
    const setCookie = jest.fn();
    Cookies.set = setCookie;
    const { container, queryByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('cookie-consent')).not.toBeNull();
    const acceptCookie = queryByTestId('accept-cookies');
    expect(acceptCookie).not.toBeNull();
    fireEvent.click(acceptCookie);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(queryByTestId(' cookie-consent')).toBeNull();
  });

  it('should not mount if cookies accepted', () => {
    Cookies.get = jest.fn().mockImplementation(() => true);
    const { container, queryByTestId } = render(<CookieConsent {...props} />);
    expect(container).not.toBeNull();
    expect(queryByTestId('cookie-consent')).toBeNull();
  });
});
