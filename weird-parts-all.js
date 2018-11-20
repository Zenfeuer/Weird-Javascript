/***********************************************************************************************************************
 * GLOBAL EXECUTION CONTEXT, HOISTING AND EXECUTION
 * 
 * Container/wrapper that contains the global object that in web is the window  object and 'this' that points to the 
 * global object. If there is an outer environment, a reference to that is also created.
 *
 * Also contains the variables defined as global and the definitions of functions to be used when the code is running.
 *
 * During creation phase, all the global variables and functions are HOISTED, i.e., it setups the memory space for those
 * functions and variables.
 *
 * When a function is invoked, a new execution context is stacked in the execution stack, this new execution context is
 * similar to the global execution context, so the outer environment is the context where that function lives, mainly is
 * the global execution context.
 *
 **********************************************************************************************************************/

// Global variable. The value "Hello World!" is not assigned during creation phase but when this line is executed.
var foo = "Hello World!";

// Initially, all variables are set to 'undefined' in the creation phase.
var foo2;

function myFunc ()
{
    // This prints 'undefined'.
    console.log(foo2);
}

// This is possible thanks to hoisting, the memory space for myFunc2() is already set up.
myFunc2();

// This prints 'undefined' because hoisting, the variable foo3 was set to 'undefined' during creation phase.
console.log(foo3);

var foo3 = 'Hello World!';

// This is hoisted during creation phase.
function myFunc2 () 
{
    console.log('Called myFunc2!');
}

/***********************************************************************************************************************
 * VARIABLE ENVIRONMENT
 * 
 * Variable environment refers to where the variables live and how the relate to each other in memory. So, when a
 * varable is going to be used, it matters where it was defined, so if a global variable and a variable defined in a
 * function have the same name, they never collide because the live in different spaces in memory.
 *
 **********************************************************************************************************************/

function b () 
{
    // This variable lives in this function, so it nevers collide with the global definition and neither with the
    // function a() that invoke this function, it is created in a diferent execution context for this function when it 
    // is executed. So, it prints the value 'undefined'.
    var myVar;
    console.log(myVar);
}

function a () 
{
    // This variable lives in this function, so it nevers collide with the global definition, it is created in a
    // diferent execution context for this function when it is executed. So, it prints the value '2'.
    var myVar = 2;
    console.log(myVar);
    b();
}

var myVar = 1;
console.log(myVar);

a();

// This still prints the value '1', because the invocation of the functions does not affects the value of the global
// variable myVar thanks to the variable environment.
console.log(myVar);
