/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

class AddCommand {
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

class SubtractCommand {
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

class MultiplyCommand {
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

class DivideCommand {
  constructor(valueToDivideBy) {
    this.valueToDivideBy = valueToDivideBy;
  }

  execute(currentValue) {
    if (this.valueToDivideBy === 0) {
      return 'Error';
    }
    return currentValue / this.valueToDivideBy;
  }

  undo(currentValue) {
    return currentValue * this.valueToDivideBy;
  }
}

class EqualityCommand {
  execute(currentValue) {
    return currentValue;
  }

  undo(currentValue) {
    return currentValue;
  }
}

class ChangeSignCommand {
  execute(currentValue) {
    return -currentValue;
  }

  undo(currentValue) {
    return -currentValue;
  }
}

class PercentageCommand {
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

class ClearPanel {
  execute() {
    return 0;
  }

  undo() {
    return 0;
  }
}

class RaiseToPower {
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

class RaiseToSecondPower {
  execute(baseValue) {
    return new RaiseToPower(2).execute(baseValue);
  }

  undo(baseValue) {
    return new RaiseToPower(2).undo(baseValue);
  }
}

class RaiseToThirdPower {
  execute(baseValue) {
    return new RaiseToPower(3).execute(baseValue);
  }

  undo(baseValue) {
    return new RaiseToPower(3).undo(baseValue);
  }
}

class RaiseTenToPower {
  execute(currentValue) {
    return 10 ** currentValue;
  }

  undo() {
    return 10;
  }
}

class GetFactorial {
  execute(currentValue) {
    if (currentValue < 0) {
      return 'Error';
    }
    let result = 1;
    for (let i = 1; i <= +currentValue.toFixed(); i += 1) {
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

class GetRoot {
  constructor(rootValue) {
    this.rootValue = rootValue;
  }

  execute(currentValue) {
    if (
      this.rootValue === 0 ||
      (this.rootValue % 2 === 0 && currentValue < 0)
    ) {
      return 'Error';
    }
    if (currentValue < 0) {
      return -((-currentValue) ** (1 / this.rootValue));
    }
    return currentValue ** (1 / this.rootValue);
  }

  undo(currentValue) {
    if (currentValue < 0) {
      return -((-currentValue) ** this.rootValue);
    }
    return currentValue ** this.rootValue;
  }
}

class GetOnePartOfX {
  execute(currentValue) {
    if (currentValue === 0) {
      return "Error";
    }
    return 1 / currentValue;
  }

  undo(currentValue) {
    return 1 / currentValue;
  }
}

/* memory commands */
class SaveToMemoryCommand {
  constructor(currentValue) {
    this.memoriezedValue = currentValue;
  }

  execute(memory) {
    if (Number(this.memoriezedValue) || Number(this.memoriezedValue) === 0) {
      memory.push(this.memoriezedValue);
    }
  }
}

class RemoveFromMemoryCommand {
  execute(memory) {
    memory.pop();
  }
}

class ClearMemoryCommand {
  execute(memory) {
    // eslint-disable-next-line no-param-reassign
    memory.length = 0;
  }
}

class ReadFromMemoryCommand {
  execute(memory) {
    if (memory.length === 0) {
      return true
    }
    return memory.at(-1);
  }
}

module.exports = {
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  EqualityCommand,
  ChangeSignCommand,
  PercentageCommand,
  ClearPanel,
  RaiseToPower,
  RaiseToSecondPower,
  RaiseToThirdPower,
  RaiseTenToPower,
  GetRoot,
  GetFactorial,
  GetOnePartOfX,
  SaveToMemoryCommand,
  ReadFromMemoryCommand,
  ClearMemoryCommand,
  RemoveFromMemoryCommand,
};
