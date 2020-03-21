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
nodelive.explore(data => 500);
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

