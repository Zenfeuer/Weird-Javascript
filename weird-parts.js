/***********************************************************************************************************************
 * GLOBAL EXECUTION CONTEXT AND HOISTING
 * 
 * Container/wrapper that contains the global object that in web is the window  object and 'this' that points to the 
 * global object. If there is an outer environment, a reference to that is also created.
 *
 * Also contains the variables defined as global and the definitions of functions to be used when the code is running.
 *
 * During creation phase, all the global variables and functions are HOISTED, i.e., it setups the memory space for those
 * functions and variables.
 *
 **********************************************************************************************************************/

// Global variable
var foo = "Hello World"!;

// Initially, all variables are set to 'undefined'.
var foo2;

function myFunc ()
{
	// This prints 'undefined'.
	console.log(foo2);
}


// This is possible thanks to hoisting, the memory space for myFunc2() and foo3 is already set up.
myFunc2();
console.log(foo3);

var foo3 = 'Hello World!';

function myFunc2 () 
{
    console.log('Called myFunc2!');
}



