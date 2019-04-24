/***********************************************************************************************************************
 * FUNCTIONAL PROGRAMMING
 *
 * Thanks to first class functions, functional programming is possible in Javascript.
 *
 **********************************************************************************************************************/

// Apply the function passed to each element in the array
function mapForEach (arr, fn)
{
    var newArr = [];

    for (var i = 0; i < arr.length; i++)
    {
        newArr.push(
            // Call the function and pass the i-th element
            fn(arr[i])   
        );
    }
    
    return newArr;
}

var arr1 = [1, 2, 3];
console.log(arr1);

// You can make different work over the array, in this case, multiply each item by 2
var arr2 = mapForEach(arr1, function (item)
{
   return item * 2; 
});

console.log(arr2);

// Also you can defined a function expression and pass the function variable to mapForEach
var fn = function (item)
{
    return item > 2;
}

// In this case, a boolean array is returned
var arr3 = mapForEach(arr1, fn);
console.log(arr3);

// Now, checking with a limiter
var checkPastLimit = function (limiter, item)
{
    return item > limiter;
}

// To pass the limiter it is needed to use bind, to preset the limiter
var arr4 = mapForEach(arr1, checkPastLimit.bind(null, 1));
console.log(arr4);

// To avoid to pass the 'this' value because it is not really used, you can create a function that returns another
// function with the limiter and the 'this' value preset
var checkPastLimitSimplified = function (limiter)
{
    // limiter param is preset by bind().
    // NOTE: it is not recommended DO NOT MUTATE in these tiny functions, if you need to, it is recommend to return the 
    // new data and not affect the original one. Also, it is recommended to mutate data as high up in that chain as
    // possible of functions.
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter); 
};

// Now, it is needed to pass only the limiter
var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));
console.log(arr5);


