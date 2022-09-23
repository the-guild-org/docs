import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils';

export const CloseIcon = ({ className }: { className?: string }): ReactElement => {
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
      <path d="M5.63607 5.35355L18.364 18.0815" {...DEFAULT_PATH_PROPS} />
      <path d="M18.0815 5.35354L5.35358 18.0815" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
