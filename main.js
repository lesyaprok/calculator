const input = document.getElementById('input');
const buttons = document.getElementById('buttons');
const deleteButton = document.getElementById('delete');
const info = document.getElementById('info');

document.addEventListener('keydown', keyboardListener);
buttons.addEventListener('click', buttonsListener);
input.addEventListener('input', deleteLetters);
deleteButton.addEventListener('click', () => deleteItem(input));


function keyboardListener(e) {
    // console.log(e.key);
    switch (e.key) {
        case 'Backspace':
            input.value = input.value.slice(0, -1);
            break;
        case 'Enter':
            countValue(input, info);
            break;
        case '*':
            input.value += '×';
            break;
        case '/':
            input.value += '÷';
            break;
        case '%':
            input.value += '%';
            break;
        default:
            input.value += e.key;
    }
    deleteLetters();
}

function buttonsListener(e) {
    switch (e.target.id) {
        case 'count':
            countValue(input, info);
            break;
        case 'clear':
            input.value = '';
            break;
        case 'buttons':
            break;
        default:
            addItemToInput(input, e);
    }
}

function addItemToInput(input, e) {
    // console.log(e.target)
    input.value += e.target.dataset.item;
    // input.focus();
}

function deleteLetters() {
    input.value = input.value.replace(/[^0-9%×÷+-/*()\.]/g, '')
}

function deleteItem(input) {
    input.value = input.value.slice(0, -1);
    // input.focus();
}

function countValue(input, info) {
    let string = input.value.replace(/×/g, '*').replace(/÷/g, '/');

    if (string.slice(-1) === '%') {
        countPercent(string);
    } else {

        try {
            let result = eval(string);
            if (result == 'Infinity' || result == '-Infinity') {
                input.value = '';
                info.innerText = "Division by zero is not possible";
            }
            else if (!result) info.innerText = "Enter values";
            else {
                info.innerText = string.replace(/\*/g, '×').replace(/\//g, '÷') + '=' + result;
                input.value = result;
            }
        } catch {
            // console.log('error');
            info.innerText = "Incorrect input, try again";
            input.value = '';
        }
    }
}

function countPercent(string) {
    try {
        let operator = string.slice(0, -1).match(/[*+-]/);
        let operands = string.slice(0, -1).split(/[*+-]/);
        let percent = 0;

        if (operator[0] === '*') percent = operands[0] * operands[1] / 100;
        else if (operator[0] === '+') percent = +operands[0] + +operands[0] * operands[1] / 100;
        else if (operator[0] === '-') percent = operands[0] - operands[0] * operands[1] / 100;

        input.value = percent;
        info.innerText = string.replace(/\*/g, '×').replace(/\//g, '÷') + '=' + percent;
    }
    catch {
        info.innerText = "Incorrect input, try again";
        input.value = '';
    }
}
