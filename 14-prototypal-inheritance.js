/***********************************************************************************************************************
 * PROTOTYPAL INHERITANCE
 *
 * Each programming language manages the inheritance in different way. Javascript works with prototypal inheritance, 
 * that is simpler, flexible, extensible and easy to understand. Javascript's object system is based on PROTOTYPES, not
 * classes. Prototypal inheritance is no more than objects inherits from other objects.
 *
 * All objects has an special property called 'proto', that is another object and helps to implement the prototypal
 * inheritance. Everything that is not a primitive (basic object, function and array) they all have a prototype, except
 * one thing, the base object in Javascript => Object {}. This base object is in the bottom on prototype chain.
 *
 **********************************************************************************************************************/

// NOTE: This example is for demo purposes, NEVER assign the __proto__ directly, this can bring performance issues.

// A default person object
var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function () {
        return this.firstname + ' ' + this.lastname;  
    }
}

var john = {
    firstname: 'John',
    lastname: 'Cena'
}

// DON'T DO THIS EVER! For demo purposes only!!!
// In this case, we are forcing that john object inherits from person object. firstname and lastname properties are
// already defined in john object, so it does not inherits those properties from person (neither the values).
john.__proto__ = person;

// Now john object can access getFullName() method. This prints out 'John Cena'.
console.log(john.getFullName());

// Prints out 'John'
console.log(john.firstname);

var jane = {
    firstname: 'Jane'   
}

// DON'T DO THIS EVER! For demo purposes only!!!
// In this case, we are forcing that jane object inherits from person object. firstname property is already defined in 
// jane object, so it does not inherits that property from person (neither the value).
jane.__proto__ = person;

// Now jane object can access getFullName() method. This prints out 'Jane Default', because jane object has not defined
// lastname property, so by scope chain it uses the defined one from person object.
console.log(jane.getFullName());

// Mutating an object that is being inherited by other objects, those objects are also going to see/access the new
// added properties and methods, because of scope chain.
person.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;   
}

// Both can use getFormalFullName() method
console.log(john.getFormalFullName());
console.log(jane.getFormalFullName());

var a = {};
var b = function () {};
var c = [];

// The prototype of an object is Object {} and contains basic methods and properties that can be used for all objects 
// such as toString() or hasOwnProperty().
console.log(a.__proto__);

// The prototype of a function is function Empty () {} and contains basic methods and properties that can be used for 
// all functions such as call(), bind(), apply(), arguments, etc. The prototype of Empty() is Object {} because is on 
// the bottom of prototype chain.
console.log(b.__proto__);

// The prototype of an array is [] and contains basic methods and properties that can be used for all arrays such as 
// push(), length, etc. The prototypeo of [] is Object {} because is on the bottom of prototype chain.
console.log(c.__proto__);

console.log('----- Reflection example -----');

// Objects in Javascript can look up to their own properties and methods, this is called reflection. The following 
// example, the loop iterates over all properties and methods defined in john object, including the ones defined in the
// prototype. If you want to list/change the properties and methods of the object itself, you must used the method
// hasOwnProperty(propName) to apply the filter.
for (var prop in john)
{
    if (john.hasOwnProperty(prop))
    {
        console.log(prop + ': ' + john[prop]);
    }
}

console.log('----- End Reflection example -----');


