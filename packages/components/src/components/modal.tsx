import { ReactElement, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import clsx from 'clsx';
import NextImage from 'next/future/image';
import { IModalProps } from '../types/components';
import { useKeyPress } from '../helpers/hooks';
import { CloseIcon, ExternalLinkIcon } from './icons';

export const Modal = ({
  image,
  title,
  description,
  children,
  visible,
  placement,
  onCancel,
  className,
}: IModalProps): ReactElement => {
  const escapePress = useKeyPress('Escape');

  const renderDescription = () => {
    if (!description) {
      return;
    }

    return typeof description === 'object' ? (
      <a className="inline-flex gap-x-1.5 transition hover:opacity-60" {...description}>
        <p className="line-clamp-1">{description.children}</p>
        <ExternalLinkIcon className="h-4 w-4 shrink-0" />
      </a>
    ) : (
      <p className="line-clamp-1">{description}</p>
    );
  };

  useEffect(() => {
    if (visible && escapePress) {
      onCancel();
    }
  }, [visible, escapePress, onCancel]);

  return (
    <div className={clsx('fixed inset-0 z-[50] backdrop-blur-sm', !visible && 'hidden', className)}>
      <div className="h-full w-full bg-gray-900 opacity-40 dark:bg-gray-500" onClick={() => onCancel()} />
      <FocusTrap
        active={visible}
        focusTrapOptions={{
          fallbackFocus: '#tgc-modal',
          clickOutsideDeactivates: true,
        }}
      >
        <div
          className={clsx(
            `
            absolute
            inset-0
            flex
            h-full
            w-full
            max-w-none
            flex-col
            bg-white
            dark:bg-[#111]
            md:max-h-[80%]
            md:-translate-x-1/2
            md:rounded-md
          `,
            (placement === 'top' || placement === 'center') &&
              'md:left-1/2 md:right-auto md:bottom-auto md:h-auto md:max-w-3xl',
            {
              top: 'md:top-10 md:-translate-y-0',
              center: 'md:top-1/2 md:-translate-y-1/2',
              bottom: 'md:top-1/2 md:left-1/2 md:bottom-0 md:h-5/6 md:max-w-3xl md:-translate-y-1/2',
            }[placement]
          )}
          id="tgc-modal"
        >
          <div
            className="
              flex
              items-center
              gap-x-2
              border-b
              border-gray-200
              p-6
              dark:border-gray-700
              md:gap-x-4
            "
          >
            {image && <NextImage {...image} className={clsx('w-10 md:w-16', image.className)} />}
            <div>
              <h2 className="m-0 text-lg font-semibold text-black dark:text-gray-100 md:text-xl">{title}</h2>
              <p className="m-0 text-xs text-gray-500 dark:text-gray-100">{renderDescription()}</p>
            </div>
            <button
              onClick={() => onCancel()}
              className="
                ml-auto
                self-start
                rounded-lg
                border-2
                border-transparent
                bg-gray-200
                p-1.5
                text-gray-500
                outline-none
                transition
                hover:border-gray-500
                focus:ring
                dark:bg-gray-700
                dark:text-gray-200
              "
            >
              <CloseIcon />
            </button>
          </div>
          <div className="overflow-y-scroll p-6 text-black dark:text-gray-300">{children}</div>
        </div>
      </FocusTrap>
    </div>
  );
};
