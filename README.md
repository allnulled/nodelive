# nodelive

Dynamic interaction within your nodejs programs.

## Install

`$ npm i -D nodelive`

## Why?

This is a tool aimed to make your development faster
by letting you execute javascript inside your programs.

With ES6 `async/await` feature, we can fake asynchronous
code blocking in our nodejs programs. What `nodelive` does
is to let you interact with your programs from the inside,
and thanks to `async/await`, it can be done almost effortlessly.

## Features

 - Live code injection and exploration.
 - Memory usage printing.
 - Advanced printing for debugging.
    - Functions source code.
    - Circular JSON structures.
 - Easy command line interface input for:
    - Text
    - Confirm
    - Options

## Get started

This package consists in 1 unique object that exposes the whole API.

To import it:

```js
const nodelive = require("nodelive");
```

To see the examples, please go to the tests of the project at Github.

## API

Here you can have an overview of the whole API.



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




### `nodelive.ask(message:String)`

Asynchronous. Prints a question. Returns an answer as string.




### `nodelive.askif(message:String, defaultValue:boolean)`

Asynchronous. Prints a question. Returns an answer as boolean. By default, the answer is false.




### `nodelive.askone(options:Array<String>, message:String)`

Asynchronous. Prints a question and a numbered list. Returns the value selected from the list.




### `nodelive.code(message:String)`

Inject (multiline) code in live.




### `nodelive.evaluate(message:String)`

Inject (oneline) code in live.




### `nodelive.live(message:String)`

Inject (multiline) code in loop (so, a simple REPL) until you return "exit" (as a string).




### `nodelive.inspect(message:String)`

Explore the data that `nodelive` has saved in memory (from selector).




### `nodelive.stringify(...args)`

Returns a JSON representation, no matter about circular JSON or functions.




### `nodelive.cmd(command:String, options:Object)`

Execute command-line commands in a nut.





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