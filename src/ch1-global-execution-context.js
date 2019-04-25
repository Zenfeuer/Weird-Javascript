/*******************************************************************************
 *
 * GLOBAL EXECUTION CONTEXT, HOISTING AND EXECUTION
 *
 * Note: For further reference, read ch1.md
 *
 * ****************************************************************************/

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

