class CalculatorController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  onReturnButtonClick() {
    this.view.panelDisplayElement.innerHTML = this.model.undoLastCommand();
  }

  onOperationClick(event) {
    if (
      Number(event.target.innerHTML) ||
      event.target.innerHTML === '.' ||
      event.target.innerHTML === '0'
    ) {
      return;
    }
    const memoryCommandResult = this.model.chooseMemoryCommand(event.target.id, this.view.panelDisplayElement.innerHTML.split(' ').at(-1));

    if (memoryCommandResult === true) {
      return;
    }

    this.view.displayOperation(event.target);

    const newSecondNumber = this.model.executeCurrentCommand(
      event.target.id,
      this.view.panelDisplayElement.innerHTML.split(' ')
    );

    if (this.model.isPanelToRewrite || typeof memoryCommandResult === "number") {
      this.view.changeLastPanelNumber(newSecondNumber || memoryCommandResult);
      this.model.isPanelToRewrite = false;
      return;
    }

    this.view.panelDisplayElement.innerHTML = this.model.currentValue
      ? this.model.currentValue
      : 0;
    this.view.displayOperation(event.target);

    if(this.model.currentValue === "Error") {
      this.model.clearPanel()
    }
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
