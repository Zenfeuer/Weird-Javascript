/*******************************************************************************
 * CLOSURES
 *
 * Note: For further reference, read ch11.md
 *
 ******************************************************************************/

// This variable lives in the global scope
var helloSubject = 'World';

// This function lives in the global scope
function sayHello(name) 
{
    // Function scope (including salutation variable)

    /**
     * This variable is going to be used to verify it is visible from the 
     * returned anonymous function
     */
    var verifyScope = "This is a scope test!";

    /**
     * This assignation modified the global variable thanks to the scope chain, 
     * but it nevers collides with name variable.
     */
    helloSubject = 'Vegetta';

    return function(salutation)
    {
        /** 
         * This prints the original value of verifyScope because the state of 
         * the function.
         */
        console.log(verifyScope);

        /**
         * This is going to print the value 'Trunks' because was modified before 
         * execution of this function.
         */
        console.log(helloSubject);

        /** 
         * Because function state, name has the value 'World', so the value was 
         * preserved in the function scope.
         */
        console.log(salutation + ' ' + name + '!');
    }
}

// Get the function
var sayAloha = sayHello(helloSubject);

// Force update of the global variable to verify closure
helloSubject = 'Trunks';

// Invoking the function to verify closure
sayAloha('Aloha');

/**
 * In this example, the closure does not happen because the value of 'i' was not preserved, setTimeout function executes
 * the passed function as a callback, so when the console.log() runs, it references the current value of 'i', which has
 * long ago incremented to 10
 */
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

// NOTE: with closures and IIFE you can achieved interesting patterns. In the next example, you can access to methods
// and properties declared in an IIFE.
(function (globalObject) {

    var privateVar = 'Shhhhhh! This is a private secret.';
    var publicVar  = 'Leeeeeeeeeroy Jenkins!';

    // Now the global object has this method to access publicVar value.
    globalObject.getPublicVar = function () 
    {
        return publicVar;
    };

// this = window object (browser)
})(this);

console.log(this.getPublicVar());

// NOTE: More examples of preserving values
// A function that builds another functions
function buildFunctions ()
{ 
    var functionsArr = [];
    
    for (var i = 0; i < 3; i++)
    {
        // An improment to this scenario is using the let declaration and passiing the variable to the function.
        //let j = i;

        // You can push functions into an array because arrays in JS are a collection of anything.
        functionsArr.push(
            function () 
            {
                // In this case, the value of 'i' it is not preserved. By scope chain, when this function runs, 'i'
                // points to 
                console.log(i);

                // Using let declaration improvement.
                //console.log(j);
            }
        );
    }
    
    return functionsArr;
}

var fs = buildFunctions();

// All these invokations are going to print out the value '3'.
fs[0]();
fs[1]();
fs[2]();

function buildFunctionsPreserving ()
{ 
    var functionsArr = [];
    
    for (var i = 0; i < 3; i++)
    {
        functionsArr.push(

            // This IIFE is creating a function scope the 'preserve' the value of 'i'.
            (function (j) {
                return function ()
                {
                    console.log(j);   
                }

            // Passing the current value of 'i'.
            })(i)
        );
    }
    
    return functionsArr;
}

var fs2 = buildFunctionsPreserving();

fs2[0](); // Prints 0
fs2[1](); // Prints 1
fs2[2](); // Prints 2


// *** FUNCTION FACTORIES USING CLOSURES ***
// Returning functions according to some conditions.
function makeGreeting (language)
{
    var supportedLanguages = ['en', 'es', 'de', 'it'];

    if (arguments.length === 0)
    {
        return function ()
        {
            console.log("ERROR: You must specified a supported language.");
        }
    }
    else if (supportedLanguages.includes(language) === false)
    {
        return function ()
        {
            console.log("ERROR: Unsupported language.");
        }
    }

    // In this case, language value is preserved to this function scope and making different things depending on the 
    // value that it has.
    return function (firstname, lastname)
    {
        if (language === 'en') 
        {
            console.log('Hello ' + firstname + ' ' + lastname);   
        }

        if (language === 'es')
        {
            console.log('Hola ' + firstname + ' ' + lastname);   
        }
    }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');
var greetRussian = makeGreeting('ru');
var greetEmpty = makeGreeting();

greetEnglish('Darwing', 'Jenkins');
greetSpanish('Darwing', 'Jenkins');
greetRussian('Darwing', 'Jenkins');
greetEmpty('Darwing', 'Jenkins');


