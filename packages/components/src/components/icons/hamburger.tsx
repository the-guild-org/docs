import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils';

export const HamburgerIcon = ({ className }: { className?: string }): ReactElement => {
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
      <path d="M3 12H21" {...DEFAULT_PATH_PROPS} />
      <path d="M3 6H21" {...DEFAULT_PATH_PROPS} />
      <path d="M3 18H21" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
