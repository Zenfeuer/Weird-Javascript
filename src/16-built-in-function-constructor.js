/***********************************************************************************************************************
 * BUILT-IN FUNCTION CONSTRUCTORS
 *
 * There are some function constructors inside the Javascript architecture ready to be used. These built-in function
 * constructors allow to have have access to special methods depending on the prototype property.
 *
 * NOTE: Using built-in function constructors can be dangerous in some occasions specially with primitive types.
 *
 **********************************************************************************************************************/

// Built-in function constructors in Javascript. It looks that you are defining/creating primitives or kind of with these 
// built-in function constructors, but you are not. You are actually creating objects that conrain primitives and give
// them extra abilities.
var x1 = new Object();    // A new Object object
var x2 = new String();    // A new String object
var x3 = new Number();    // A new Number object
var x4 = new Boolean();   // A new Boolean object
var x5 = new Array();     // A new Array object
var x6 = new RegExp();    // A new RegExp object
var x7 = new Function();  // A new Function object
var x8 = new Date();      // A new Date object


// This works because Javascript engine boxed it inside of a string object which has this 'length' property and another
// properties and methods such as indexOf().
console.log("Hello World!".length);

// This fails because Javascript does not intend to box all the direct primitives value.
//console.log(5.toFixed(2));

var num = 5;

// In this case, Javascript engine boxes/converts the primitive variable num automatically to a Number object.
console.log(num.toFixed(2));

// You can access to the prototype property of these built-in function constructors and add new properties and methods
// that can be useful, specifically when you are creating a new library.
String.prototype.isLengthGreaterThan = function (limit)
{
    return this.length > limit;  
}

// Because prototype chain, isLengthGreaterThan() method is accessible by any string now.
console.log("Pikachu".isLengthGreaterThan(3));

Number.prototype.isPositive = function ()
{
    return this > 0;   
}

// Because isPositive() method is added to the prototype property, any number has access now to that method.
console.log(num.isPositive());

/// Dangerous Aside

var a = 3;              // A number primitive
var b = new Number(3);  // A Number object

// In this case, == operator converts the operands to the same type (coercion), so in the end the expression is true.
console.log(a == b); // true

// Because strict equality does not make type conversion, this return false. This is where built-in function 
// constructors can be dangerous, this can be hard to debug.
console.log(a === b); // false

/// Dangerous Aside for Arrays

// NOTE: Arrays in Javascript are also objects! Because of that, you can modify the prototype property and add new
// properties and method and this can be dangerous if you loop the array with 'for..in' statement. See the example.

var arr = ['Luke', 'Leia', 'Anakin'];

// Prints out:
// 0: 'Luke'
// 1: 'Leia'
// 2: 'Anakin'
//
// As you see, arrays are effectively objects.
for (var prop in arr)
{
    console.log(prop + ': ' + arr[prop]);
}

// But if new properties and methods are added via prototype property, this will affect all the arrays.
Array.prototype.customProperty = 'Kame Hame Ha!';
Array.prototype.customMethod = function () { return "Hallo"; };

// Prints out:
// 0: 'Luke'
// 1: 'Leia'
// 2: 'Anakin'
// customProperty: Kame Hame Ha!
// customMethod: function () { return "Hallo"; }
//
// So, for..in statement is not the best way to loop over arrays in Javascript. It is recommended to use the classical
// for loop statement to iterates over the elements of an array.
for (var prop in arr)
{
    console.log(prop + ': ' + arr[prop]);
}


