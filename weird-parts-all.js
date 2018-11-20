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
    console.log(testingLetDeclaration);
}

// The let instruction is a new way to declare variables in ES6, but the variable declared with let cannot be used 
// before its declaration and it is affected by blocking scope.
let testingLetDeclaration = "Hola!";

function myFunc3 () 
{
    console.log('Called myFunc3!');
    // This throws an error because testingLetDeclaration was declared with let and it is affected by blocking scope.
    //console.log(testingLetDeclaration);
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

/***********************************************************************************************************************
 * SCOPE CHAIN
 * 
 * Scope refers to where a variable is available in your code. This also affects function definitions.
 * 
 * The scope chain is a list of all the variables and objects inside which the current function exists. This also 
 * includes the variable object of global execution context. Scope chain also contains the current function variable 
 * object. 
 *
 **********************************************************************************************************************/

 function funcA ()
 {
    // Define functions inside in functions is possible, because functions are objects in Javascript.
    function funcB ()
    {
        // This prints the value '1' because scope chain. When this line is executed, myVar is not in the execution
        // context of funcB(), so it looks for the outer environment of funcB() that is funcA(), but neither myVar is 
        // located there, so it looks for the outer environment of funcA() that is the global execution context and 
        // finds myVar there. This is the SCOPE CHAIN.
        console.log(myVar);
        
        // Functions are also affected by Scope Chain, because functions are objects, so when this line is executed, it
        // finds throuh scope chain that funcC() is located/defined lexically within funcA().
        funcC();
    }

    function funcC()
    {
        console.log('Hello from funcC()!');

        // When this is executed, this does not throw any errors because funcD() is located in the global execution
        // context.
        funcD();
    }
    
    // The scope of function funcB() is within funcA(), so it cannot be invoked outer of funcA(). This is because of the
    // lexical environment, funcB() is 'sat' physically inside funcA().
    funcB();
}

function funcD()
{
    console.log('Hello from funcD()!');
}

var myVar = 1;
funcA();

/***********************************************************************************************************************
 * ASYNCHRONOUS CALLBACKS
 * 
 * Javascript is synchronous and single threaded. To achieve asynchronous calls, Javascipt engine has a queue called
 * Event Queue. This queue is evaluated periodically by Javascript engine and an event is going to be attended/executed
 * when the execution stack is empty. So, Javascript is not really asynchronus with this approach (as mentioned, it is
 * synchronus and single threaded), what is really happening is that the browser is putting/stacking events
 * asynchronously in the Event Queue while code is running line by line.
 *
 **********************************************************************************************************************/

// Long running function
function waitThreeSeconds()
{
    var ms = 3000 + new Date().getTime();

    while (new Date() < ms) {}

    console.log('finished function');
}

function clickHandler ()
{
    console.log('click event!');   
}

// Listen for the click event. clickHandler() function is not going to be executed until execution stack is empty.
document.addEventListener('click', clickHandler);


waitThreeSeconds();
console.log('finished execution');

