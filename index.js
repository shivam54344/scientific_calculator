const input_elem = document.querySelector('.input');
const operation_elem = document.querySelector('.operation .value');
const result_elem = document.querySelector('.result .value');

const operator = ["+", "-", "*", "/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";

let data = {
    operation: [],
    formula: [],
}

let calculator_btn = [
    {
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },

    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    
    {
        name: "square-root",
        symbol: "√",                    // alt + 0251
        formula: "Math.sqrt",
        type: "math_function"
    },

    {
        name: "square",
        symbol: "x²",                   // alt + 0179 
        formula: POWER,
        type: "math_function"
    },

    {
        name: "open-paranthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },

    {
        name: "close-paranthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },

    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },

    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },

    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "math_function"
    },

    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    },

    {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    },

    {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    },

    {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    },

    {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    },

    {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },

    {
        name: "division",
        symbol: "÷",            // alt + 0247
        formula: "/",
        type: "operator"
    },

    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },

    {
        name: "acos",
        symbol: "acos",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    },

    {
        name: "asin",
        symbol: "asin",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    },

    {
        name: "atan",
        symbol: "atan",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },

    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    },

    {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    },

    {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    },

    {
        name: "multiplication",
        symbol: "X",
        formula: "*",
        type: "operator"
    },

    {
        name: "factorial",
        symbol: "x!",
        formula: FACTORIAL,
        type: "math_function"
    },

    {
        name: "exp",
        symbol: "exp",
        formula: "Math.exp",
        type: "math_function"
    },

    {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    },

    {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    },

    {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    },

    {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    },

    {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    },

    {
        name: "subtraction",
        symbol: "-",
        formula: "-",
        type: "operator"
    },

    {
        name: "power",
        symbol: "^",
        formula: POWER,
        type: "math_function"
    },

    {
        name: "ANS",
        symbol: "Ans",
        formula: "ans",
        type: "number"
    },

    {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    },

    {
        name: "comma",
        symbol: ".",
        formula: ".",
        type: "number"
    },

    {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    },

    {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    },


    {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    },

]

// GAMMA FUNCTINON
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


// Display calculator buttons

const cal_btn_display = () => {
    let btn_per_row = 8;
    added_btn = 0

    calculator_btn.forEach((btn) => {
        if (added_btn % btn_per_row === 0) {
            input_elem.innerHTML += `<div class="row"></div>`
        }

        const row = document.querySelector('.row:last-child')
        row.innerHTML += `<button id="${btn.name}">${btn.symbol}</button>`
        added_btn++;
    })
}

cal_btn_display();

// Adding clicking events to button
let Radian = true
const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

// adding new class to rad & deg buttons

rad_btn.classList.add("active-angle");

const angle_toggler = () => {
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}


input_elem.addEventListener('click', e => {
    const target_btn = e.target
    
    calculator_btn.forEach((btn) => {
        if (btn.name === target_btn.id) {
            cal_btn_fun(btn)
        }
    })
})

const cal_btn_fun = (btn) => {
    if (btn.type === "number") {
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula);
    }

    else if (btn.type === "operator") {
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula)
    }

    else if (btn.type === "math_function") {
        if (btn.name === "factorial") {
            let symbol = "!";
            let formula = btn.formula
            data.operation.push(symbol);
            data.formula.push(formula);
        }

        else if (btn.name === "power") {
            let symbol = "^("
            let formula = btn.formula
            data.operation.push(symbol);
            data.formula.push(formula)
        }
            
        else if (btn.name === "square") {
            let symbol = "^("
            let formula = btn.formula
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        }

        else if (btn.name === "pi") {
            data.operation.push(btn.symbol);
            data.formula.push(btn.formula)
        }

        else {
            let symbol = btn.symbol + "(";
            let formula = btn.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    }

    else if (btn.type === "trigo_function") {
        let symbol = btn.symbol + "(";
        let formula = btn.formula
        data.operation.push(symbol);
        data.formula.push(formula);
    }

    else if (btn.type === "key") {
        if (btn.name === "delete") {
            data.operation.pop();
            data.formula.pop();
        }

        else if (btn.name === "clear") {
            data.operation = []
            data.formula = []
            
            update_result_output(0)
        } 

        else if (btn.name === "rad") {
            Radian = true
            angle_toggler();
        }

        else if (btn.name === "deg") {
            Radian = false
            angle_toggler();
        }
    }

    else if (btn.type === "calculate") {
        let formula_str = data.formula.join('');
        console.log(formula_str);
        let power_search = search(data.formula, POWER);
        let factorial_search = search(data.formula, FACTORIAL);

        // Calculating power operations

        let power_bases = power_get_base(data.formula, power_search);
        power_bases.forEach((elem) => {
            let toReplace = elem + POWER;
            let replacement = "Math.pow(" + elem + ",";
            formula_str = formula_str.replace(toReplace, replacement);
        });

        let fact_numbers = fact_get_num(data.formula, factorial_search);
        fact_numbers.forEach((elem) => {
            formula_str = formula_str.replace(elem.ToReplace, elem.Replacement)
        });
        
        let res;
        try {
            res = eval(formula_str);
        } catch (error) {
            if (error instanceof SyntaxError) {
                res = "Syntax Error";
                update_result_output(res);
                return;
            }
        }

        //Saving for later use
        ans = res;
        data.operation = [ res ];
        data.formula = [ res ]
        update_result_output(res)
        return;
    }
    
    update_operation_output(data.operation.join(''))
    
}

