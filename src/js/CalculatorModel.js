import {
  AddCommand, AddToMemoryCommand,
  ChangeSignCommand,
  ClearMemoryCommand,
  ClearPanel,
  DivideCommand,
  EqualityCommand,
  GetFactorial,
  GetOnePartOfX,
  GetRoot,
  MultiplyCommand,
  PercentageCommand,
  RaiseTenToPower,
  RaiseToPower,
  RaiseToSecondPower,
  RaiseToThirdPower,
  ReadFromMemoryCommand,
  SubtractCommand, SubtractFromMemoryCommand,
} from './comands';

class CalculatorModel {
  constructor() {
    this._currentValue = null;
    this.operationsHistory = [];
    this.memory = null;
    this.isPanelToRewrite = false;
    this.isMemoryOperationDone = false
  }

  get currentValue() {
    return this._currentValue;
  }

  set currentValue(value) {
    this._currentValue = value;
  }

  executeCommandWithTwoOperands(command) {
    const commandResult = command.execute(this.currentValue);
    if (typeof commandResult === 'string') {
      this.currentValue = commandResult;
      return;
    }
    this.currentValue = +command.execute(this.currentValue).toFixed(12);
    this.operationsHistory.push(command);
  }

  chooseCommandExecutorForCurrentOperation(
    operator,
    secondNumber,
    lastNumber,
    command
  ) {
    if (operator === '11' && secondNumber === lastNumber) {
      return this.executeCommandWithTwoOperands(command);
    }
    if (operator === '11' || secondNumber === lastNumber) {
      return +command.execute(lastNumber).toFixed(12);
    }
    return this.executeCommandWithTwoOperands(command);
  }

  executeMemoryCommand(command, lastNumber) {
    this.memory = command.execute(Number(lastNumber));
    return this.memory;
  }

  chooseMemoryCommand(operator, lastNumber){
    switch (operator) {
      case '30':
        this.executeMemoryCommand(new AddToMemoryCommand(this.memory), lastNumber);
        return true;
      case '29':
         this.executeMemoryCommand(new SubtractFromMemoryCommand(this.memory), lastNumber);
        return true;
      case '19':
        this.executeMemoryCommand(new ClearMemoryCommand(), lastNumber);
        return true;
      case '24':
        return this.executeMemoryCommand(new ReadFromMemoryCommand(this.memory), lastNumber) ?? true;
      default:
        return false;
    }
  }

  undoLastCommand() {
    if (this.operationsHistory.length === 0) {
      return 0;
    }
    this.currentValue = +this.operationsHistory.pop().undo(this.currentValue).toFixed(12);
    return this.currentValue;
  }

  chooseOperation(
    displayedOperation,
    currentOperation,
    secondNumber,
    lastNumber
  ) {
    switch (currentOperation) {
      case '11':
        this.clearPanel();
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new ClearPanel()
        );

      case '12':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new ChangeSignCommand()
        );

      case '21':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new RaiseToSecondPower()
        );
      case '23':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new RaiseToThirdPower()
        );
      case '28':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new RaiseTenToPower()
        );

      case '27':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new GetFactorial()
        );

      case '31':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new GetOnePartOfX()
        );

      case '20':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new GetRoot(2)
        );
      case '22':
        return this.chooseCommandExecutorForCurrentOperation(
          currentOperation,
          secondNumber,
          lastNumber,
          new GetRoot(3)
        );
      default:
        break;
    }
    if (!Number.isNaN(secondNumber)) {
      switch (displayedOperation) {
        case '+':
          this.executeCommandWithTwoOperands(new AddCommand(secondNumber));
          break;
        case '-':
          this.executeCommandWithTwoOperands(new SubtractCommand(secondNumber));
          break;
        case '×':
          this.executeCommandWithTwoOperands(new MultiplyCommand(secondNumber));
          break;
        case '÷':
          this.executeCommandWithTwoOperands(new DivideCommand(secondNumber));
          break;
        case '=':
          this.executeCommandWithTwoOperands(new EqualityCommand());
          break;
        case '%':
          this.executeCommandWithTwoOperands(
            new PercentageCommand(secondNumber)
          );
          break;
        case `^`:
          this.executeCommandWithTwoOperands(new RaiseToPower(secondNumber));
          break;
        case `√`:
          this.executeCommandWithTwoOperands(new GetRoot(secondNumber));
          break;
        default:
          break;
      }
    }
    return false;
  }

  executeCurrentCommand(operation, panelValue) {
    if (panelValue.length <= 2) {
      this.currentValue = Number(panelValue[0]);
    }

    const operationResult = this.chooseOperation(
      panelValue[1],
      operation,
      Number(panelValue[2]),
      Number(panelValue[panelValue.length - 1])
    );

    if (operationResult) {
      this.isPanelToRewrite = true;
    }
    return operationResult;
  }

  clearPanel() {
    this.currentValue = null;
    this.operationsHistory = [];
  }
}

export default CalculatorModel;
