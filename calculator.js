let runningTotal = 0;
let buffer = "0";
let operand = 0;
let operator = null;
const screen = document.querySelector('.screen')

document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSysmbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }

}

function handleSysmbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            operator = null;
            break;
        case 'Del':
            if (buffer.length === 1) {
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (operator === null) {
                return;
            }
            runOperation(parseInt(buffer));
            operator = null;
            buffer = " " + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        runOperation(intBuffer);
    }

    operator = value;

    buffer += value;

}

function runOperation(intBuffer) {

    operand = parseInt(buffer.substr(buffer.indexOf(operator) + 1));
    // console.log("buffer " + buffer);
    // console.log("intbuffer " + intBuffer);
    // console.log("operand " + operand);
    // console.log("runningTotal " + runningTotal);
    switch (operator) {
        case '+':
            runningTotal = operand + intBuffer;
            break;
        case '-':
            runningTotal = operand - intBuffer;
            break;
        case 'x':
            runningTotal = operand * intBuffer;
            break;
        case '/':
            runningTotal = operand / intBuffer;
            break;
        default:
            break;
    }
}

function reRender() {
    screen.innerText = buffer;
}