/*******************************************************************************
 *
 * IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
 *
 * Note: For further reference, read ch10.md
 *
 ******************************************************************************/

/**
 * Using an Immediately Invoked Function Expression (IIFE)
 * 
 * Note that darthVader now contains what returns the function and not the 
 * function itself, so using darthVader() throws an error because in this case 
 * is a string.
 */
var darthVader = function (quote)
{
    return 'Darth Vader said: ' + quote;

// Note that function is invoked on the fly passing the parameters needed
}('The circle is now complete. When I left you, I was but the learner. Now I am the master.');

console.log(darthVader);

var harveyDentQuote = 'You either die a hero or you live long enough to see yourself become the villain.';

// IIFE in anonymous function
(function (quote) {

    console.log('IIFE anonymous function!')
    console.log(quote);
    
}(harveyDentQuote));

// Another IIFE in anonymous function
(function (number1, number2) {
    console.log('Result is -> ' + (number1 * number2));

// This is also a valid way to pass parameters to an anonymous IIFE.
})(5, 7);

