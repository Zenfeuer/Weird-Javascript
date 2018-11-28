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

    //while (new Date() < ms) {}

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



/***********************************************************************************************************************
 * COERCION AND DEFAULT VALUES
 * 
 * Coercion refers to convert a value from one type to another and is a common behavior in Javascript because dynamic
 * typing of the language. It can be dangerous in some scenarios. To avoid the coercion in the comparisons between two 
 * values, it is recommended use the strictly equality or inequality operator (===). Coercion can be used as an 
 * advantage to verify lack of existence in if statements.
 *
 * Javascript does not care if you don’t pass the parameters for a function, unlike another programming languages. This
 * is because Javascript set the parameters with the default value 'undefined'. But sometimes this behavior is not
 * desired or it is needed to set an specific default value. To set default values, the best practice is the usage of 
 * the operator || (see example below).
 *
 **********************************************************************************************************************/

// The firts parameter is coerced to a string. The result is a string value '12'.
var result = 1 + '2';

var isOk;

// Coercion is useful to verify lack of existence in if statements. Here, 'undefined' value is coerced to false value.
if (isOk)
{
    console.log("isOK has value");
}
else
{
    console.log("isOK is undefined");
}

// Also is possible to force coercion using the primitive types of Javascript as follows
Boolean("Hello");       // The value "Hello" is coerced to true
Number("haha");         // The value "haha" is coerced to NaN
String(undefined);      // The value undefined is coerced to "undefined"

// Initially, name is set with 'undefined' value.
function greet(name)
{
    // This is another example of coercion. The operator || returns true or false if the parameters passed are booleans,
    // but if not so, it returns the value that can be coerced to true. In this case, if name is undefined, || is going
    // to return '<Your name here>'.
    name = name || '<Your name here>';
    console.log('Hello ' + name);    
}

greet('Darwing');
greet();



/***********************************************************************************************************************
 * OBJECTS
 *
 * Objects in Javascript are similar to another programming languages, they have properties and methods. But in
 * Javascript specifically, an object is a collection of pairs name-value, where the pairs can be properties and
 * functions.
 *
 * A way to create an object is using the constructor new Object(): var obj = new Object(); obj.prop1 = "value";
 *
 * Another way to create an object is using the literal syntax as follows: var obj = { prop1: "value" };
 *
 * To access/create properties and methods in an object, you can use [] and dot operator. Mainly, dot operator is more
 * redable and usable.
 *
 **********************************************************************************************************************/

// Creating an object with new Object() constructor. At this point, person is an empty object.
var person = new Object();

// Properties can be created/accessed with [] operator passing the name of the property to be created/accessed.
person["firstname"] = "Darwing";
person["lastname"] = "Zenfy";

// Also, you can pass a variable to [] operator that contains the name of the property that you want to access.
var firstNameProperty = "firstname";
console.log(person[firstNameProperty]);

// Also, you can use the dot operator to access the properties and methods for an object.
console.log(person.firstname);
console.log(person.lastname);

// Unlike other programming languages, this does not throw an error, this returns undefined. This means that you can
// always add properties and functions on the fly for an object.
console.log(person.address);

// Objects can be inside of another objects.
person.address = new Object();
person.address.street = "14-1 Venezuela St.";
person.address.city = "Caracas";
person.address.state = "DF";

// Creating a function for the object.
person.printFullName = function (greeting)
{
    greeting = greeting || "Hello";

    // In this case, this is not pointing to the global object but to the person object. This can be confused.
    console.log(greeting + " " + this.firstname + " " + this.lastname);
}

console.log(person.address.street);
console.log(person.address.city);
console.log(person["address"]["state"]);

// Invoking the function contained in person object
person.printFullName("Hola");

// Also you can invoke a function with the [] operator, but you need to specify the parenthesis to really invoke the
// function (and to pass the parameters). person["printFullName"] it just returs the code of the function.
person["printFullName"];
console.log(person["printFullName"]);

// Correct way to invoke functions in objects using [] operator.
person["printFullName"]();

// Note that this throws an error, because at this point Darwing variable is undefined. 
//greetPerson(Darwing);

// Object literal declaration. Actually, this way is the most used, because is more redable and easier to write.
var Darwing = { 
    firstname: 'Darwing', 
    lastname: 'Zenfy',
    address: {
        street: '14-1 Venezuela St.',
        city: 'Caracas',
        state: 'DF'
    }
};

function greetPerson(person)
{
    console.log('Hi ' + person.firstname);
}

greetPerson(Darwing);

// Objects can be created on the fly
greetPerson({ 
    firstname: 'Dancer', 
    lastname: 'of Boreal Valley'
});

