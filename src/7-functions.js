/***********************************************************************************************************************
 * FUNCTIONS
 *
 * In Javascript, functions are objects. A function is a special type of object with a property called 'name' that is
 * the name of the function and a property called 'code' that contains the code of the function and it is invokable.
 * Also it contains another important properties and methods, this is going to be covered later.
 * 
 * Everything you can do with other types you can do with functions: Assign them to variables, pass them around, create
 * them on the fly. This is because functions are objects. Even, you can declare anonymous functions in Javascript. This
 * is called First Class Functions.
 *
 * During the creation of the execution context of a function, Javascript creates a variable called 'arguments'. This
 * variable contains all the parameters passed to the function in an array.
 *
 * IMPORTANT NOTE: Objects (including functions) interact by reference when sending them equal to each other ot passing
 * to a function (see examples below). Instead, primitives always interact by value.
 *
 * IMPORTANT NOTE: Javascript does not support function overloading, because functions are objects.
 *
 **********************************************************************************************************************/

// Function statement. This is hoisted during creation phase.
function salute()
{
    console.log('hi');   
}

// This is possible because functions are objects.
salute.language = 'venezuelan';
console.log(salute.language);

// Function expression. The function is not hoisted, it is assigned in runtime, so if you invoke the function before the
// assignation, it throws an error. Function expressions also are called anonymous because the name property is empty.
var anonymousSalute = function () {
    console.log('hi');   
}

// To invoke the function, you must used the variable that receives the object function.
anonymousSalute();

// Because functions are objects, you can pass them as parameters.
function log(innerFunction)
{
    innerFunction();
}

// Creating a function expresion on the fly and pass it as parameter.
log(function () {
    console.log("Passing a function as parameter.");
});

// By value (primitives). a and b live in different spots of memory.
var a = 3;
var b;

b = a;
a = 2;

console.log(a);
console.log(b);

// By reference (all objects (including functions))
var c = { greeting: 'hi' };
var d;

d = c;
c.greeting = 'hello'; // Mutate

// d and c point to the same spot in memory
console.log(c);
console.log(d);

// By reference (even as parameters)
function changeGreeting(obj)
{
    obj.greeting = 'Hola'; // Mutate
}

changeGreeting(d);
console.log(c);
console.log(d);

// Equals operator sets up new memory space (new address)
c = { greeting: 'howdy' };
console.log(c);
console.log(d);

// An example where arguments variable is used
function multiplyThreeNumbers (number1, number2, number3)
{
    number3 = number3 || 1;

    if (arguments.length < 2)
    {
        console.log("Missing parameters, you must specify at least 2 numbers.");
        return;
    }

    console.log(arguments);

    console.log("The result is -> " + number1 * number2 * number3);
}

multiplyThreeNumbers();
multiplyThreeNumbers(2);
multiplyThreeNumbers(2, 4);
multiplyThreeNumbers(2, 4, 6);

// IMPORTANT NOTE
// From ES6 you can used the functionality 'spread', where you don't have to specify all parameters in the function
// definition but a new variable defined with '...' at the beginning that will contain all the others parameters in an
// array
function multiplyManyNumbers(number1, number2, ...otherNumbers)
{
    if (arguments.length < 2)
    {
        console.log("Missing parameters, you must specify at least 2 numbers.");
        return;
    }

    console.log(arguments);
    console.log(otherNumbers);

    var result = number1 * number2;

    // otherNumbers is an array
    otherNumbers.forEach(function(item){
        result *= item;
    });

    console.log("The result is -> " + result);
}

multiplyManyNumbers();
multiplyManyNumbers(1, 2);
multiplyManyNumbers(1, 2, 3);
multiplyManyNumbers(1, 2, 3, 4, 5, 6, 7);

