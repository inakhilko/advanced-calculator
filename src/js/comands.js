/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

export class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue) {
    return currentValue + this.valueToAdd;
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}

export class SubtractCommand {
  constructor(valueToSubtract) {
    this.valueToSubtract = valueToSubtract;
  }

  execute(currentValue) {
    return currentValue - this.valueToSubtract;
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract;
  }
}

export class MultiplyCommand {
  constructor(valueToMultiply) {
    this.valueToMultiply = valueToMultiply;
  }

  execute(currentValue) {
    return currentValue * this.valueToMultiply;
  }

  undo(currentValue) {
    return currentValue / this.valueToMultiply;
  }
}

export class DivideCommand {
  constructor(valueToDivideBy) {
    this.valueToDivideBy = valueToDivideBy;
  }

  execute(currentValue) {
    return currentValue / this.valueToDivideBy;
  }

  undo(currentValue) {
    return currentValue * this.valueToDivideBy;
  }
}

export class EqualityCommand {
  execute(currentValue) {
    return currentValue;
  }

  undo(currentValue) {
    return currentValue;
  }
}

export class ChangeSignCommand {
  execute(currentValue) {
    return -currentValue;
  }

  undo() {
    this.currentValue = -this.currentValue;
    return this.currentValue;
  }
}

export class PercentageCommand {
  constructor(percentageValue) {
    this.percentageValue = percentageValue;
  }

  execute(currentValue) {
    return (currentValue / 100) * this.percentageValue;
  }

  undo(currentValue) {
    return +((currentValue * 100) / this.percentageValue).toFixed(12);
  }
}

export class ClearPanel {
  execute() {
    return 0;
  }

  undo() {
    return 0;
  }
}

export class RaiseToPower {
  constructor(powerValue) {
    this.powerValue = powerValue;
  }

  execute(currentValue) {
    return currentValue ** this.powerValue;
  }

  undo(currentValue) {
    return currentValue ** (1 / this.powerValue);
  }
}

export class RaiseToSecondPower {
  execute(baseValue) {
    return new RaiseToPower(2).execute(baseValue);
  }

  undo(baseValue) {
    return new RaiseToPower(2).undo(baseValue);
  }
}

export class RaiseToThirdPower {
  execute(baseValue) {
    return new RaiseToPower(3).execute(baseValue);
  }

  undo(baseValue) {
    return new RaiseToPower(3).undo(baseValue);
  }
}

export class RaiseTenToPower {
  execute(currentValue) {
    return 10 ** currentValue;
  }

  undo() {
    return 10;
  }
}

export class GetFactorial {
  constructor(factorialBase) {
    this.factorialBase = factorialBase;
  }

  execute(currentValue) {
    let result = 1;
    for (let i = 1; i <= currentValue; i += 1) {
      result *= i;
    }
    return result;
  }

  undo(currentValue) {
    let result = currentValue;
    for (let i = currentValue; i >= 0; i -= 1) {
      result /= i;
    }
    return result;
  }
}

export class GetRoot {
  constructor(rootValue) {
    this.rootValue = rootValue;
  }

  execute(currentValue) {
    return currentValue ** (1 / this.rootValue);
  }

  undo(currentValue) {
    return currentValue ** this.rootValue;
  }
}

export class GetOnePartOfX {
  execute(currentValue) {
    return 1 / currentValue;
  }

  undo(currentValue) {
    let result = 1;
    for (let i = this.powerValue; i > 0; i -= 1) {
      result /= currentValue;
    }
    return result;
  }
}

/* memory commands */
export class SaveToMemoryCommand {
  constructor(currentValue) {
    this.memoriezedValue = currentValue;
  }

  execute(memory) {
    memory.push(this.memoriezedValue);
  }
}

export class RemoveFromMemoryCommand {
  execute(memory) {
    memory.pop();
  }
}

export class ClearMemoryCommand {
  execute(memory) {
    // eslint-disable-next-line no-param-reassign
    memory.length = 0;
  }
}

export class ReadFromMemoryCommand {
  execute(memory) {
    return memory.at(-1);
  }
}