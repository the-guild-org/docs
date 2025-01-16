'use client';

import { cn } from '../cn';
import { CallToAction, CallToActionProps } from './call-to-action';

const openCrisp = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:open']);
    event.preventDefault();
  }
};

export interface ContactTextLinkProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  children?: React.ReactNode;
}

export function ContactTextLink(props: ContactTextLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        'hive-focus -m-2 rounded p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100',
        props.className,
      )}
      href="https://the-guild.dev/contact"
      onClick={openCrisp}
    >
      {props.children || 'Contact Us'}
    </a>
  );
}

export interface ContactButtonProps
  extends Omit<CallToActionProps.AnchorProps, 'onClick' | 'href' | 'children'> {
  children?: React.ReactNode;
}

export function ContactButton(props: ContactButtonProps) {
  return (
    <CallToAction href="https://the-guild.dev/contact" onClick={openCrisp} {...props}>
      {props.children || 'Contact Us'}
    </CallToAction>
  );
}
