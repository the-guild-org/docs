import { FC, useState } from 'react';
import clsx from 'clsx';
import { isEmail } from '../helpers/email';
import { INewsletterProps } from '../types/components';
import { ArrowUpRightIcon, MailIcon } from './Icon';

export const Newsletter: FC<INewsletterProps> = ({ onNewsletterSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  return (
    <form
      className={clsx(
        'flex items-center gap-x-3 rounded-md border-2 bg-gray-100 px-3 py-2 font-default dark:bg-gray-800',
        inputError
          ? 'border-red-500 text-red-500 dark:border-red-400 dark:text-red-400'
          : 'border-gray-100 text-black dark:border-gray-800 dark:text-gray-200'
      )}
      onSubmit={e => {
        e.preventDefault();

        if (!isEmail(inputValue)) {
          setInputError(true);
          return;
        }

        if (inputError) {
          setInputError(false);
        }
        onNewsletterSubmit(e, inputValue);
      }}
    >
      <MailIcon className="w-5 text-gray-500 dark:text-gray-100" />
      <input
        required
        type="email"
        placeholder="your@email.com"
        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
        onChange={e => {
          const { value } = e.target;
          setInputValue(value);
          if (value === '') {
            setInputError(false);
          }
        }}
      />
      <button
        type="submit"
        className="
          flex-none
          rounded-md
          bg-gray-300
          py-0.5
          px-1
          transition
          hover:outline-none
          hover:invert
          dark:bg-gray-700
          lg:p-2
        "
      >
        <ArrowUpRightIcon className="w-5" />
      </button>
    </form>
  );
};
