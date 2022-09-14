import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils.js';

export const ArrowUpRightIcon = ({ className }: { className?: string }): ReactElement => {
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
      <path d="M7 17L17 7" {...DEFAULT_PATH_PROPS} />
      <path d="M7 7H17V17" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
