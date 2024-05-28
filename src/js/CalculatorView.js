import { createBlockWithButtons, createElement } from './helpers';

class CalculatorView {
  constructor() {
    this.calculatorWrapper = document.querySelector('.calculator__wrapper');
    this.defaultTheme = 'dark-theme';

    this.keypadTopContent = ['AC', '+/-', '%'];
    this.keypadSideContent = ['÷', '×', '-', '+', '='];
    this.keypadNumbersBlockContent = [
      '7',
      '8',
      '9',
      '4',
      '5',
      '6',
      '1',
      '2',
      '3',
      '0',
      '.',
    ];
    this.keypadAdditionalOperationsContent = [
      'MC',
      '√x',
      'x²',
      '³√x',
      'x³',
      'MR',
      'ⁿ√x',
      'xʸ',
      'x!',
      '10ˣ',
      'M-',
      'M+',
      '1/x',
    ];
    this.createElement = createElement;
    this.createKeypadBlock = createBlockWithButtons;
  }

  createControls() {
    const controls = this.createElement('div', ['controls']);
    const controlsExit = this.createElement('button', [
      'control',
      'control__exit',
    ]);
    const controlsMinimize = this.createElement('button', [
      'control',
      'control__minimize',
    ]);
    const controlsMaximize = this.createElement('button', [
      'control',
      'control__maximize',
    ]);
    controls.append(controlsExit, controlsMinimize, controlsMaximize);
    return controls;
  }

  createInputPanel() {
    const inputPanel = this.createElement('div', ['calculator__panel']);
    const controls = this.createControls();
    const calculatorPanelDisplay = this.createElement('p', [
      'calculator__panel-display',
    ]);
    calculatorPanelDisplay.innerText = '0';
    inputPanel.append(controls, calculatorPanelDisplay);
    return inputPanel;
  }

  createKeypad() {
    const keypad = this.createElement('div', ['keypad']);

    const keypadAdditionalOperationsBlock = this.createKeypadBlock(
      ['keypad__additional-operations'],
      this.keypadAdditionalOperationsContent,
      ['keypad__button', 'keypad__button--top', 'keypad__button--additional']
    );

    const keypadMainBlock = this.createElement('div', ['keypad__main-block']);
    const keypadMainBlockOperations = this.createKeypadBlock(
      ['keypad__main-block-operations'],
      this.keypadTopContent,
      ['keypad__button', 'keypad__button--top']
    );
    const keypadMainBlockNumbers = this.createKeypadBlock(
      ['keypad__main-block-numbers'],
      this.keypadNumbersBlockContent,
      ['keypad__button', 'keypad__button--numbers']
    );
    keypadMainBlock.append(keypadMainBlockOperations, keypadMainBlockNumbers);

    const keypadSideBlock = this.createKeypadBlock(
      ['keypad__side-block'],
      this.keypadSideContent,
      ['keypad__button', 'keypad__button--side']
    );

    keypad.append(
      keypadAdditionalOperationsBlock,
      keypadMainBlock,
      keypadSideBlock
    );
    return keypad;
  }

  changeTheme() {
    if (this.calculatorWrapper.classList.contains('dark-theme')) {
      this.calculatorWrapper.classList.remove('dark-theme');
      this.calculatorWrapper.classList.add('light-theme');
    } else {
      this.calculatorWrapper.classList.remove('light-theme');
      this.calculatorWrapper.classList.add('dark-theme');
    }
  }

  renderCalculator() {
    this.calculatorWrapper.innerHTML = '';
    this.calculatorWrapper.classList.add(this.defaultTheme);
    const themeButton = this.createElement(
      'button',
      ['theme-button'],
      'Change theme'
    );
    themeButton.addEventListener('click', () => {
      this.changeTheme();
    });
    const calculator = this.createElement('div', ['calculator']);
    const inputPanel = this.createInputPanel();
    const keypad = this.createKeypad();

    calculator.append(inputPanel, keypad);
    this.calculatorWrapper.append(themeButton, calculator);
  }
}

export default CalculatorView;
