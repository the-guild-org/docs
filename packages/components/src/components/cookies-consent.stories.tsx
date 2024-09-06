import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CallToAction } from './call-to-action';
import { CookiesConsent, CookiesConsentProps } from './cookies-consent';

export default {
  title: 'Components/CookiesConsent',
  component: CookiesConsent,
  decorators: [
    Story => {
      const [key, setKey] = useState(0);
      const remount = () => setKey(Math.random());

      return (
        <>
          <CallToAction
            className="m-2"
            onClick={() => {
              window.localStorage.removeItem('cookies');
              remount();
            }}
            variant="secondary"
          >
            Reset Cookies Consent
          </CallToAction>
          <Story key={key} />
        </>
      );
    },
  ],
} as Meta<CookiesConsentProps>;

export const Default: StoryObj<CookiesConsentProps> = {
  name: 'CookiesConsent',
};
