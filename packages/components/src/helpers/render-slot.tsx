import { cloneElement } from 'react';
import { cn } from '../cn';

export function renderSlot<TProps extends object>(
  Slot: React.ReactNode | ((props: TProps) => React.ReactNode),
  props: Partial<TProps>,
): React.ReactNode {
  if (typeof Slot === 'function') {
    return <Slot {...(props as TProps)} />;
  }

  if (!(typeof Slot === 'object' && Slot && 'props' in Slot)) {
    return null;
  }

  if ('className' in props) {
    props = {
      ...props,
      className: cn(Slot.props.className, props.className as string),
    };

    return cloneElement(Slot, props);
  }
}
