/***********************************************************************************************************************
 * BUILT-IN FUNCTION CONSTRUCTORS
 *
 * There are some function constructors inside the Javascript architecture ready to be used. These built-in function
 * constructors allow to have have access to special methods depending on the prototype property.
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


