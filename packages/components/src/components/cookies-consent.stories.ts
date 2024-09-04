import { Meta, StoryObj } from '@storybook/react';
import { CookiesConsent, CookiesConsentProps } from './cookies-consent';

export default {
  title: 'Components/CookiesConsent',
  component: CookiesConsent,
} as Meta<CookiesConsentProps>;

export const Default: StoryObj<CookiesConsentProps> = {
  name: 'CookiesConsent',
};
