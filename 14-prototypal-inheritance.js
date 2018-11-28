/***********************************************************************************************************************
 * PROTOTYPAL INHERITANCE
 *
 * Each programming language manages the inheritance in different way. Javascript works with prototypal inheritance, 
 * that is simpler, flexible, extensible and easy to understand. Javascript's object system is based on PROTOTYPES, not
 * classes. Prototypal inheritance is no more than objects inherits from other objects.
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


