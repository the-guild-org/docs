import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils.js';

export const MailIcon = ({ className }: { className?: string }): ReactElement => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        {...DEFAULT_PATH_PROPS}
      />
      <path d="M22 6L12 13L2 6" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
