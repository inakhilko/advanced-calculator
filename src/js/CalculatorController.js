class CalculatorController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  onReturnButtonClick() {
    const returnOperationResult = this.model.undoLastCommand();
    this.view.panelDisplayElement.innerHTML = returnOperationResult;
  }

  onOperationClick(event) {
    if (
      Number(event.target.innerHTML) ||
      event.target.innerHTML === '.' ||
      event.target.innerHTML === '0'
    ) {
      return;
    }
    this.view.displayOperation(event.target.innerHTML);

    const newSecondNumber = this.model.executeCurrentCommand(
      event.target.id,
      this.view.panelDisplayElement.innerHTML
    );

    if (this.model.isPanelToRewrite) {
      // const a = this.view.panelDisplayElement.innerHTML.split(' ');
      // a[a.length - 1] = newSecondNumber;
      // this.view.panelDisplayElement.innerHTML = a.join(' ');
      this.view.changeLastPanelNumber(newSecondNumber);
      this.model.isPanelToRewrite = false;
      return;
    }

    this.view.panelDisplayElement.innerHTML = this.model.currentValue
      ? this.model.currentValue
      : 0;
    this.view.displayOperation(event.target.innerHTML);
  }

  renderCalculator() {
    this.view.renderCalculator();
    this.view.keypad.addEventListener('click', (event) =>
      this.onOperationClick(event)
    );
    this.view.returnButton.addEventListener('click', () =>
      this.onReturnButtonClick()
    );
  }
}

export default CalculatorController;
