/***********************************************************************************************************************
 * OBJECT CREATE AND PURE PROTOTYPICAL INHERITANCE
 *
 * Moderns browsers (that support latest Javascript engine) offer a method that allows create new objects and define the
 * prototype. This method is defined in built-in object 'Object'.
 *
 * The Object.create() method creates a new object, using an existing object as the prototype of the newly created
 * object. So, it returns a new object with the specified prototype object and properties (if specified).
 *
 * Additional References:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
 *
 **********************************************************************************************************************/

// New object
var person = {
    firstname: 'Default',
    lastname: 'Default',

    // NOTE: 'this' keyword usage is very important for methods defined in objects, because when the method is executed,
    // 'this' is pointing to the object itself, not the global execution context. If you miss the 'this' keyword when 
    // using the object properties, by scope chain that property reference is going to be searched and if there is an
    // outside variable with the same name, it is going to be used and can get undesired behavior.
    greet: function () {
        return 'Hi ' + this.firstname;   
    }
}

// This creates a new object using person object as prototype. Actually, bilbo object does not have properties defined,
// just the prototype, so, for example, bilbo object has access to greet() method, because by prototype chain it reachs
// the method in the prototype. A clear example of pure prototypical inheritance.
var bilbo = Object.create(person);

// These DOES NOT MUTATE the data in the prototype, these lines are defining those properties in bilbo object.
bilbo.firstname = 'Bilbo';
bilbo.lastname = 'Baggins';

// Here it can be observed the prototypical inheritance.
console.log(bilbo);

// bilbo object has access to greet() method.
console.log(bilbo.greet());

/**
 * NOTE: Sometimes, you need to ensure backward compatibility in your code, for example, Object.create() it is supported
 * for ES5 or superior. To achieve this compatibility you can use POLIFY, that is adding code that adds a feature which 
 * the engine may lack. Example:
 */
if (!Object.create)     // Verifying if the method create() exists in built-in Object.
{
    // If not, create it
    Object.create = function (o) 
    {
        // Just ensuring one argument
        if (arguments.length > 1) 
        {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }

        // An empty function
        function F() {}

        // Functions have access to prototype property, so it assigns the prototype to the passed object.
        F.prototype = o;

        // Return a new object using the function as constructor. Note that the prototype is already established.
        return new F();
    };
}

/**
 * typeof: it is an unary operator that returns a string indicating the type of the unevaluated operand.
 */
var a = 3;
console.log(typeof a);      // number

var b = "Hello";
console.log(typeof b);      // string

var c = {};
console.log(typeof c);      // object

var d = [];
console.log(typeof d);      // object

/**
 * Because arrays are also objects, typeof of array will return 'object'. To avoid this, it is better to use 
 * Array.isArray or Object.prototype.toString.call to differentiate regular objects from arrays
 */
console.log(Array.isArray(d))                       // true
console.log(Object.prototype.toString.call(d));     // [object Array]

var z = function() { };
console.log(typeof z);      // function

// Function ctor
function Person(name) 
{
    this.name = name;
}

var e = new Person('Jane');

console.log(typeof e);      // object

/**
 * The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain
 * of an object.
 */
console.log(e instanceof Person);   // true

console.log(typeof undefined);      // undefined

/**
 * It is pretty weird that 'typeof null' returns 'object' instead of 'null'. This is a bug in Javascript that exists
 * since the beginning. In the first implementation of JavaScript, JavaScript values were represented as a type tag and 
 * a value, with the type tag for objects being 0, and null was represented as the NULL pointer (0x00 on most 
 * platforms). As a result, null had 0 as a type tag, hence the bogus typeof return value.
 */
console.log(typeof null);           // object


