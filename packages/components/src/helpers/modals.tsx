// Real DOM manipulation is needed for making the pages lock in scroll
export const toggleLockBodyScroll = (state: boolean): void => {
  if (typeof window !== 'undefined') {
    const body = window.document.body;

    if (body) {
      body.style.overflow = state ? 'hidden' : 'visible';
    }
  }
};
