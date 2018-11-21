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
 **********************************************************************************************************************/

// Function statement. This is hoisted during creation phase.
function salute()
{
    console.log('hi');   
}

// This is possible because functions are objects.
greet.salute = 'venezuelan';
console.log(greet.language);

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