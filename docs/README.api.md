
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




### `nodelive.cmd(command:String, options:Object)`

Synchronous. Execute command-line commands in a nut.




### `nodelive.stringify(...args)`

Returns a JSON representation, no matter about circular JSON or functions.




### `nodelive.ask(message:String): Promise<String>`

Asynchronous. Prints a question. Returns an answer as string.




### `nodelive.askif(message:String, defaultValue:boolean): Promise<Boolean>`

Asynchronous. Prints a question. Returns an answer as boolean. By default, the answer is false.




### `nodelive.askone(options:Array<String>, message:String): Promise<String>`

Asynchronous. Prints a question and a numbered list. Returns the value selected from the list as string.




### `nodelive.code(message:String): Promise`

Asynchronous. Inject (multiline) code in live.

To get out, you must enter an empty line.




### `nodelive.evaluate(message:String): Promise`

Asynchronous. Evaluate js expressions (one line, something) of code in live.




### `nodelive.live(message:String): Promise`

Asynchronous. Inject (multiline) code in loop (so, a simple REPL) until you return "exit" (as a string).

To get out, you must `return 'exit'`.




### `nodelive.inspect(message:String): Promise`

Asynchronous. Explore the data that `nodelive` has saved in memory (from selector).




### `nodelive.executeCode(code:String, isMultiline:Boolean, ok:Function, fail:Function)`

Asynchronous callback. Executes code 




### `nodelive.editor()`

Asynchronous. Opens a file on your preferred editor (set it at `nodelive.PREFERRED_EDITOR`)
that when saved, it is injected.

To get out, save an empty text.



