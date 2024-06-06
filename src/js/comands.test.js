const { describe, test, expect } = require('@jest/globals');

const {
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
} = require('./comands');

describe('AddCommand',  () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(new AddCommand(2).execute(1)).toBe(3);
    expect(new AddCommand(2).execute(1)).toStrictEqual(3);
  });
  test('adds 0 + 0 to equal 0', () => {
    expect(new AddCommand(0).execute(0)).toBe(0);
    expect(new AddCommand(0).execute(0)).toStrictEqual(0);
  });
  test('adds 0 + 25 to equal 25', () => {
    expect(new AddCommand(0).execute(25)).toBe(25);
    expect(new AddCommand(0).execute(25)).toStrictEqual(25);
  });
  test('adds 0 + -25 to equal -25', () => {
    expect(new AddCommand(0).execute(-25)).toBe(-25);
    expect(new AddCommand(0).execute(-25)).toStrictEqual(-25);
  });
  test('adds -20 + -15 to equal -35', () => {
    expect(new AddCommand(-20).execute(-15)).toBe(-35);
    expect(new AddCommand(-20).execute(-15)).toStrictEqual(-35);
  });
});

describe('SubtractCommand', () => {
  test('subtracts 8 - 6 to equal 2', () => {
    expect(new SubtractCommand(6).execute(8)).toBe(2);
    expect(new SubtractCommand(6).execute(8)).toStrictEqual(2);
  });
  test('subtracts -6 - 6 to equal -12', () => {
    expect(new SubtractCommand(6).execute(-6)).toBe(-12);
    expect(new SubtractCommand(6).execute(-6)).toStrictEqual(-12);
  });
  test('subtracts -8 - -6 to equal -2', () => {
    expect(new SubtractCommand(-6).execute(-8)).toBe(-2);
    expect(new SubtractCommand(-6).execute(-8)).toStrictEqual(-2);
  });
  test('subtracts -6 - 0 to equal -6', () => {
    expect(new SubtractCommand(0).execute(-6)).toBe(-6);
    expect(new SubtractCommand(0).execute(-6)).toStrictEqual(-6);
  });
  test('subtracts 0 - 0 to equal 0', () => {
    expect(new SubtractCommand(0).execute(0)).toBe(0);
    expect(new SubtractCommand(0).execute(0)).toStrictEqual(0);
  });
  test('subtracts 0 - 6 to equal -6', () => {
    expect(new SubtractCommand(6).execute(0)).toBe(-6);
    expect(new SubtractCommand(6).execute(0)).toStrictEqual(-6);
  });
});

describe('MultiplyCommand', () => {
  test('multiplies 2 * 3 to equal 6', () => {
    expect(new MultiplyCommand(3).execute(2)).toBe(6);
    expect(new MultiplyCommand(3).execute(2)).toStrictEqual(6);
  });
  test('multiplies 2 * -3 to equal -6', () => {
    expect(new MultiplyCommand(-3).execute(2)).toBe(-6);
    expect(new MultiplyCommand(-3).execute(2)).toStrictEqual(-6);
  });
  test('multiplies -2 * -3 to equal 6', () => {
    expect(new MultiplyCommand(-3).execute(-2)).toBe(6);
    expect(new MultiplyCommand(-3).execute(-2)).toStrictEqual(6);
  });
  test('multiplies 0 * -3 to equal 0', () => {
    expect(new MultiplyCommand(-3).execute(0)).toBe(-0);
    expect(new MultiplyCommand(-3).execute(0)).toStrictEqual(-0);
  });
  test('multiplies 0 * 0 to equal 0', () => {
    expect(new MultiplyCommand(0).execute(0)).toBe(0);
    expect(new MultiplyCommand(0).execute(0)).toStrictEqual(0);
  });
});

describe('DivideCommand', () => {
  test('divides 6 / 3 to equal 2', () => {
    expect(new DivideCommand(3).execute(6)).toBe(2);
    expect(new DivideCommand(3).execute(6)).toStrictEqual(2);
  });
  test('divides 6 / -3 to equal -2', () => {
    expect(new DivideCommand(-3).execute(6)).toBe(-2);
    expect(new DivideCommand(-3).execute(6)).toStrictEqual(-2);
  });
  test('divides -6 / -3 to equal 2', () => {
    expect(new DivideCommand(-3).execute(-6)).toBe(2);
    expect(new DivideCommand(-3).execute(-6)).toStrictEqual(2);
  });
  test('divides -6 / 0 to equal 2', () => {
    expect(new DivideCommand(0).execute(-6)).toBe('Error');
    expect(new DivideCommand(0).execute(-6)).toStrictEqual('Error');
  });
  test('divides 6 / -3 to equal -2', () => {
    expect(new DivideCommand(-3).execute(6)).toBe(-2);
    expect(new DivideCommand(-3).execute(6)).toStrictEqual(-2);
  });
  test('divides 0 / 3 to equal 2', () => {
    expect(new DivideCommand(3).execute(0)).toBe(0);
    expect(new DivideCommand(3).execute(0)).toStrictEqual(0);
  });
});

