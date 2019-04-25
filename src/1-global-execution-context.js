/*******************************************************************************
 *
 * GLOBAL EXECUTION CONTEXT, HOISTING AND EXECUTION
 *
 * ****************************************************************************/

/**
 * GLOBAL EXECUTION: Container/wrapper that contains the global object that in 
 * web is the window  object and 'this' that points to the global object. If
 * there is an outer environment, a reference to that is also created.
 *
 * Also contains the variables defined as global and the definitions of 
 * functions to be used when the code is running.
 */

/**
 * HOISTING: During creation phase, all the global variables and functions are 
 * "hoisted", i.e., it setups the memory space for those functions and variables
 */

/**
 * EXECUTION: When a function is invoked, a new execution context is stacked in 
 * the execution stack, this new execution context is similar to the global 
 * execution context, so the outer environment is the context where that 
 * function lives, mainly is the global execution context.
 */

// Global variable. The value "Hello World!" is not assigned during creation 
// phase but when this line is executed.
var foo = "Hello World!";

// Initially, all variables are set to 'undefined' in the creation phase.
var foo2;

function myFunc ()
{
    // This prints 'undefined'.
    console.log(foo2);
}

// This is possible thanks to hoisting, the memory space for myFunc2() is 
// already set up.
myFunc2();

// This prints 'undefined' because hoisting, the variable foo3 was set to 
// 'undefined' during creation phase.
console.log(foo3);

var foo3 = 'Hello World!';

// This is hoisted during creation phase.
function myFunc2 () 
{
    console.log('Called myFunc2!');
}