// Assigning a new object using object literal declaration.
Darwing.address2 = {
    street: '15-2 Venezia St.'
}



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
 * ** IMPORTANT NOTE: Objects (including functions) interact by reference when sending them equal to each other or 
 * passing to a function (see examples below). Instead, primitives always interact by value.
 *
 * ** IMPORTANT NOTE: Javascript does not support function overloading, because functions are objects.
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



/***********************************************************************************************************************
 * FUNCTION EXECUTION
 *
 * The code property of a function is invokable. When a function is invoked, it creates a new execution context that is
 * stacked at the top of the execution stack.
 *
 * When an execution context is created, the variable 'this' is going to point a different thing depending on how the 
 * function is invoked. There are a few scenarios where 'this' will be changed depending on how the function is called.
 *
 **********************************************************************************************************************/

// Global function statement. In this case, the outer environment of this function in the global execution context, so, 
// the 'this' points to window object.
function globalA ()
{
    console.log(this);

    // Assigning a new variable to the global object through the 'this' pointer. This is not a good practice, it is hard
    // to debug and can cause a lot of problems.
    this.newVariable = 'hello from newVariable';
}

// Global function expression, where also 'this' is pointing to window object.
var globalB = function()
{
    console.log(this);   
}

globalA();

// It is not necessary to use dot or [] operator to access newVariable, because it is attached to the global object.
console.log(newVariable); // not good!

globalB();

var globalC = {
    name: 'The globalC object',
    log: function() {

        // In this case, 'this' is not pointing to the global object, it is pointing to the object globalC. It is a 
        // better practice to assign 'this' to another variable to avoid confussion.
        var self = this;
        
        // This is modifying the name property of globalC, not adding a new var to the global object.
        self.name = 'Updated globalC object';
        console.log(self);
        
        // This function expression has still 'this' pointing to the object globalC. it occurs the same with a new
        // function stament defined here.
        var setname = function(newname) {
            self.name = newname;   
        }

        // This is modifying the name property of globalC, not adding a new var to the global object.
        setname('Updated again! The globalC object');

        // Prints the object globalC.
        console.log(self);

        // Defining a new object inside another object it changes again where the 'this' is pointing for the methods
        // declared in the new object
        var newObj = {
            name: 'Im a new object living in globalC',
            log: function () 
            {
                // Because log function lives within newObj object, now 'this' points to newObj when this log is invoked
                var self = this;

                // This updates newObj.name property
                self.name = 'newObj: Javascript can be crazy sometimes!';

                console.log('Logging from newObj');

                // This prints newObj object
                console.log(self);
            }
        };

        newObj.log();
    }
}

globalC.log();



/***********************************************************************************************************************
 * ARRAYS
 *
 * In Javascript, an array is a collection of anything, i.e., primitype types, objects, functions, another array.
 *
 **********************************************************************************************************************/

var arr = [

    // Number primitive
    42,

    // Boolean primitive 
    false, 

    // An object (literal syntax)
    {
        name: 'Darwing',
        address: 'Alderaan'
    },

    // A function expression
    function(name, greeting) 
    {
        greeting = greeting || 'Hello ';
        console.log(name + ', ' + greeting);
    },

    // String primitive
    "Im your father",

    // Another array
    [
        3.14,
        "Im pi!"
    ]
];

console.log(arr);
arr[3](arr[2].name, arr[4]);



/***********************************************************************************************************************
 * IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
 *
 * An IIFE is a function expression that is invoked immediately where is defined/created.
 *
 **********************************************************************************************************************/

// Using an Immediately Invoked Function Expression (IIFE)
// Note that darthVader now contains what returns the function and not the function itself, so using darthVader() throws
// an error because in this case is a string.
var darthVader = function (quote)
{

    return 'Darth Vader said: ' + quote;

// Note that function is invoked on the fly passing the parameters needed
}('The circle is now complete. When I left you, I was but the learner. Now I am the master.');

console.log(darthVader);

var harveyDentQuote = 'You either die a hero or you live long enough to see yourself become the villain.';

// IIFE in anonymous function
(function (quote) {

    console.log('IIFE anonymous function!')
    console.log(quote);
    
}(harveyDentQuote));

// Another IIFE in anonymous function
(function (number1, number2) {
    console.log('Result is -> ' + (number1 * number2));

// This is also a valid way to pass parameters to an anonymous IIFE.
})(5, 7);



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



/***********************************************************************************************************************
 * SPECIAL METHODS IN FUNCTION OBJECT: call(), apply() and bind()
 *
 * All functions have access to these special methods: call(), apply() and bind(). These functions are related to the 
 * object 'this' and arguments that you pass to the function.
 *
 * bind(): creates a new function that, when called, has its 'this' keyword set to the provided value, with a given
 * sequence of arguments preceding any provided when the new function is called.
 *
 * call(): calls a function with a given 'this' value and arguments provided individually.
 *
 * apply(): calls a function with a given this value, and arguments provided as an array (or an array-like object).
 *
 **********************************************************************************************************************/

