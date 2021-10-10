// Minsuk Lee, ykhl1itj@gmail.com

const PRECISION = 15;
var initial_val = "", op = "", answer = "88";
var done = true, float_num = false, second_num = false, completed = false ;
var temp, display;

window.onload = function() {
	var elements = document.body.getElementsByTagName("*");
	for (var i = 0; i < elements.length; i++) {
		switch (elements[i].id) {
			case "zero": 
				elements[i].addEventListener("click", function() { number("0"); });
				break;
			case "one": 
				elements[i].addEventListener("click", function() { number("1"); });
				break;
			case "two": 
				elements[i].addEventListener("click", function() { number("2"); });
				break;
			case "three": 
				elements[i].addEventListener("click", function() { number("3"); });
				break;
			case "four": 
				elements[i].addEventListener("click", function() { number("4"); });
				break;
			case "five": 
				elements[i].addEventListener("click", function() { number("5"); });
				break;
			case "six": 
				elements[i].addEventListener("click", function() { number("6"); });
				break;
			case "seven": 
				elements[i].addEventListener("click", function() { number("7"); });
				break;
			case "eight": 
				elements[i].addEventListener("click", function() { number("8"); });
				break;
			case "nine": 
				elements[i].addEventListener("click", function() { number("9"); });
				break;
			case "point":
				elements[i].addEventListener("click", point);
				break;
			case "sign":
				elements[i].addEventListener("click", sign);
				break;
			case "delete":
				elements[i].addEventListener("click", del);
				break;

			case "log":
				elements[i].addEventListener("click", log);
				break;
			case "power2":
				elements[i].addEventListener("click", power2);
				break;
			case "powery":
				elements[i].addEventListener("click", powery);
				break;
			case "sqrt":
				elements[i].addEventListener("click", sqrt);
				break;
			case "factorial":
				elements[i].addEventListener("click", factorial);
				break;
			case "fraction":
				elements[i].addEventListener("click", fraction);
				break;
			case "hexa":
				elements[i].addEventListener("click", hexa);
				break;
			case "tax88":
				elements[i].addEventListener("click", tax88);
				break;
			case "tax33":
				elements[i].addEventListener("click", tax33);
				break;
			case "add":
				elements[i].addEventListener("click", function() { basic("+"); });
				break;
			case "sub":
				elements[i].addEventListener("click", function() { basic("-"); });
				break;
			case "mul":
				elements[i].addEventListener("click", function() { basic("*"); });
				break;
			case "div":
				elements[i].addEventListener("click", function() { basic("/"); });
				break;
			case "equal":
				elements[i].addEventListener("click", equal);
				break;
			case "clear":
				elements[i].addEventListener("click", function() { reset("0");});
				break;
			default:
				break;
		}
	}
}

function number(input) {
	display = document.getElementById("lcd");
	temp = display.value;
	
	if (display.value.match(/[a-z]/i))
		display.value = "0";
	
	if (second_num) {
		display.value = "0";
		second_num = false;
	}
	
	if (display.value == "0")
		temp = input;
	else {
		if (temp.length < PRECISION)
			temp += input;
	}
	display.value = temp;
	completed = true;
	toExp();
}

function point() {
	display = document.getElementById("lcd");
	temp = display.value;
	if (display.value.match(/[a-z]/i))
		display.value = "0";
	if (!float_num) {
		temp += ".";
		display.value = temp;
		completed = false;
		float_num = true;
	}
}

function sign() {
	display = document.getElementById("lcd");
	if (display.value != "0") {
		if (display.value[0] == "-")
			display.value = display.value.substr(1, display.value.length);
		else
			display.value = "-" + display.value; 
	}
	answer = display.value;
	toExp();
}

function del() {
	display = document.getElementById("lcd");
	if ((display.value.length <= 1) || display.value.match(/[a-z]/i)) {
		display.value = "0";
		float_num = false;
	}
	else  {
		if (display.value.substr(display.value.length - 1) == ".")
			float_num = false;
		display.value = display.value.substr(0, display.value.length-1);		
	}
	answer = display.value;
	toExp();
}

/* Unary Operations */

function log() {
	display = document.getElementById("lcd");
	answer = Math.log(display.value) / Math.LN10;
	answer = (answer * 1).toString();
	reset(answer);
}

function power2() {
	display = document.getElementById("lcd");
	answer = Math.pow(display.value, 2);
	answer = (answer*1).toString();
	reset(answer);
}

function sqrt() {
	display = document.getElementById("lcd");
	answer = Math.sqrt(display.value);
	answer = (answer*1).toString();
	reset(answer);
}

function fraction() {
	display = document.getElementById("lcd");
	answer = eval("1/"+display.value);
	answer = (answer*1).toString();
	reset(answer);
}

function factorial() {
	display = document.getElementById("lcd");
	answer = fact(display.value);
	if (answer == 0)
		answer = "Cannot calculate";
	else 
		answer = (answer*1).toString();
	reset(answer);
}

function tax88() {
	display = document.getElementById("lcd");
	answer = eval(display.value+"/0.912");
	answer = (answer * 1).toString();
	reset(answer);

	reset(answer);
}

function tax33() {
	display = document.getElementById("lcd");
	answer = eval(display.value+"/0.967");
	answer = (answer * 1).toString();
	reset(answer);

	reset(answer);
}

// Compute factorial of n (n = integer)
function fact(n) {
	if (n.toString().indexOf(".") != -1) {
		console.log("Cannot calculate factorial for float numbers!");
		return 0;
	}
	else {
		try {
			if (n == 0)
				return 1;
			else
				return n * fact(n-1);
		}
		catch (err) {
			console.log("Cannot calculate factorial for big numbers!")
			reset("NaN");
		}
	}
}

// Binary operations: +, -, *, /, ^

function basic(operator) {	
	display = document.getElementById("lcd");
	if (op == "") {
		initial_val = display.value;
		op = operator;
	}
	else {
		if (completed) {
			equal();
			initial_val = answer;
			op = operator;
		}
		else
			op = operator;
	}
	completed = false;
	second_num = true;
}

function equal() {
	display = document.getElementById("lcd");
	if (completed && op != "") {
		if (op =="^")
			answer = Math.pow(initial_val, display.value);
		else {
			console.log(initial_val + op + display.value);
			answer = eval(initial_val + op + display.value);
			console.log(answer);
		}
		reset(answer);
	}
}

function reset(val) {
	//set display value
	document.getElementById("lcd").value = val;
	toExp();
	//reset all properties
	initial_val = "";
	op = "";
	float_num = false;
	second_num = false;
	completed = false;
}

// if Result is too big to display, make it scientific notation
function toExp() {
	display = document.getElementById("lcd");
	if (display.value.length > PRECISION)
		display.value = (Number(display.value).toExponential(PRECISION)*1).toString();	
}
