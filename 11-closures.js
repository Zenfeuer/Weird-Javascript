/***********************************************************************************************************************
 * CLOSURES
 *
 * Closures are important in Javascript because they allow important design patterns. But initially it is hard to
 * understand. The root of the problem is that functions have a state (scope of the function) and it stores references
 * to all variables that were declared at the time the function was created. Due to hoisting, named functions have the
 * scope present at the top of whatever block they belong to, but anonymous functions have whatever scope exists at the 
 * line they are initialized (see examples to understand better).
 *
 * So, a closure is the act of capturing a value or an object and separating it from its original scope, making it
 * available to the capturing function forever.
 *
 * Closures are related to the Scope Chain, because when a variable is used, the engine finds out through the scope
 * chain until it finds the entry for that variable. The way of separating a variable from its previous existence in the
 * scope chain is achieved through redeclaring the variable or passing it into a function, and this is a common behavior
 * in the closures.
 *
 **********************************************************************************************************************/

// This variable lives in the global scope
var helloSubject = 'World';

// This function lives in the global scope
function sayHello(name) 
{
    // Function scope (including salutation variable)

    // This variable is going to be used to verify it is visible from the returned anonymous function
    var verifyScope = "This is a scope test!";

    // This assignation modified the global variable thanks to the scope chain, but it nevers collides with name variable.
    helloSubject = 'Vegetta';

    return function(salutation)
    {
        // This prints the original value of verifyScope because the state of the function.
        console.log(verifyScope);

        // This is going to print the value 'Trunks' because was modified before execution of this function.
        console.log(helloSubject);

        // Because function state, name has the value 'World', so the value was preserved in the function scope.
        console.log(salutation + ' ' + name + '!');
    }
}

// Get the function
var sayAloha = sayHello(helloSubject);

// Force update of the global variable to verify closure
helloSubject = 'Trunks';

// Invoking the function to verify closure
sayAloha('Aloha');

// In this example, the closure does not happen because the value of 'i' was not preserved, setTimeout function executes
// the passed function as a callback, so when the console.log() runs, it references the current value of 'i', which has
// long ago incremented to 10
for (var i = 0; i < 10; i++)
{
    setTimeout(function()
    {
        console.log(i);
    }, 
    100);
}

// To achieve a closure in the previous example, it is needed to create a function that preserves the value thanks to
// the function scope.
var preserveValue = function (value)
{
    return function ()
    {
        console.log(value);
    }
}

// Using preserveValue function to print the correct value of 'i'.
for (var i = 0; i < 10; i++)
{
    setTimeout(preserveValue(i), 100);
}