// Create an object with an method.
var lukeSkywalker = {
    firstname: 'Luke',
    lastname: 'Skywalker',
    getFullName : function ()
    {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

// If this function is called without specifying the keyword 'this' through bind(), call() or apply(), it throws an
// error because getFullName() method does not exist in the global object.
var logName = function (...params)
{
    console.log('------ parameters ------');
    console.log(params);

    console.log('------ arguments ------');
    console.log(arguments);

    console.log('------ Logging Full Name ------');
    console.log('Logged: ' + this.getFullName());
}

// With bind(), it creates a new function with the 'this' set to the provided, in this case, lukeSkywalker
var logLukeName = logName.bind(lukeSkywalker);

// Invoking the new function
logLukeName('Leia', 'R2-D2');

// The same approach can be achieved with call() or apply().
logName.call(lukeSkywalker, 'Leia', 'R2-D2');
logName.apply(lukeSkywalker, ['Leia', 'R2-D2']);

// With these special methods, it is possible to achieve interesting patterns as follows, where Food function (object)
// 'inherits' the variables defined in Product function, including the method nameAndPrice.
function Product (name, price) 
{
    this.name = name;
    this.price = price;

    this.nameAndPrice = function ()
    {
        console.log(name + " $" + price);
    }

    console.log("Running from Product().");
}

function Food (name, price)
{
    // Object Food defines name and price variables through Product function. To make it works, Food function must be
    // invoked using the new instruction.
    Product.call(this, name, price);
    this.category = 'food';

    console.log("Running from Food().");
}

// If you invoke the function Food as follows, it is not throw an error but the 'this' keyword is pointing to the global
// object, so when the function Food finishes, name, price and category variables will be defined in the global object.
//Food('cheese', 5);

// This does not return a function but an object with all the veriables as properties and methods. In this case, it has
// name, price and category as properties and nameAndPrice as method. This is because of new instruction, it creates an
// object using Food function as constructor
var fObj = new Food('cheese', 5);

console.log(fObj);

fObj.nameAndPrice();

// Also the special methods can be used in IIFEs
(function (lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(lukeSkywalker, ['es', 'en']);

// Function borrowing is possible thanks to these methods
var leiaOrgana = {
    firstname: 'Leia',
    lastname: 'Organa'
}

// Object leiaOrgana 'borrows' the function getFullName() from object lukeSkywalker
console.log(lukeSkywalker.getFullName.apply(leiaOrgana));

// By using bind(), you can achieve function currying. Currying means creating a copy of a function but with some preset
// parameters. Very useful in mathematical situations.
function multiply (a, b) 
{
    return a*b;   
}

// For these cases, it is not matter the 'this' keyword
var multipleByTwo = multiply.bind(null, 2);
console.log(multipleByTwo(4));

var multipleByThree = multiply.bind(null, 3);
console.log(multipleByThree(4));



/***********************************************************************************************************************
 * FUNCTIONAL PROGRAMMING
 *
 * Thanks to first class functions, functional programming is possible in Javascript.
 *
 **********************************************************************************************************************/

// Apply the function passed to each element in the array
function mapForEach (arr, fn)
{
    var newArr = [];

    for (var i = 0; i < arr.length; i++)
    {
        newArr.push(
            // Call the function and pass the i-th element
            fn(arr[i])   
        );
    }
    
    return newArr;
}

var arr1 = [1, 2, 3];
console.log(arr1);

// You can make different work over the array, in this case, multiply each item by 2
var arr2 = mapForEach(arr1, function (item)
{
   return item * 2; 
});

console.log(arr2);

// Also you can defined a function expression and pass the function variable to mapForEach
var fn = function (item)
{
    return item > 2;
}

// In this case, a boolean array is returned
var arr3 = mapForEach(arr1, fn);
console.log(arr3);

// Now, checking with a limiter
var checkPastLimit = function (limiter, item)
{
    return item > limiter;
}

// To pass the limiter it is needed to use bind, to preset the limiter
var arr4 = mapForEach(arr1, checkPastLimit.bind(null, 1));
console.log(arr4);

// To avoid to pass the 'this' value because it is not really used, you can create a function that returns another
// function with the limiter and the 'this' value preset
var checkPastLimitSimplified = function (limiter)
{
    // limiter param is preset by bind().
    // NOTE: it is not recommended DO NOT MUTATE in these tiny functions, if you need to, it is recommend to return the 
    // new data and not affect the original one. Also, it is recommended to mutate data as high up in that chain as
    // possible of functions.
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter); 
};

// Now, it is needed to pass only the limiter
var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));
console.log(arr5);


