/*
Author:            Corban Pendrak
Original Release:  9/30/2023
Last Updated:      9/30/2023
Purpose:           Functional single-file calculator with simple setup and easy customization
 */

// Find added calculators
const CALCULATOR = document.querySelector(".calculator");

// Script wide variables
// Controls precision of the calculator for division
const data_precision = CALCULATOR.getAttribute('data-precision');
const PRECISION = (data_precision ? Math.pow(10, Number(data_precision)) : Math.pow(10, 5));
// Controls background color and main theme
const data_theme = CALCULATOR.getAttribute('data-theme');
const THEME_COLOR = (data_theme ? data_theme : "2F4F4FFF");

// Create HTML calculator
CALCULATOR.innerHTML = `<div class="calculator-display">0</div>\
     <div class="button-row">
            <button id="calculator-AC" class="calculator-buttons clear">AC</button>
            <button id="calculator-+/-" class="calculator-buttons posneg">+/-</button>
            <button id="calculator-%" class="calculator-buttons percent">%</button>
            <button id="calculator-/" class="calculator-buttons operator">/</button>
        </div>
        <div class="button-row">
            <button id="calculator-7" class="calculator-buttons number">7</button>
            <button id="calculator-8" class="calculator-buttons number">8</button>
            <button id="calculator-9" class="calculator-buttons number">9</button>
            <button id="calculator-*" class="calculator-buttons operator">x</button>
        </div>
        <div class="button-row">
            <button id="calculator-4" class="calculator-buttons number">4</button>
            <button id="calculator-5" class="calculator-buttons number">5</button>
            <button id="calculator-6" class="calculator-buttons number">6</button>
            <button id="calculator--" class="calculator-buttons operator">-</button>
        </div>
        <div class="button-row">
            <button id="calculator-1" class="calculator-buttons number">1</button>
            <button id="calculator-2" class="calculator-buttons number">2</button>
            <button id="calculator-3" class="calculator-buttons number">3</button>
            <button id="calculator-+" class="calculator-buttons operator">+</button>
        </div>
        <div class="button-row">
            <button id="calculator-0" class="calculator-buttons number">0</button>
            <button id="calculator-." class="calculator-buttons decimal">.</button>
            <button id="calculator-=" class="calculator-buttons equals">=</button>
        </div>
    </div>`;

// Apply CSS to the document
let style_sheet = document.createElement("style");
style_sheet.innerText = `:root {
    --theme: #${THEME_COLOR};
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;
}

.calculator {
    background-color: var(--theme);
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 300px;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
}

.calculator-display {
    background-color: var(--theme);
    filter: grayscale(.5) brightness(1.7);
    display: flex;
    padding: 0px 5px;
    font-size: 45px;
    justify-content: flex-end;
    border-radius: 10px;
    font-family: "Orbitron", monospace;
}

.button-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2px;
}

.calculator button {
    background-color: var(--theme);
    filter: brightness(1.5) grayscale(.2);
    border: 0;
    font-size: 25px;
    flex: 1;
    margin: 2px;
    border-radius: 4px;
    /* max-width: 70px; */
}

.calculator .operator, .calculator .equals {
    filter: brightness(1.5) saturate(2);
}

.calculator .clear, .calculator .posneg, .calculator .percent {
    filter: brightness(1.2) saturate(1.5);
}

.calculator button#calculator-0 {
    flex: 2.333;
}`;
document.head.appendChild(style_sheet);

// Takes string representations of numbers and operator to calculate the result of the operation
function operate(number1, operator, number2) {

    let num1 = (isNaN(number1) ? 0 : Number(number1));
    let num2 = (isNaN(number2) ? 0 : Number(number2));

    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                result = (num1 === 0 ? "Indeterminate" : "Undefined")
            }
            else {
                result = Math.round(num1 / num2 * PRECISION) / PRECISION;
            }
            break;
        default:
            result = num2;
    }
    console.log(num1 + " " + operator + " " + num2 + " = " + result)
    return result
}

// Updates every display synchronously
const DISPLAYS = document.querySelectorAll(".calculator-display");
function update_display(current_number) {
    for (let display of DISPLAYS) {
        display.innerText = current_number;
    }
}

// Adds functionality to the number buttons to connect them to the current_number variable
let current_number = ""
const NUMBERS = document.querySelectorAll(".calculator .number");
for (let number of NUMBERS) {
    number.addEventListener('click', (x) => {
        current_number = current_number + x.target.id.substring(11);
        update_display(current_number);
    })
}

// Adds functionality to the operator (+-*/) buttons that calculate the current operation before updating
let current_operator = "";
let previous_number = "";
const OPERATORS = document.querySelectorAll(".calculator .operator");
for (let operator of OPERATORS) {
    operator.addEventListener('click', (x) => {
        previous_number = (current_operator ? operate(previous_number, current_operator, current_number) : current_number)
        current_operator = x.target.id.substring(11);
        update_display(previous_number);
        current_number = "";
    })
}

// Adds functionality to the equals button which calculates the current operation
const EQUAL_BUTTONS = document.querySelectorAll(".calculator .equals");
for (let button of EQUAL_BUTTONS) {
    button.addEventListener('click', (x) => {
        current_number = operate(previous_number, current_operator, current_number);
        update_display(current_number);
        current_operator = "";
    })
}

// Adds functionality to the clear button which will either clear only the current number or the entire operation
const CLEAR_BUTTONS = document.querySelectorAll(".calculator .clear");
for (let button of CLEAR_BUTTONS) {
    button.addEventListener('click', (x) => {
        if (current_number) {
            current_number = "";
            update_display("0");
        } else {
            DISPLAYS.innerText = "0";
            current_number = current_operator = previous_number = "";
        }
    })
}

// Adds functionality to the posneg button which switches the current number between positive and negative
const POSNEG_BUTTONS = document.querySelectorAll(".calculator .posneg");
for (let button of POSNEG_BUTTONS) {
    button.addEventListener('click', (x) => {
        current_number = current_number * -1;
        update_display(current_number);
    })
}

// Adds functionality to the percent button which divides the current number by 100 while keeping the precision level
const PERCENT_BUTTONS = document.querySelectorAll(".calculator .percent");
for (let button of PERCENT_BUTTONS) {
    button.addEventListener('click', (x) => {
        current_number = Math.round(current_number / 100 * PRECISION) / PRECISION;
        update_display(current_number)
    })
}

// Adds functionality to the decimal button which deactivates if already in use
const DECIMAL_BUTTONS = document.querySelectorAll(".calculator .decimal");
for (let button of DECIMAL_BUTTONS) {
    button.addEventListener('click', (x) => {
        if (current_number.indexOf('.') === -1) {
            current_number += '.'
            update_display(current_number)
        }
    })
}

/*
TODO:
Calculator Functionality:

JavaScript Code:
    * Keyboard Support
    * Add multi-calculator functionality

Web Implementation:
 */
