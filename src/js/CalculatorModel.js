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
    this.isPanelToRewrite = false;
    this.memory = [];
  }

  get currentValue() {
    return this._currentValue;
  }

  set currentValue(value) {
    this._currentValue = value;
  }

  executeCommandWithTwoOperands(command) {
    this.currentValue = +command.execute(this.currentValue).toFixed(12);
    this.operationsHistory.push(command);
  }

  executeCommandWithOneOperand(command, currentValue) {
    const result = +command.execute(currentValue).toFixed(12);
    this.operationsHistory.push(command);
    return result;
  }

  executeMemoryCommand(command) {
    const memoryCommandResult = command.execute(this.memory);
    if (memoryCommandResult || memoryCommandResult === 0) {
      return memoryCommandResult;
    }
    return false;
  }

  undoLastCommand() {
    if (this.operationsHistory.length === 0) {
      return 0;
    }
    this.currentValue = this.operationsHistory.pop().undo(this.currentValue);
    return this.currentValue;
  }

  chooseOperation(
    displayedOperation,
    currentOperation,
    secondNumber,
    lastNumber
  ) {
    if (secondNumber === lastNumber) {
      switch (currentOperation) {
        case '11':
          this.clearPanel();
          return this.executeCommandWithTwoOperands(new ClearPanel());
        case '12':
          return this.executeCommandWithOneOperand(
            new ChangeSignCommand(),
            lastNumber
          );
        case '21':
          return this.executeCommandWithOneOperand(
            new RaiseToSecondPower(),
            lastNumber
          );
        case '23':
          return this.executeCommandWithOneOperand(
            new RaiseToThirdPower(),
            lastNumber
          );
        case '28':
          return this.executeCommandWithOneOperand(
            new RaiseTenToPower(),
            lastNumber
          );
        case '27':
          return this.executeCommandWithOneOperand(
            new GetFactorial(),
            lastNumber
          );
        case '31':
          return this.executeCommandWithOneOperand(
            new GetOnePartOfX(),
            lastNumber
          );
        case '20':
          return this.executeCommandWithOneOperand(new GetRoot(2), lastNumber);
        case '22':
          return this.executeCommandWithOneOperand(new GetRoot(3), lastNumber);
        default:
          break;
      }
    }
    switch (currentOperation) {
      case '11':
        this.clearPanel();
        return this.executeCommandWithOneOperand(new ClearPanel());

      case '12':
        return this.executeCommandWithTwoOperands(new ChangeSignCommand());

      case '21':
        return this.executeCommandWithTwoOperands(new RaiseToSecondPower());
      case '23':
        return this.executeCommandWithTwoOperands(new RaiseToThirdPower());
      case '28':
        return this.executeCommandWithTwoOperands(new RaiseTenToPower());

      case '27':
        return this.executeCommandWithTwoOperands(new GetFactorial());

      case '31':
        return this.executeCommandWithTwoOperands(new GetOnePartOfX());

      case '20':
        return this.executeCommandWithTwoOperands(new GetRoot(2));
      case '22':
        return this.executeCommandWithTwoOperands(new GetRoot(3));

      case '30':
        this.executeMemoryCommand(new SaveToMemoryCommand(lastNumber));
        return false;
      case '29':
        this.executeMemoryCommand(new RemoveFromMemoryCommand());
        return false;
      case '19':
        this.executeMemoryCommand(new ClearMemoryCommand());
        return false;
      case '24':
        return this.executeMemoryCommand(new ReadFromMemoryCommand());
      default:
        break;
    }
    if (secondNumber) {
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
    if (panelValue.split(' ').length <= 2) {
      this.currentValue = Number(panelValue.split(' ')[0]);
    }

    const operationResult = this.chooseOperation(
      panelValue.split(' ')[1],
      operation,
      Number(panelValue.split(' ')[2]),
      Number(panelValue.split(' ')[panelValue.split(' ').length - 1])
    );

    if (operationResult || operationResult === 0) {
      this.isPanelToRewrite = true;
      return operationResult;
    }
    return false;
  }

  clearPanel() {
    this.currentValue = null;
    this.operationsHistory = [];
  }
}

export default CalculatorModel;
