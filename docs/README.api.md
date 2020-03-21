
### `nodelive.get(name:String)`

Gets a value from the nodelive internal memory.




### `nodelive.set(name:String, value:any)`

Saves a value in the nodelive internal memory.

Chainable method.




### `nodelive.put(Object:values)`

Saves a set of key-value pairs in the nodelive internal memory.

Chainable method.




### `nodelive.stringify(...args)`

Returns a JSON representation, no matter about circular JSON or functions.




### `nodelive.print(...data)`

Prints the data by console.

Chainable method.




### `nodelive.explore(...data)`

A more exhaustive printing of objects, functions, etc.

Chainable method.




### `nodelive.description(data:any)`

Returns a deep description of all the properties of an object. The description contains the
index (sorted alphabetically), the type of property and the property name.




### `nodelive.describe(data:any)`

Prints the description extracted of the passed object.

Chainable method.




### `nodelive.view(data:any)`

Stringifies and prints any data.

Chainable method.




### `nodelive.memory()`

Prints a memory usage summary.

Chainable method.




### `nodelive.cmd(command:String, options:Object)`

Synchronous. Execute command-line commands in a nut.




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

Asynchronous callback. Executes `js` code, embeded in `async` environment already.

Under the hood, `code`, `evaluate`, `live` and `editor` functions use this method to inject code
and output a standard response.




### `nodelive.editor(argsNames:Array<String>, args:Array<any>): Promise`

Asynchronous. Opens a file on your preferred editor (set it at `nodelive.PREFERRED_EDITOR`)
that when saved, it is injected.

It has the ability to pass parameters and rename them, for your code to receive them.

To get out, save an empty text.

### `nodelive.editor(args:Object): Promise`

Asynchronous. Same as the one before, but accepting a key-value pairs object for arguments injection.




### `nodelive.$require(...args)`

Allows to `require` files.




### `nodelive.$import(...args)`

Allows to `importFresh` (like a `require` but without cache) files.




### `nodelive.$resolve(...args)`

Allows to `path.resolve` files.



