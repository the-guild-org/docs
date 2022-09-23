import { ReactElement } from 'react';
import { DEFAULT_PATH_PROPS } from '../../helpers/utils';

export const PageIcon = ({ className }: { className?: string }): ReactElement => {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5714 8.77778H9.99429C9.41143 8.77778 9 8.4 9 7.81111V4.33333M17 6.55556V19.8889C17 20.4667 16.7714 21 15.8571 21H2.14286C1.34286 21 1 20.6333 1 19.8889V2.11111C1 1.5 1.48 1 2.14286 1H11.2857L17 6.55556Z"
        {...DEFAULT_PATH_PROPS}
      />
    </svg>
  );
};