describe('EqualityCommand', () => {
  test('6 to equal 6', () => {
    expect(new EqualityCommand().execute(6)).toBe(6);
    expect(new EqualityCommand().execute(6)).toStrictEqual(6);
  });
  test('-6 to equal -6', () => {
    expect(new EqualityCommand().execute(-6)).toBe(-6);
    expect(new EqualityCommand().execute(-6)).toStrictEqual(-6);
  });
  test('0 to equal 0', () => {
    expect(new EqualityCommand().execute(0)).toBe(0);
    expect(new EqualityCommand().execute(0)).toStrictEqual(0);
  });
});

describe('ChangeSignCommand', () => {
  test('changes 6 to -6', () => {
    expect(new ChangeSignCommand().execute(6)).toBe(-6);
    expect(new ChangeSignCommand().execute(6)).toStrictEqual(-6);
  });
  test('changes -6 to 6', () => {
    expect(new ChangeSignCommand().execute(-6)).toBe(6);
    expect(new ChangeSignCommand().execute(-6)).toStrictEqual(6);
  });
  test('changes 0 to -0', () => {
    expect(new ChangeSignCommand().execute(0)).toBe(-0);
    expect(new ChangeSignCommand().execute(0)).toStrictEqual(-0);
  });
});

describe('PercentageCommand', () => {
  test('5 % from 100 to equal 5', () => {
    expect(new PercentageCommand(5).execute(100)).toBe(5);
    expect(new PercentageCommand(5).execute(100)).toStrictEqual(5);
  });
  test('-5 % from 100 to equal -5', () => {
    expect(new PercentageCommand(-5).execute(100)).toBe(-5);
    expect(new PercentageCommand(-5).execute(100)).toStrictEqual(-5);
  });
  test('-5 % from -100 to equal 5', () => {
    expect(new PercentageCommand(-5).execute(-100)).toBe(5);
    expect(new PercentageCommand(-5).execute(-100)).toStrictEqual(5);
  });
  test('0 % from -100 to equal 0', () => {
    expect(new PercentageCommand(0).execute(-100)).toBe(-0);
    expect(new PercentageCommand(0).execute(-100)).toStrictEqual(-0);
  });
  test('0 % from 0 to equal 0', () => {
    expect(new PercentageCommand(0).execute(0)).toBe(0);
    expect(new PercentageCommand(0).execute(0)).toStrictEqual(0);
  });
});

describe('ClearPanel', () => {
  test('returns 0', () => {
    expect(new ClearPanel().execute()).toBe(0);
  });
});

describe('RaiseToPower', () => {
  test('raises 2 to power 4 to equal 16', () => {
    expect(new RaiseToPower(4).execute(2)).toBe(16);
    expect(new RaiseToPower(4).execute(2)).toStrictEqual(16);
  });
  test('raises -2 to power 4 to equal 16', () => {
    expect(new RaiseToPower(4).execute(-2)).toBe(16);
    expect(new RaiseToPower(4).execute(-2)).toStrictEqual(16);
  });
  test('raises -2 to power 5 to equal -32', () => {
    expect(new RaiseToPower(5).execute(-2)).toBe(-32);
    expect(new RaiseToPower(5).execute(-2)).toStrictEqual(-32);
  });
  test('raises 2 to power -2 to equal 0.25', () => {
    expect(new RaiseToPower(-2).execute(2)).toBe(0.25);
    expect(new RaiseToPower(-2).execute(2)).toStrictEqual(0.25);
  });
  test('raises 2 to power 0 to equal 1', () => {
    expect(new RaiseToPower(0).execute(2)).toBe(1);
    expect(new RaiseToPower(0).execute(2)).toStrictEqual(1);
  });
  test('raises 0 to power 5 to equal 0', () => {
    expect(new RaiseToPower(5).execute(0)).toBe(0);
    expect(new RaiseToPower(5).execute(0)).toStrictEqual(0);
  });
});

describe('RaiseToSecondPower', () => {
  test('raises 3 to power 2 to equal 9', () => {
    expect(new RaiseToSecondPower().execute(3)).toBe(9);
    expect(new RaiseToSecondPower().execute(3)).toStrictEqual(9);
  });
  test('raises -3 to power 2 to equal 9', () => {
    expect(new RaiseToSecondPower().execute(-3)).toBe(9);
    expect(new RaiseToSecondPower().execute(-3)).toStrictEqual(9);
  });
  test('raises 0 to power 2 to equal 0', () => {
    expect(new RaiseToSecondPower().execute(0)).toBe(0);
    expect(new RaiseToSecondPower().execute(0)).toStrictEqual(0);
  });
});

