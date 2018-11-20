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
