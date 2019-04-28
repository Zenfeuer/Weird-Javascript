/*******************************************************************************
 *
 * COERCION AND DEFAULT VALUES
 * 
 * Note: For further reference, read ch5.md
 *
 ******************************************************************************/

// The firts parameter is coerced to a string. The result is a string 
// value '12'.
var result = 1 + '2';

var isOk;

// Coercion is useful to verify lack of existence in if statements. Here, 
// 'undefined' value is coerced to false value.
if (isOk)
{
    console.log("isOK has value");
}
else
{
    console.log("isOK is undefined");
}

// Also is possible to force coercion using the primitive types of Javascript 
// as follows
Boolean("Hello");       // The value "Hello" is coerced to true
Number("haha");         // The value "haha" is coerced to NaN
String(undefined);      // The value undefined is coerced to "undefined"

// Initially, name is set with 'undefined' value.
function greet(name)
{
    // This is another example of coercion. The operator || returns true or 
    // false if the parameters passed are booleans, but if not so, it returns 
    // the value that can be coerced to true. In this case, if name is 
    // undefined, || is going to return '<Your name here>'.
    name = name || '<Your name here>';
    console.log('Hello ' + name);    
}

greet('Darwing');
greet();