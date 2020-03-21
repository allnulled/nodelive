# nodelive

Dynamic interaction within nodejs programs.

## Install

`$ npm i -D nodelive`

## Why?

To inject code in live node executions.

To not have to open Chrome to debug nodejs.

To debug, in live, from the inside, with some tools already.

To hack other programs easily too, why not.

## Features

 - [✔] Live code injection and exploration.
 - [✔] Memory usage printing.
 - [✔] Advanced printing for debugging.
    - [✔] Functions source code.
    - [✔] Circular JSON structures.
 - [✔] Easy command line interface input for:
    - [✔] Text
    - [✔] Confirm
    - [✔] Options

## Get started

This package consists in 1 unique object that exposes the whole API.

To import it:

```js
const nodelive = require("nodelive");
```

To see the examples, please go to the tests of the project at Github.

## Demo

You will find examples of the usable API for the next topics:

   - [✔] For general help
   - [✔] For console
   - [✔] For editor

### For general help

#### *Store and retrieve values from nodelive (a simple helper storage).*

```js
nodelive.set("a", "a").put({b:"b",c:"c"});
nodelive.get("b");   // >> "b"
nodelive.get();      // >> {a:"a",b:"b",c:"c"}
```

#### *Stringify (supports circular JSON).*

```js
nodelive.stringify({some:"object"}, null, 2);
```

#### *Print message.*

```js
nodelive.print("Some message");
```

#### *Explore any type of data.*

```js
nodelive.explore(data => 500);
```

#### *Show memory usage.*

```js
nodelive.memory();
```

### For console

#### *Ask for user input (as string).*

```js
const name = await nodelive.ask("What is your name?");
```

#### *Ask for user input (as boolean).*

```js
const isBusy = await nodelive.askif("Are you very busy right now?");
```

#### *Ask for user input, as options election (of strings).*

```js
const optionSelected = await nodelive.askone(["option a", "option b", "option c"], "Choose an option:");
```

#### *Execute command for the native console synchronously*

```js
await nodelive.cmd("npm run test")
```

#### *Enter into a command-line loop to inject code!*

```js
await nodelive.code()
```

#### *Evaluate specific expression from console!*

```js
await nodelive.evaluate()
```

### For editors

#### *Open editor and inject code in live!*

```js
const parameterNames = ["name", "age"];
const parameters = ["Carlos", "50"];
nodelive.PREFERRED_EDITOR = "brackets"; // By default it is "subl" of Sublime Text!
await nodelive.editor(parameterNames, parameters);
```

## API

Here you can have an overview of the whole API.

*Note: all the code injections support `await` expressions by default.*



### `nodelive.get(name:String)`

Gets a value from the nodelive internal memory.




### `nodelive.set(name:String, value:any)`

Saves a value in the nodelive internal memory.




### `nodelive.put(Object:values)`

Saves a set of key-value pairs in the nodelive internal memory.




### `nodelive.stringify(...args)`

Returns a JSON representation, no matter about circular JSON or functions.




### `nodelive.print(...data)`

Prints the data by console.




### `nodelive.explore(...data)`

A more exhaustive printing of objects, functions, etc.




### `nodelive.memory()`

Prints a memory usage summary.




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

Asynchronous callback. Executes code 




### `nodelive.editor()`

Asynchronous. Opens a file on your preferred editor (set it at `nodelive.PREFERRED_EDITOR`)
that when saved, it is injected.

To get out, save an empty text.





## Additionals

When interaction in live inside your programs, you have a global API automatically injected to `global` object.

  - `$hasnodelive`: `boolean` indicating if the library was loaded.
  - `$nodelive`: master `object` of the API.
  - `$dirname`: same as `process.cwd()`.
  - `$require`: same as using `require` but from `process.cwd()`.
  - `$import`: same as using uncached `require` but from `process.cwd()`
  - `$resolve`: same as using `path.resolve` but from `process.cwd()`


## License

This project is under [WTFPL or What The Fuck Public License](http://www.wtfpl.net), which means 'do what you want'.