import React, { useState } from 'react';

import { Form } from './Newsletter.styles';
import { useThemeContext } from '../helpers/theme';
import { newsletterThemedIcons } from '../helpers/assets';
import { isEmail } from '../helpers/email';
import { INewsletterProps } from '../types/components';

export const Newsletter: React.FC<INewsletterProps> = ({
  onNewsletterSubmit,
}) => {
  const { isDarkTheme } = useThemeContext();
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const icons = newsletterThemedIcons(isDarkTheme || false);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        if (!isEmail(inputValue)) {
          setInputError(true);
          return;
        }

        inputError && setInputError(false);
        onNewsletterSubmit(e, inputValue);
      }}
      hasError={inputError}
    >
      <span>
        <img src={icons.mail} alt="mail icon" height="20" width="20" />
      </span>
      <input
        required
        type="email"
        placeholder="your@email.com"
        onChange={(e) => {
          setInputValue(e.target.value);
          e.target.value === '' && setInputError(false);
        }}
      />
      <button type="submit">
        <img src={icons.arrow} alt="arrow icon" height="20" width="20" />
      </button>
    </Form>
  );
};
