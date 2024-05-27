import './styles/index.scss';

function addNumbers() {
	const num1 = parseFloat(document.getElementById('number1').value);
	const num2 = parseFloat(document.getElementById('number2').value);
	const result = num1 + num2;
	document.getElementById('result').innerText = `Result: ${result}`;
}

document.getElementById('calculate').addEventListener('click', addNumbers);
