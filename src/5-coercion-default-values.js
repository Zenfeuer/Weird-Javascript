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