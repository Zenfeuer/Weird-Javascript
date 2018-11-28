/***********************************************************************************************************************
 * FUNCTION CONSTRUCTORS, OPERATOR NEW AND PROTOTYPE
 *
 * There is another way to create objects in Javascript using function constructors and the operator 'new'.
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

    console.log('This function constructor is invoked.');

    // If you return something in a function constructor, so the variable will have the returned value and not the new
    // object
    //return "This is Sparta!!!!";
}

// 'new' operator creates an empty object, then calls the function constructor Person with 'this' pointing to the new 
// object, and whatever modification don to that object using the 'this' variable will end up as part of that object 
// and that's what returned.
var luke = new Person('Luke', 'Skywalker');
console.log(luke);

var leia = new Person('Leia', 'Organa');
console.log(leia);


