export function createElement(elementType, classes, content = '') {
  const element = document.createElement(elementType);
  classes.forEach((className) => {
    element.classList.add(className);
  });
  if (content) {
    element.innerHTML = content;
  }
  return element;
}

export function createBlockWithButtons(
  blockClasses,
  buttonsContent,
  buttonsClasses
) {
  const block = this.createElement('div', blockClasses);
  const buttons = buttonsContent.map((content) =>
    this.createElement('button', buttonsClasses, content)
  );
  block.append(...buttons);
  return block;
}
