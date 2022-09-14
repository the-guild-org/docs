import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils.js';

export const HashTagIcon = ({ className }: { className?: string }): ReactElement => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.2857 15.2857H21H15.2857ZM15.2857 15.2857V8.14286H6.71429V15.2857H15.2857ZM15.2857 15.2857V21V15.2857ZM15.2857 15.2857H6.71429V8.14286H1H6.71429V1V8.14286H15.2857V1V8.14286H21H15.2857V15.2857ZM6.71429 15.2857V21V15.2857ZM6.71429 15.2857H1H6.71429Z"
        {...DEFAULT_PATH_PROPS}
      />
    </svg>
  );
};
