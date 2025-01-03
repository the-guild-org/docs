'use client';

import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { cn } from '../cn';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
  buttonId: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
  menuId: string;
  menuRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

interface DropdownProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  type: 'hover' | 'click';
}

export function Dropdown({ children, className, type, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const buttonId = useId();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleFocusElsewhere = (event: FocusEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('focus', handleFocusElsewhere);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('focus', handleFocusElsewhere);
    };
  }, [isOpen]);

  const dismissDelayMs = 200;
  const isHoveringRef = useRef(isHovering);
  isHoveringRef.current = isHovering;

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, isHovering, setIsHovering, buttonId, menuId, buttonRef, menuRef }}
    >
      <div
        className={cn('relative', className)}
        {...(type === 'hover' && {
          onPointerEnter: () => {
            setIsOpen(true);
            setIsHovering(true);
          },
          onPointerLeave: () => {
            if (isHovering) {
              setIsHovering(false);
              setTimeout(() => {
                if (!isHoveringRef.current) {
                  setIsOpen(false);
                }
              }, dismissDelayMs);
            }
          },
        })}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export function DropdownTrigger({ children, className, ...props }: DropdownTriggerProps) {
  const { isOpen, setIsOpen, buttonId, menuId, buttonRef, setIsHovering } = useDropdownContext();

  return (
    <button
      ref={buttonRef}
      id={buttonId}
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={() => {
        setIsOpen(true);
        setIsHovering(false);
      }}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface DropdownContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export function DropdownContent({ children, className, ...props }: DropdownContentProps) {
  const { isOpen, buttonId, menuId, menuRef } = useDropdownContext();

  return (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={buttonId}
      tabIndex={-1}
      className={cn(className)}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export function DropdownItem({ children, onClick, className, href, ...props }: DropdownItemProps) {
  if (href) {
    return (
      <a role="menuitem" href={href} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={className}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === 'Space') {
          onClick?.();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
