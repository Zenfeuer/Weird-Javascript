/*******************************************************************************
 *
 * SCOPE CHAIN
 * 
 * Note: For further reference, read ch3.md
 *
 ******************************************************************************/

 function funcA ()
 {
    // Define functions inside in functions is possible, because functions are 
    // objects in Javascript.
    function funcB ()
    {
        // This prints the value '1' because scope chain. When this line is 
        // executed, myVar is not in the execution context of funcB(), so it 
        // looks for the outer environment of funcB() that is funcA(), but 
        // neither myVar is located there, so it looks for the outer environment
        // of funcA() that is the global execution context and finds myVar 
        // there. This is the SCOPE CHAIN.
        console.log(myVar);
        
        // Functions are also affected by Scope Chain, because functions are 
        // objects, so when this line is executed, it finds throuh scope chain 
        // that funcC() is located/defined lexically within funcA().
        funcC();
    }

    function funcC()
    {
        console.log('Hello from funcC()!');

        // When this is executed, this does not throw any errors because funcD()
        // is located in the global execution context.
        funcD();
    }
    
    // The scope of function funcB() is within funcA(), so it cannot be invoked 
    // outer of funcA(). This is because of the lexical environment, funcB() is 
    // 'sat' physically inside funcA().
    funcB();
}

function funcD()
{
    console.log('Hello from funcD()!');
}

var myVar = 1;
funcA();

