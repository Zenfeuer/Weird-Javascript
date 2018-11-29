/***********************************************************************************************************************
 * FUNCTION CONSTRUCTORS, OPERATOR NEW AND PROTOTYPE
 *
 * There is another way to create objects in Javascript using function constructors and the operator 'new'. A function
 * constructor sets the properties and methods for an object via 'this' keyword, because the 'new' operator creates the
 * new object and set the 'this' to point to that new object when the function constructor is executed. Also, 'new'
 * operator sets the prototype of that empty object to the prototype property of the function that you then call.
 *
 * All functions have access to an special property called prototype, used only by the 'new' operator, so this property
 * is used by function constructors. This is a CONFUSING name, because the 'prototype' property of a function IS NOT the
 * property of the function.
 *
 * For memory efficiency, it is better to define the methods in the prototype and not in the function constructor, and
 * only define the properties in the function constructor.
 *
 **********************************************************************************************************************/

// A function constructor
function Person(firstname, lastname)
{
    // If this function is invoked with the operator 'new' preceding, 'this' points to the new empty object created by
    // 'new' operator.
    console.log(this);

    // Setting properties to the new object
    this.firstname = firstname;
    this.lastname = lastname;

    // If you define a method in the function constructor, every object is going to have its own copy of this method, 
    // taking much more memory space.
    //this.fn = function () {};

    console.log('This function constructor is invoked.');

    // If you return something in a function constructor, so the variable will have the returned value and not the new
    // object
    //return "This is Sparta!!!!";
}

// This add getFullName() to the prototype Person, so the objects created with the function constructor Person are going
// to have access to this method because prototype chain.
Person.prototype.getFullName = function ()
{
    return this.firstname + ' ' + this.lastname;
}

// 'new' operator creates an empty object, then calls the function constructor Person with 'this' pointing to the new 
// object, and whatever modification don to that object using the 'this' variable will end up as part of that object 
// and that's what returned.
// NOTE: if you forget the 'new' operator, Person function is executed anyways, but the object is not created, its value
// will be undefined.
var luke = new Person('Luke', 'Skywalker');
console.log(luke);

// luke object has access to getFullName() because its prototype is Person (prototype chain).
console.log(luke.getFullName());

var leia = new Person('Leia', 'Organa');
console.log(leia);

// This add getFormalFullName() to the prototype Person, so the objects created with the function constructor Person are
// going to have access to this method because prototype chain.
Person.prototype.getFormalFullName = function ()
{
    return this.lastname + ', ' + this.firstname;
}

// leia object has access to getFullName() because its prototype is Person (prototype chain).
console.log(leia.getFormalFullName());