const update_operation_output = (operation) => {
    operation_elem.innerHTML = operation;
}

const update_result_output = (result) => {
    result_elem.innerHTML = result;
}

const trigo = (callback, angle) => {
    if (!Radian) {
        angle = angle * Math.PI/180
    }

    return callback(angle)
}

const inv_trigo = (callback, value) => {
    let angle = callback(value)
    if (!Radian) {
        angle = angle * 180/Math.PI
    }

    return angle;
}

const factorial = (num) => {
    if (num === 0 || num === 1) {
        return 1
    }

    if (num % 1 !== 0) {
        return gamma(num + 1)
    }

    let result = 1

    for (let i = 1; i <= num; i++){
        result = result * i

        if (result === Infinity) {
            return Infinity;
        }
    }

    return result;
}

// Power & factorial search fuctions

const search = (arr, keyword) => {
    let srh_res = [];

    arr.forEach((elem, ind) => {
        if (elem == keyword) {
            srh_res.push(ind)
        }
    })

    return srh_res;
}

const power_get_base = (formula_arr, power_ind_arr) => {
    let power_base = [];
    
    power_ind_arr.forEach((power_elem) => {
        let base = [];
        let paranthesis_cnt = 0;
        let prev_ind = power_elem - 1;

        while (prev_ind >= 0) {
            if (formula_arr[prev_ind] === "(") paranthesis_cnt--;
            if (formula_arr[prev_ind] === ")") paranthesis_cnt++;

            let is_operator = false;
            operator.forEach((op_elem) => {
                if (formula_arr[prev_ind] === op_elem) is_operator = true;
            });

            if (is_operator && paranthesis_cnt === 0) break;

            base.unshift(formula_arr[prev_ind]);
            prev_ind--;
        }

        power_base.push(base.join(''));
    })

    return power_base;
}

const fact_get_num = (formula_arr, fact_ind_arr) => {
    let num = [];
    let fact_sequence = 0
    fact_ind_arr.forEach((fact_elem) => {
        let curr_num = [];
        let next_ind = fact_elem + 1;
        let next_inp = formula_arr[next_ind];

        if (next_inp === FACTORIAL) {
            fact_sequence += 1;
            return;
        }

        let first_fact_ind = fact_elem - fact_sequence; // factorial before second factorial
        let prev_ind = first_fact_ind - 1; // Number before first factorial
        let paranthesis_cnt = 0;

        while (prev_ind >= 0) {
            if (formula_arr[prev_ind] === "(") paranthesis_cnt--;
            if (formula_arr[prev_ind] === ")") paranthesis_cnt++;

            let is_operator = false;
            operator.forEach((op_elem) => {
                if (formula_arr[prev_ind] === op_elem) is_operator = true;
            });

            if (is_operator && paranthesis_cnt === 0) break;

            curr_num.unshift(formula_arr[prev_ind]);
            prev_ind--;
        }

        // num.push(curr_num.join(''));
        let num_str = curr_num.join('');
        const facto = "factorial(", close_paren = ")"
        let times = fact_sequence + 1;

        let toReplace = num_str + FACTORIAL.repeat(times);
        let replacement = facto.repeat(times) + num_str + close_paren.repeat(times);


        num.push({
            ToReplace: toReplace,
            Replacement: replacement
        })
        fact_sequence = 0;
    });

    return num;
}