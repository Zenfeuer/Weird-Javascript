# Asynchronous Callbacks

Javascript is synchronous and single threaded. To achieve asynchronous calls, Javascipt engine has a queue called Event Queue. This queue is evaluated periodically by Javascript engine and an event is going to be attended/executed when the execution stack is empty. So, Javascript is not really asynchronus with this approach (as mentioned, it is synchronus and single threaded), what is really happening is that the browser is putting/stacking events asynchronously in the Event Queue while code is running line by line.

