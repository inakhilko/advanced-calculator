export function createElement(elementType, classes, content = '', id = '') {
  const element = document.createElement(elementType);
  classes.forEach((className) => {
    element.classList.add(className);
  });
  if (content) {
    element.innerHTML = content;
  }
  if (id) {
    element.id = id;
  }
  return element;
}

export function createBlockWithButtons(
  blockClasses,
  buttonsContent,
  buttonsClasses
) {
  const block = this.createElement('div', blockClasses);
  const buttons = buttonsContent.map(({ content, id }) =>
    this.createElement('button', buttonsClasses, content, id)
  );
  block.append(...buttons);
  return block;
}
