let display = document.getElementById('display');
let current = '';
let operator = '';
let operand = '';

function updateDisplay(val) {
    display.value = val === '' ? '0' : val;
}

function getDisplayString() {
    let str = '';
    if (operand !== '') str += operand;
    if (operator !== '') str += ' ' + operator + ' ';
    if (current !== '') str += current;
    return str.trim();
}

function clearAll() {
    current = '';
    operator = '';
    operand = '';
    updateDisplay('0');
}

function deleteLast() {
    if (current.length > 0) {
        current = current.slice(0, -1);
        updateDisplay(getDisplayString() || '0');
    }
}

function percent() {
    if (current !== '') {
        current = (parseFloat(current) / 100).toString();
        updateDisplay(getDisplayString());
    }
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        if (this.id === 'ac') {
            clearAll();
        } else if (this.id === 'del') {
            deleteLast();
        } else if (value === '%') {
            percent();
        } else if (this.id === 'equals') {
            if (operator && operand !== '' && current !== '') {
                let result;
                let a = parseFloat(operand);
                let b = parseFloat(current);
                if (operator === '+') result = a + b;
                else if (operator === '-') result = a - b;
                else if (operator === '*') result = a * b;
                else if (operator === '/') result = b === 0 ? 'Error' : a / b;
                updateDisplay(result);
                current = result === 'Error' ? '' : result.toString();
                operator = '';
                operand = '';
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (current !== '') {
                operator = value;
                operand = current;
                current = '';
                updateDisplay(getDisplayString());
            } else if (operand !== '' && operator !== '') {
                operator = value; 
                updateDisplay(getDisplayString());
            }
        } else {
            if (value === '.' && current.includes('.')) return;
            if (value === '00') {
                if (current !== '' && current !== '0') {
                    current += '00';
                } else if (current === '0') {
                    current = '00';
                }
            } else {
                if (current === '0' && value !== '.') {
                    current = value;
                } else {
                    current += value;
                }
            }
            updateDisplay(getDisplayString());
        }
    });
});

clearAll();
