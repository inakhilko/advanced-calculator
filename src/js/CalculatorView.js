import { createBlockWithButtons, createElement } from './helpers';

class CalculatorView {
  constructor() {
    this.calculatorWrapper = document.querySelector('.calculator__wrapper');
    this.defaultTheme = 'dark-theme';

    this.keypadNumbersBlockContent = [
      { content: '7', id: 7 },
      { content: '8', id: 8 },
      { content: '9', id: 9 },
      { content: '4', id: 4 },
      { content: '5', id: 5 },
      { content: '6', id: 6 },
      { content: '1', id: 1 },
      { content: '2', id: 2 },
      { content: '3', id: 3 },
      { content: '0', id: 0 },
      { content: '.', id: 10 },
    ];
    this.keypadTopContent = [
      { content: 'AC', id: 11 },
      { content: '+/-', id: 12 },
      { content: '%', id: 13 },
    ];
    this.keypadSideContent = [
      { content: '÷', id: 14 },
      { content: '×', id: 15 },
      { content: '-', id: 16 },
      { content: '+', id: 17 },
      { content: '=', id: 18 },
    ];
    this.keypadAdditionalOperationsContent = [
      { content: 'MC', id: 19 },
      { content: '√x', id: 20 },
      { content: `x<sup>2</sup>`, id: 21 },
      { content: `<sup>3</sup>√x`, id: 22 },
      { content: `x<sup>3</sup>`, id: 23 },
      { content: 'MR', id: 24 },
      { content: `<sup>n</sup>√x`, id: 25 },
      { content: `x<sup>y</sup>`, id: 26 },
      { content: 'x!', id: 27 },
      { content: `10<sup>x</sup>`, id: 28 },
      { content: 'M-', id: 29 },
      { content: 'M+', id: 30 },
      { content: '1/x', id: 31 },
    ];
    this.operationsToDisplay = ['14', '15', '16', '17', '13'];
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
    this.panelDisplayElement = calculatorPanelDisplay;
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
    keypadMainBlockNumbers.addEventListener('click', (event) =>
      this.onNumberButtonClick(event)
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
    this.keypad = keypad;
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

  onNumberButtonClick(event) {
    if (
      this.panelDisplayElement.innerText === '0' &&
      event.target.innerHTML !== '.'
    ) {
      this.panelDisplayElement.innerText = event.target.innerHTML;
      return;
    }
    if (this.panelDisplayElement.innerText.split(' ').at(-1) === '0') {
      this.changeLastPanelNumber(event.target.innerHTML);
      return;
    }
    if (
      this.panelDisplayElement.innerText.at(-1) !== '.' &&
      Number.isNaN(Number(this.panelDisplayElement.innerText.at(-1)))
    ) {
      this.panelDisplayElement.innerText = `${this.panelDisplayElement.innerText} ${event.target.innerHTML}`;
    } else {
      this.panelDisplayElement.innerText += event.target.innerHTML;
    }
  }

  displayOperation(operationElement) {
    if (this.operationsToDisplay.includes(operationElement.id)) {
      this.panelDisplayElement.innerHTML = `${this.panelDisplayElement.innerHTML} ${operationElement.innerHTML}`;
    }
    if (operationElement.id === '26') {
      this.panelDisplayElement.innerHTML = `${this.panelDisplayElement.innerHTML} ^`;
    }
    if (operationElement.id === '25') {
      this.panelDisplayElement.innerHTML = `${this.panelDisplayElement.innerHTML} √`;
    }
  }

  changeLastPanelNumber(newSecondNumber) {
    const panelValues = this.panelDisplayElement.innerHTML.split(' ');
    if (Number.isNaN(Number(panelValues.at(-1)))) {
      panelValues[panelValues.length] = newSecondNumber;
      this.panelDisplayElement.innerHTML = panelValues.join(' ');
    } else {
      panelValues[panelValues.length - 1] = newSecondNumber;
      this.panelDisplayElement.innerHTML = panelValues.join(' ');
    }
  }

  renderCalculator() {
    this.calculatorWrapper.innerHTML = '';
    this.calculatorWrapper.classList.add(this.defaultTheme);

    const generalButtonsBlock = this.createElement('div', [
      'general-buttons-block',
    ]);
    const themeButton = this.createElement(
      'button',
      ['button'],
      'Change theme'
    );
    themeButton.addEventListener('click', () => {
      this.changeTheme();
    });
    const returnButton = this.createElement(
      'button',
      ['button'],
      '<svg width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polyline points="112 160 48 224 112 288" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M64,224H358c58.76,0,106,49.33,106,108v20" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>'
    );
    this.returnButton = returnButton;
    generalButtonsBlock.append(themeButton, returnButton);

    const calculator = this.createElement('div', ['calculator']);
    const inputPanel = this.createInputPanel();
    const keypad = this.createKeypad();

    calculator.append(inputPanel, keypad);
    this.calculatorWrapper.append(generalButtonsBlock, calculator);
  }
}

export default CalculatorView;
