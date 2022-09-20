import React, { ReactNode, useState } from 'react';
import { Collapse } from 'nextra-theme-docs';

export interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children, title, initiallyOpen }) => {
  const [open, setOpen] = useState(Boolean(initiallyOpen));

  return (
    <section className="bg-primary-700/5 dark:bg-primary-300/10 my-4 w-full overflow-hidden rounded-lg">
      <button
        role="button"
        onClick={() => setOpen(open => !open)}
        className="bg-primary-700/5 dark:bg-primary-300/10 flex w-full justify-between p-2 font-medium text-gray-700 dark:text-gray-200"
      >
        <span>{title}</span>
        <span className="text-gray-400 dark:text-gray-500">{open ? '-' : '+'}</span>
      </button>

      <Collapse open={open}>{children}</Collapse>
    </section>
  );
};
