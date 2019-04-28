/*******************************************************************************
 * 
 * ASYNCHRONOUS CALLBACKS
 * 
 * Note: For further reference, read ch4.md
 *
 ******************************************************************************/

// Long running function
function waitThreeSeconds()
{
    var ms = 3000 + new Date().getTime();

    while (new Date() < ms) {}

    console.log('finished function');
}

function clickHandler ()
{
    console.log('click event!');   
}

// Listen for the click event. clickHandler() function is not going to be 
// executed until execution stack is empty.
document.addEventListener('click', clickHandler);


waitThreeSeconds();
console.log('finished execution');


