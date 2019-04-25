# Global Execution Context, Hoisting and Execution

## Global Execution Context

Container/wrapper that contains the global object that in web is the `window` object and the keyword `this` that points to the global object. If there is an outer environment, a reference to that is also created.

Also contains the variables defined as global and the definitions of functions to be used when the code is running.

## Hoisting

During creation phase, all the global variables and functions are "hoisted", i.e., it setups the memory space for those functions and variables.

## Execution

When a function is invoked, a new execution context is stacked in the execution stack, this new execution context is similar to the global execution context, so the outer environment is the context where that function lives, mainly is the global execution context.