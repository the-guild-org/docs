// Real DOM manipulation is needed for making the pages lock in scroll
export const toggleLockBodyScroll = (state: boolean): void => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = state ? 'hidden' : 'visible';
  }
};
