import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils';

export const CaretIcon = ({ className }: { className?: string }): ReactElement => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1.5 1L5 4.5L8.5 1" {...DEFAULT_PATH_PROPS} />
    </svg>
  );
};