describe('RaiseToThirdPower', () => {
  test('raises 2 to power 3 to equal 8', () => {
    expect(new RaiseToThirdPower().execute(2)).toBe(8);
    expect(new RaiseToThirdPower().execute(2)).toStrictEqual(8);
  });
  test('raises -2 to power 3 to equal -8', () => {
    expect(new RaiseToThirdPower().execute(-2)).toBe(-8);
    expect(new RaiseToThirdPower().execute(-2)).toStrictEqual(-8);
  });
  test('raises 0 to power 3 to equal 0', () => {
    expect(new RaiseToThirdPower().execute(0)).toBe(0);
    expect(new RaiseToThirdPower().execute(0)).toStrictEqual(0);
  });
});

describe('RaiseTenToPower', () => {
  test('raises 10 to power 3 to equal 1000', () => {
    expect(new RaiseTenToPower().execute(3)).toBe(1000);
    expect(new RaiseTenToPower().execute(3)).toStrictEqual(1000);
  });
  test('raises 10 to power 0 to equal 1', () => {
    expect(new RaiseTenToPower().execute(0)).toBe(1);
    expect(new RaiseTenToPower().execute(0)).toStrictEqual(1);
  });
  test('raises 10 to power -3 to equal 0.001', () => {
    expect(new RaiseTenToPower().execute(-3)).toBe(0.001);
    expect(new RaiseTenToPower().execute(-3)).toStrictEqual(0.001);
  });
});

describe('GetRoot', () => {
  test('gets root 4 from 16 to equal 2', () => {
    expect(new GetRoot(4).execute(16)).toBe(2);
    expect(new GetRoot(4).execute(16)).toStrictEqual(2);
  });
  test('gets root 0 from 16 to equal Error', () => {
    expect(new GetRoot(0).execute(16)).toBe('Error');
    expect(new GetRoot(0).execute(16)).toStrictEqual('Error');
  });
  test('gets root 4 from -16 to equal Error', () => {
    expect(new GetRoot(0).execute(16)).toBe('Error');
    expect(new GetRoot(0).execute(16)).toStrictEqual('Error');
  });
  test('gets root 5 from -32 to equal 2', () => {
    expect(new GetRoot(5).execute(-32)).toBe(-2);
    expect(new GetRoot(5).execute(-32)).toStrictEqual(-2);
  });
  test('gets root 5 from 0 to equal 0', () => {
    expect(new GetRoot(5).execute(0)).toBe(0);
    expect(new GetRoot(5).execute(0)).toStrictEqual(0);
  });
  test('gets root -2 from 4 to equal 0.5', () => {
    expect(new GetRoot(-2).execute(4)).toBe(0.5);
    expect(new GetRoot(-2).execute(4)).toStrictEqual(0.5);
  });
  test('raises 2 to power -2 and to equal 0.25', () => {
    expect(new RaiseToPower(-2).execute(2)).toBe(0.25);
    expect(new RaiseToPower(-2).execute(2)).toStrictEqual(0.25);
  });
  test('raises 2 to power 0 and to equal 1', () => {
    expect(new RaiseToPower(0).execute(2)).toBe(1);
    expect(new RaiseToPower(0).execute(2)).toStrictEqual(1);
  });
  test('raises 0 to power 5 and to equal 0', () => {
    expect(new RaiseToPower(5).execute(0)).toBe(0);
    expect(new RaiseToPower(5).execute(0)).toStrictEqual(0);
  });
});

describe('GetFactorial', () => {
  test('equals 5! to 120', () => {
    expect(new GetFactorial().execute(5)).toBe(120);
    expect(new GetFactorial().execute(5)).toStrictEqual(120);
  });
  test('equals 0! to 1', () => {
    expect(new GetFactorial().execute(0)).toBe(1);
    expect(new GetFactorial().execute(0)).toStrictEqual(1);
  });
  test('equals 5.25! to 120', () => {
    expect(new GetFactorial().execute(5.25)).toBe(120);
    expect(new GetFactorial().execute(5.25)).toStrictEqual(120);
  });
  test('equals -5! to 120', () => {
    expect(new GetFactorial().execute(-5)).toBe('Error');
    expect(new GetFactorial().execute(-5)).toStrictEqual('Error');
  });
});

describe('GetOnePartOfX', () => {
  test('divides 1 by 5 to equal 0.2', () => {
    expect(new GetOnePartOfX().execute(5)).toBe(0.2);
    expect(new GetOnePartOfX().execute(5)).toStrictEqual(0.2);
  });
  test('divides 1 by -5 to equal -0.2', () => {
    expect(new GetOnePartOfX().execute(-5)).toBe(-0.2);
    expect(new GetOnePartOfX().execute(-5)).toStrictEqual(-0.2);
  });
  test('returns Error text when 1 is divided by 0', () => {
    expect(new GetOnePartOfX().execute(0)).toBe('Error');
    expect(new GetOnePartOfX().execute(0)).toStrictEqual('Error');
  })
});
