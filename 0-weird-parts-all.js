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






