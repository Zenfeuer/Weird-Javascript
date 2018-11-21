/***********************************************************************************************************************
 * FUNCTION EXECUTION
 *
 * The code property of a function is invokable. When a function is invoked, it creates a new execution context that is
 * stacked at the top of the execution stack.
 *
 * When an execution context is created, the variable 'this' is going to point a different thing depending on how the 
 * function is invoked. There are a few scenarios where 'this' will be changed depending on how the function is called.
 *
 **********************************************************************************************************************/

// Global function statement. In this case, the outer environment of this function in the global execution context, so, 
// the 'this' points to window object.
function globalA ()
{
    console.log(this);

    // Assigning a new variable to the global object through the 'this' pointer. This is not a good practice, it is hard
    // to debug and can cause a lot of problems.
    this.newVariable = 'hello from newVariable';
}

// Global function expression, where also 'this' is pointing to window object.
var globalB = function()
{
    console.log(this);   
}

globalA();

// It is not necessary to use dot or [] operator to access newVariable, because it is attached to the global object.
console.log(newVariable); // not good!

globalB();

var globalC = {
    name: 'The globalC object',
    log: function() {

        // In this case, 'this' is not pointing to the global object, it is pointing to the object globalC. It is a 
        // better practice to assign 'this' to another variable to avoid confussion.
        var self = this;
        
        // This is modifying the name property of globalC, not adding a new var to the global object.
        self.name = 'Updated globalC object';
        console.log(self);
        
        // This function expression has still 'this' pointing to the object globalC. it occurs the same with a new
        // function stament defined here.
        var setname = function(newname) {
            self.name = newname;   
        }

        // This is modifying the name property of globalC, not adding a new var to the global object.
        setname('Updated again! The globalC object');

        // Prints the object globalC.
        console.log(self);

        // Defining a new object inside another object it changes again where the 'this' is pointing for the methods
        // declared in the new object
        var newObj = {
            name: 'Im a new object living in globalC',
            log: function () 
            {
                // Because log function lives within newObj object, now 'this' points to newObj when this log is invoked
                var self = this;

                // This updates newObj.name property
                self.name = 'newObj: Javascript can be crazy sometimes!';

                console.log('Logging from newObj');

                // This prints newObj object
                console.log(self);
            }
        };

        newObj.log();
    }
}

globalC.log();


