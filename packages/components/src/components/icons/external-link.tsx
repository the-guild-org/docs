import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils.js';

export const ExternalLinkIcon = ({ className }: { className?: string }): ReactElement => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11"
        {...DEFAULT_PATH_PROPS}
      />
      <path d="M15 3H21V9" {...DEFAULT_PATH_PROPS} />
      <path d="M10 14L21 3" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
