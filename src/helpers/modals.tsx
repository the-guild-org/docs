
// Real DOM manipulation is needed for making the pages
// unscrollable, while a modal is open
export const toggleBodyModalClass = (state: boolean) => {
  const body = window.document.body;
  const className = 'tg-modal-open';

  if (body) {
    body.classList.toggle(className, state);
  }
}