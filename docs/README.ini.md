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

