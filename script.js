class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear(); // to clear the inputs and set them to default values.
    }

    clear() {

        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete() {

        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.'))
            return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '')
            return

        if (this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {

        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current))
            return

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;

            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplay(number) {

        const stringNumber = number.toString();

        const integerNumber = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerNumber))
            integerDisplay = '';
        else
            integerDisplay = integerNumber.toLocaleString('en', { maximumFractionDigits: 0 });
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`;
        } else
            return integerDisplay;
    }

    updateDisplay() {

        this.current.innerText = this.getDisplay(this.currentOperand);

        if (this.operation != null) {
            this.previous.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`;
        } else
            this.previous.innerText = '';


    }

}

const number = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const deletebutton = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-all-clear]')
const previous = document.querySelector('[data-previous-operand]')
const current = document.querySelector('[data-current-operand]')
const equals = document.querySelector('[data-equal]')

const calculator = new Calculator(previous, current);

number.forEach(button => {

    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operation.forEach(button => {

    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();

})

allClear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deletebutton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})