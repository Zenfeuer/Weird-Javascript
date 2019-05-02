/*******************************************************************************
 *
 * ARRAYS
 *
 * Note: For further reference, read ch9.md
 *
 ******************************************************************************/

var arr = [

    // Number primitive
    42,

    // Boolean primitive 
    false, 

    // An object (literal syntax)
    {
        name: 'Darwing',
        address: 'Alderaan'
    },

    // A function expression
    function(name, greeting) 
    {
        greeting = greeting || 'Hello ';
        console.log(name + ', ' + greeting);
    },

    // String primitive
    "Im your father",

    // Another array
    [
        3.14,
        "Im pi!"
    ]
];

console.log(arr);
arr[3](arr[2].name, arr[4]);

