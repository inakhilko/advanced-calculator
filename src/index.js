import './styles/main.scss';
import CalculatorView from './js/CalculatorView';
import CalculatorModel from './js/CalculatorModel';
import CalculatorController from './js/CalculatorController';

const calculatorView = new CalculatorView();
const calculatorModel = new CalculatorModel();
const calculatorController = new CalculatorController(
  calculatorView,
  calculatorModel
);
calculatorController.renderCalculator();
