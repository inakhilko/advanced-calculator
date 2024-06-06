import {
  AddCommand,
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
  RemoveFromMemoryCommand,
  SaveToMemoryCommand,
  SubtractCommand,
} from './comands';

class CalculatorModel {
  constructor() {
    this._currentValue = null;
    this.operationsHistory = [];
    this.memory = [];
    this.isPanelToRewrite = false;
    this.memoryCommandResult = false
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

  executeMemoryCommand(command) {
    const memoryCommandResult = command.execute(this.memory);
    if (memoryCommandResult || memoryCommandResult === 0) {
      this.isPanelToRewrite = true;
      return memoryCommandResult;
    }
    return true;
  }

  chooseMemoryCommand(operator, lastNumber){
    if (operator !== '30' && this.memory.length === 0) {
      return true
    }
    switch (operator) {
      case '30':
        return this.executeMemoryCommand(new SaveToMemoryCommand(lastNumber));
      case '29':
        return this.executeMemoryCommand(new RemoveFromMemoryCommand());
      case '19':
        return this.executeMemoryCommand(new ClearMemoryCommand());
      case '24':
        return this.executeMemoryCommand(new ReadFromMemoryCommand());
      default:
        return true
    }
  }

  undoLastCommand() {
    if (this.operationsHistory.length === 0) {
      return 0;
    }
    this.currentValue = this.operationsHistory.pop().undo(this.currentValue).toFixed(12);
    return this.currentValue;
  }

  chooseOperation(
    displayedOperation,
    currentOperation,
    secondNumber,
    lastNumber
  ) {
    switch (currentOperation) {
      case '30':
      case '29':
      case '19':
      case '24':
        this.memoryCommandResult = this.chooseMemoryCommand(currentOperation, lastNumber)
        return false
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
