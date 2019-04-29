/*******************************************************************************
 *
 * OBJECTS
 *
 * Note: For further reference, read ch6.md
 *
 ******************************************************************************/

// Creating an object with new Object() constructor. At this point, person is an
// empty object.
var person = new Object();

// Properties can be created/accessed with [] operator passing the name of the
// property to be created/accessed.
person["firstname"] = "Darwing";
person["lastname"] = "Zenfy";

// Also, you can pass a variable to [] operator that contains the name of the 
// property that you want to access.
var firstNameProperty = "firstname";
console.log(person[firstNameProperty]);

// Also, you can use the dot operator to access the properties and methods for 
// an object.
console.log(person.firstname);
console.log(person.lastname);

// Unlike other programming languages, this does not throw an error, this 
// returns undefined. This means that you can always add properties and 
// functions on the fly for an object.
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

    // In this case, this is not pointing to the global object but to the person
    // object. This can be confused.
    console.log(greeting + " " + this.firstname + " " + this.lastname);
}

console.log(person.address.street);
console.log(person.address.city);
console.log(person["address"]["state"]);

// Invoking the function contained in person object
person.printFullName("Hola");

// Also you can invoke a function with the [] operator, but you need to specify
// the parenthesis to really invoke the function (and to pass the parameters). 
// person["printFullName"] it just returs the code of the function.
person["printFullName"];
console.log(person["printFullName"]);

// Correct way to invoke functions in objects using [] operator.
person["printFullName"]();

// Note that this throws an error, because at this point Darwing variable is 
// undefined. 
//greetPerson(Darwing);

// Object literal declaration. Actually, this way is the most used, because is 
// more redable and easier to write.
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

