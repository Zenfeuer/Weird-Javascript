# Functions

In Javascript, functions are objects. A function is a special type of object with a property called 'name' that is the name of the function and a property called 'code' that contains the code of the function and it is invokable. Also it contains another important properties and methods, this is going to be covered later.

Everything you can do with other types you can do with functions: Assign them to variables, pass them around, create them on the fly. This is because functions are objects. Even, you can declare anonymous functions in Javascript. This is called First Class Functions.

During the creation of the execution context of a function, Javascript creates a variable called 'arguments'. This variable contains all the parameters passed to the function in an array.

IMPORTANT NOTE: Objects (including functions) interact by reference when sending them equal to each other ot passing to a function (see examples below). Instead, primitives always interact by value.

IMPORTANT NOTE: Javascript does not support function overloading, because functions are objects.