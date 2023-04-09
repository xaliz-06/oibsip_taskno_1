
// IMPORTANT

// Few Edge cases where the calculator fails:
// 4^(2!+√(8))+6!+(4^(2)+8!)^(8-√(6)) ; Output - NaN
// tan(90) (deg) ; Output - 16331239353195370
// cos(90) (deg) ; Output - 6.123233995736766e-17

// Special bugs or nitpicks in IEEE datatypes or how JS handles trigonometric operations
// Does'nt handle long complex equations very well as shown above
// Integer limitations on result restricts large outputs
// EXP button has no function - will lead to error. Use x to power y. Same functionality. 

// CONSTANTS
const FACTORIAL = "FACTORIAL";
const POWER = "POWER("

// BUTTONS AND THEIR PROPERTIES
let calculator_btns = [
    {
        name: "sc-rad",
        symbol: "RAD",
        formula: false,
        type: "key"
    }, 
    {
        name: "sc-deg",
        symbol: "DEG",
        formula: false,
        type: "key"
    },
    {
        name: "sc-sqrt",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "sc-sqr",
        symbol: "x²",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "sc-power-y",
        symbol: "x<sup>y</sup>",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "sc-open-p",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "sc-close-p",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "sc-pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "sc-e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "sc-cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    },
    {
        name: "sc-sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    },
    {
        name: "sc-tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    },
    {
        name: "sc-acos",
        symbol: "acos",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    },
    {
        name: "sc-asin",
        symbol: "asin",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    },
    {
        name: "sc-atan",
        symbol: "atan",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },
    {
        name: "sc-EXP",
        symbol: "EXP",
        formula: "Math.exp",
        type: "math_function"
    },
    {
        name: "sc-ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    },
    {
        name: "sc-log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    },
    {
        name: "sc-fact",
        symbol: "x!",
        formula: FACTORIAL,
        type: "math_function"
    },
    {
        name: "sc-ANS",
        symbol: "ANS",
        formula: "ans",
        type: "number"
    },
    {
        name: "main-0",
        symbol: 0,
        formula: 0,
        type: "number"
    },
    {
        name: "main-1",
        symbol: 1,
        formula: 1,
        type: "number"
    },
    {
        name: "main-2",
        symbol: 2,
        formula: 2,
        type: "number"
    },
    {
        name: "main-3",
        symbol: 3,
        formula: 3,
        type: "number"
    },
    {
        name: "main-4",
        symbol: 4,
        formula: 4,
        type: "number"
    },
    {
        name: "main-5",
        symbol: 5,
        formula: 5,
        type: "number"
    },
    {
        name: "main-6",
        symbol: 6,
        formula: 6,
        type: "number"
    },
    {
        name: "main-7",
        symbol: 7,
        formula: 7,
        type: "number"
    },
    {
        name: "main-8",
        symbol: 8,
        formula: 8,
        type: "number"
    },
    {
        name: "main-9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "main-CE",
        symbol: "CE",
        formula: false,
        type: "key"
    },
    {
        name: "main-delete",
        symbol: "DEL",
        formula: false,
        type: "key"
    },
    {
        name: "main-div",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "main-mul",
        symbol: "×",
        formula: "*",
        type: "operator"
    },
    {
        name: "main-add",
        symbol: "+",
        formula: "+",
        type: "operator"
    },
    {
        name: "main-sub",
        symbol: "-",
        formula: "-",
        type: "operator"
    },
    {
        name: "main-modulus",
        symbol: "%",
        formula: "%",
        type: "operator"
    },
    {
        name: "main-decimal",
        symbol: ".",
        formula: ".",
        type: "number"
    },
    {
        name: "main-equal",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }
]

// GLOBALS

// Array of all the buttons
const input_btns = document.querySelectorAll('.btn');
const operation_content = document.getElementById('operation-content');
const answer_content = document.getElementById('answer-content');

const operators = ['+', '-', '/', '*'];

// By default, works in RAD
let RADIAN = true;

// Object to store the array of the syntax to be shown and the internalized syntax for JS to convert to string and perform the operation. Think of a stack.
let data = {
    calc_syntax : [],
    js_syntax : []
}
let js_formula_str;
let result = 0;
let ans = 0;


// function COPY PASTE from STACKOVERFLOW. For decimal factorials.
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

input_btns.forEach(currentBtn => {
    // To add event listeners on all the buttons
    currentBtn.addEventListener('click', event => {

        // To toggle between the RAD and DEG button
        if (event.target.getAttribute('id') == 'sc-deg' || event.target.getAttribute('id') == 'sc-rad') {
            // To make sure at a time only one button is active
            if (!event.target.classList.contains('active-btn')) {
                document.querySelectorAll('*').forEach(el => {
                    el.classList.remove('active-btn');
                });
                event.target.classList.add('active-btn');
            }
            // To fix the mode
            RADIAN = (event.target.getAttribute('id') == 'sc-rad') ? true : false;
        }

        // Calling the trigger function with the specific button clicked matched with the array of buttons
        calculator_btns.forEach(button => {
            if (button['name'] == event.target.getAttribute('id')) {
                calculator(button);
            }
        });
    })
})

// Trigonometric functions
function trigo(trigFunc, angleRad) {
    if (!RADIAN) {
        // if in degrees, convert to rad
        angleRad = angleRad * (Math.PI/180);
    }
    return trigFunc(angleRad);
}
function inv_trigo(trigFunc, value) {
    let angleRad = trigFunc(value);

    if (!RADIAN) {
        angleRad = angleRad * 180/Math.PI;
    }
    return angleRad;
}

// Factorial function
function factorial(num) {
    if (num == 0 || num == 1) return 1;

    // If a decimal number
    if (num % 1 != 0) return gamma(num + 1);

    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
        if (result === Infinity) return Infinity;
    }
    return result;
}


// The Driver Function
function calculator(button) {
    // For different types of button, there's different operations
    switch (button['type']) {
        case 'operator':
            // For +, -, /, *
            data.calc_syntax.push(button.symbol);
            data.js_syntax.push(button.formula);
            break;

        case 'math_function':
            // sqr, sqrt, pow, exp, ln, log, factorial
            // Array element symbols are for representation
            // Calc syntax will be different
            let calcSymbol, jsFormula;

            if (button.name == 'sc-fact') {
                // For Factorial
                calcSymbol = '!';
                jsFormula = button.formula; // FACTORIAL

                data.calc_syntax.push(calcSymbol);
                data.js_syntax.push(jsFormula);
            } 
            else if (button.name == 'sc-power-y' || button.name == 'sc-EXP') {
                // For Power
                calcSymbol = '^(';
                jsFormula = button.formula; // POWER

                data.calc_syntax.push(calcSymbol);
                data.js_syntax.push(jsFormula);
            } 
            else if (button.name == 'sc-sqr') {
                // For SQR
                calcSymbol = '^(';
                jsFormula = button.formula; // POWER

                data.calc_syntax.push(calcSymbol);
                data.js_syntax.push(jsFormula);

                // Only difference between former and latter
                data.calc_syntax.push('2)');
                data.js_syntax.push('2)');
            }
            else {
                // For sqrt, ln, log
                // formula depends on their formula prop
                calcSymbol = button.symbol + '(';
                jsFormula = button.formula + '(';
                
                data.calc_syntax.push(calcSymbol);
                data.js_syntax.push(jsFormula);
            }
            break;

        case 'trigo_function': 
            // For trigonometric Functions
            data.calc_syntax.push(button.symbol + "(");
            data.js_syntax.push(button.formula);
            break;

        case 'number':
            // Parenthesis, Numbers, decimal, constants, ANS
            // Same as Operators
            data.calc_syntax.push(button.symbol);
            data.js_syntax.push(button.formula);
            break;

        case 'key':
            // For RAD, DEG, CE, DEL
            if (button.name == 'main-CE') {
                // Empty the stack;
                data.calc_syntax = [];
                data.js_syntax = [];

                result = 0
                showCalcResult(result);
            }
            else if (button.name == 'main-delete') {
                // Pop the last element from the stack
                data.calc_syntax.pop();
                data.js_syntax.pop();
            }
            break;

        case 'calculate': 
            // For EQUAL
            // Triggers the operation

            // Creates a str from the syntax array
            js_formula_str = data.js_syntax.join('');

            // To find the number of times POWER and FACTORIAL occur in the expresssion
            let powerOccr = search(data.js_syntax, POWER);
            let factorialOccr = search(data.js_syntax, FACTORIAL);

            // All the bases in an array
            const bases = baseOfPower(data.js_syntax, powerOccr);

            // REPLACING FOR POWER
            bases.forEach( base => {
                // For all base
                let toReplace = base + POWER;
                let replacement;

                // To fix an edge case, If the base expression has a opening bracket at the front
                if (base[0] == '(' && base[base.length - 1] != ')') {
                    base+=')';
                    replacement = 'Math.pow(' + base + ',(';
                }
                else {
                    replacement = 'Math.pow(' + base + ',';
                }

                // Replace in the formula string to make the formula work
                js_formula_str = js_formula_str.replace(toReplace, replacement);
            })

            // All the factorial numbers in an array
            // More like objects of replacements
            const factorialNumbers = factNumberCount(data.js_syntax, factorialOccr);

            // Make the replacements 
            factorialNumbers.forEach( factorial => {
                js_formula_str = js_formula_str.replace(factorial.toReplace, factorial.replacement)
            })

            // Evaluate the final string
            try {
                result = eval(js_formula_str);
            } catch (error) {
                if (error instanceof SyntaxError) {
                    result = 'Syntax Error!';
                    showCalcResult(result);
                    return;
                }
            }

            // The Ans stores the last result
            ans = result;
            data.js_syntax = [result];
            showCalcResult(result);

            break;
    }

    showCalcOperation(data.calc_syntax.join(''));
}

// General search function
function search(arr, item) {
    // Iterates over the given array and returns the array of indexes where the item was found
    let resultArr = [];
    arr.forEach( (elem, index) => {
        if (elem == item) resultArr.push(index);
    })

    return resultArr;
}

function baseOfPower(formula, resultPowerSearch) {
    // formula is the syntax array
    let resultBases = [];

    // Search for all the indexes where power was found through the array given
    resultPowerSearch.forEach(powerIndex => {
        // Since base can be a expression
        // Lets take an array and we will convert it to string after
        let base = [];

        let pCount = 0; // Parenthesis count
        let prevIndex = powerIndex - 1;

        while (prevIndex >= 0) {
            if (formula[prevIndex] == '(') pCount--;
            if (formula[prevIndex] == ')') pCount++;

            let isOperator = false;
            operators.forEach(operator => {
                // compare with all operators
                if (formula[prevIndex] == operator) isOperator = true;
            })

            let isPower = formula[prevIndex] == POWER;

            // break from the loop when we get an expression
            // The Parenthesis are closed and is an operator
            // Or there is a power
            if ((isOperator && pCount == 0) || isPower) break;

            // Push it to the front of the stack
            // Therefor, lastbase at the first
            base.unshift(formula[prevIndex]);
            prevIndex--;
        }
        // Make the base a string and push to the result array
        resultBases.push(base.join(''));
    })

    return resultBases;
}

function factNumberCount(formula, factSearchResult) {
    // formula is the js syntax array
    let numbers = [];
    let factorialSequence = 0; // To store the sequence in ehich factorials occur consecutively, if any

    factSearchResult.forEach(factIndex => {
        let number = [];

        let nextIndex = factIndex + 1;
        let nextInput = formula[nextIndex];

        // Check if the next element to the factorial index is a factorial too
        if (nextInput == FACTORIAL) {
            factorialSequence += 1;
            return;
        }

        // factorialSequence would store the no. of factorials occuring consecutively after a single factorial

        // Gets to the first factorial in sequence
        let firstFactorialIndex = factIndex - factorialSequence;

        let prevIndex = firstFactorialIndex - 1;
        let pCount = 0;

        while (prevIndex >= 0) {
            if (formula[prevIndex] == '(') pCount--;
            if (formula[prevIndex] == ')') pCount++;

            let isOperator = false;
            operators.forEach(operator => {
                if (formula[prevIndex] == operator) isOperator = true;
            })

            let isPower = formula[prevIndex] == POWER;
            if ((isOperator && pCount == 0) || isPower) break;

            // Get the expression of the number before the first factorial
            number.unshift(formula[prevIndex]);
            prevIndex--;
        }

        // Make the expression a string
        let numberStr = number.join('');
        const fact = 'factorial(';
        const closeP = ')';

        // No. of factorials
        let times = factorialSequence + 1;

        let toReplace = numberStr + FACTORIAL.repeat(times);
        let replacement = fact.repeat(times) + numberStr + closeP.repeat(times);

        // Array with all the factorial replacements
        numbers.push({
            toReplace : toReplace,
            replacement : replacement
        })

        // Reset the sequence
        factorialSequence = 0;
    })

    return numbers;
}

// To show the operation string
function showCalcOperation(calcOperationStr) {
    operation_content.innerHTML = calcOperationStr;
}
// To show the result string
function showCalcResult(calcResultStr) {
    answer_content.innerHTML = calcResultStr;
}

