
### `nodelive.set(name:String, value:any)`

Saves a value in the nodelive internal memory.




### `nodelive.put(Object:values)`

Saves a set of key-value pairs in the nodelive internal memory.




### `nodelive.get(name:String)`

Gets a value from the nodelive internal memory.




### `nodelive.print(...data)`

Prints the data by console.




### `nodelive.explore(...data)`

A more exhaustive printing of objects, functions, etc.




### `nodelive.memory()`

Prints a memory usage summary.




### `nodelive.ask(message:String): Promise<String>`

Asynchronous. Prints a question. Returns an answer as string.




### `nodelive.askif(message:String, defaultValue:boolean): Promise<Boolean>`

Asynchronous. Prints a question. Returns an answer as boolean. By default, the answer is false.




### `nodelive.askone(options:Array<String>, message:String): Promise<String>`

Asynchronous. Prints a question and a numbered list. Returns the value selected from the list as string.




### `nodelive.code(message:String): Promise`

Inject (multiline) code in live.




### `nodelive.evaluate(message:String): Promise`

Inject (oneline) code in live.




### `nodelive.live(message:String): Promise`

Inject (multiline) code in loop (so, a simple REPL) until you return "exit" (as a string).




### `nodelive.inspect(message:String): Promise`

Explore the data that `nodelive` has saved in memory (from selector).




### `nodelive.stringify(...args)`

Returns a JSON representation, no matter about circular JSON or functions.




### `nodelive.cmd(command:String, options:Object)`

Execute command-line commands in a nut.



