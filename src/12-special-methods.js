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


