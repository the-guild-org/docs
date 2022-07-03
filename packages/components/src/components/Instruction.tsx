import { ReactElement, ReactNode } from 'react';

export const Instruction = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div>
      <div
        className="
          relative
          mb-2
          h-4
          before:absolute
          before:left-[3px]
          before:h-full
          before:w-1
          before:rounded-sm
          before:bg-cyan-500
          before:content-['']
        "
      />
      <div className="flex">
        <div
          className="
            relative
            h-2.5
            w-2.5
            shrink-0
            before:absolute
            before:top-0
            before:left-0
            before:h-2.5
            before:w-2.5
            before:rounded-full
            before:bg-cyan-500
            before:content-['']
          "
        />
        <div
          className="
            relative
            pl-4
            pb-2.5
            text-cyan-500
            before:absolute
            before:bottom-0
            before:top-5
            before:left-[-7px]
            before:w-1
            before:rounded-sm
            before:bg-cyan-500
            before:content-['']
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
