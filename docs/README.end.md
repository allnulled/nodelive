
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