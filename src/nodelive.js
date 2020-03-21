const fs = require("fs");
const path = require("path");
const util = require("util");
const _debug = require("debug");
const cp = require("child_process");
const inquirer = require("inquirer");
const stringify = require("json-stringify-safe");
const exec = require("execute-command-sync");
const importFresh = require("import-fresh");
const chalk = require("chalk");
const chokidar = require("chokidar");
const beautify = require("js-beautify").js;
const sizeof = require("object-sizeof");
const memory = {};
const debug = _debug("nodelive");
const displayForm = inquirer.createPromptModule();

_debug.enable("nodelive");

class nodelive {

	static initializeGlobalAPI() {
		if (global.$hasnodelive) {
			return;
		}
		Object.assign(global, {
			$hasnodelive: true,
			$nodelive: this,
			$dirname: process.cwd(),
			$require: function(...args) {
				return require(path.resolve(process.cwd(), ...args));
			},
			$import: function(...args) {
				return importFresh(path.resolve(process.cwd(), ...args));
			},
			$resolve: function(...args) {
				return path.resolve(process.cwd(), ...args);
			},
		});
	}

	/**
	 * 
	 * ### `nodelive.get(name:String)`
	 * 
	 * Gets a value from the nodelive internal memory.
	 * 
	 */
	static get(name) {
		if (typeof name === "undefined") {
			return memory;
		}
		if (!(name in memory)) {
			throw new Error("nodelive cannot find <" + name + ">");
		}
		return memory[name];
	}

	/**
	 * 
	 * ### `nodelive.set(name:String, value:any)`
	 * 
	 * Saves a value in the nodelive internal memory.
	 * 
	 */
	static set(name, value) {
		if (name in memory) {
			throw new Error("nodelive has already declared <" + name + ">");
		}
		memory[name] = value;
		return this;
	}

	/**
	 * 
	 * ### `nodelive.put(Object:values)`
	 * 
	 * Saves a set of key-value pairs in the nodelive internal memory.
	 * 
	 */
	static put(values) {
		Object.keys(values).forEach(key => {
			const value = values[key];
			this.set(key, value);
		});
		return this;
	}

	/**
	 * 
	 * ### `nodelive.stringify(...args)`
	 * 
	 * Returns a JSON representation, no matter about circular JSON or functions.
	 * 
	 */
	static stringify(...args) {
		return stringify(...args);
	}

	/**
	 * 
	 * ### `nodelive.print(...data)`
	 * 
	 * Prints the data by console.
	 * 
	 */
	static print(...data) {
		debug(...data);
		return this;
	}

	/**
	 * 
	 * ### `nodelive.explore(...data)`
	 * 
	 * A more exhaustive printing of objects, functions, etc.
	 * 
	 */
	static explore(data, deepDebug = false) {
		const isFunc = typeof data === "function";
		if(isFunc) {
			if(deepDebug) {
				const fnSource = data.toString();
				console.log(chalk.gray(beautify(fnSource)));
			}
		}
		if(["function", "object"].indexOf(typeof data)) {
			this.print(Object.assign({}, data));
		} else {
			this.print(data);
		}
		this.print("(" + (isFunc ? sizeof(data.toString()) : sizeof(data)) + " bytes)")
		return this;
	}

	/**
	 * 
	 * ### `nodelive.memory()`
	 * 
	 * Prints a memory usage summary.
	 * 
	 */
	static memory() {
		const used = process.memoryUsage();
		for (let key in used) {
			debug(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
		}
		return this;
	}

	/**
	 * 
	 * ### `nodelive.cmd(command:String, options:Object)`
	 * 
	 * Synchronous. Execute command-line commands in a nut.
	 * 
	 */
	static cmd(...args) {
		return exec(...args);
	}

	/**
	 * 
	 * ### `nodelive.ask(message:String): Promise<String>`
	 * 
	 * Asynchronous. Prints a question. Returns an answer as string.
	 * 
	 */
	static ask(message = "") {
		return new Promise((ok, fail) => {
			const q = message;
			debug(q);
			displayForm([{
				type: "input",
				name: "answer",
				message: " ",
				prefix: "",
				suffix: "",
			}]).then(answer => {
				ok(answer.answer)
			}).catch(fail)
		});
	}

	/**
	 * 
	 * ### `nodelive.askif(message:String, defaultValue:boolean): Promise<Boolean>`
	 * 
	 * Asynchronous. Prints a question. Returns an answer as boolean. By default, the answer is false.
	 * 
	 */
	static askif(message, defaultValue = false) {
		return new Promise((ok, fail) => {
			const q = message;
			debug(q);
			displayForm([{
				type: "confirm",
				name: "answer",
				message: " ",
				prefix: "",
				suffix: "",
				default: defaultValue
			}]).then(answer => {
				ok(answer.answer);
				return;
				const negated = data.value.toLowerCase().indexOf("n") === 0 || data.value.toLowerCase().indexOf("f") === 0;
				const affirmated = data.value.toLowerCase().indexOf("y") === 0 || data.value.toLowerCase().indexOf("t") === 0;
				ok(negated ? false : affirmated ? true : defaultValue);
			}).catch(fail)
		});
	}

	/**
	 * 
	 * ### `nodelive.askone(options:Array<String>, message:String): Promise<String>`
	 * 
	 * Asynchronous. Prints a question and a numbered list. Returns the value selected from the list as string.
	 * 
	 */
	static askone(options, message = "") {
		return new Promise((ok, fail) => {
			const q = message;
			debug(q);
			const optionsList = Object.values(options).concat(["[exit]"]);
			console.log(optionsList.reduce((output, item, index) => {
				output += "    " + (index + 1) + ") " + item + (index === optionsList.length - 1 ? "" : "\n");
				return output;
			}, ""))
			const again = () => {
				displayForm([{
					type: "input",
					name: "answer",
					message: " ",
					prefix: "",
					suffix: "",
					choices: Object.values(options)
				}]).then(answer => {
					if (parseInt(answer.answer) === (optionsList.length)) {
						ok(undefined);
					}
					if (!((answer.answer - 1) in options)) {
						debug("Choose a valid number of the list, please.");
						again();
					} else {
						ok(options[answer.answer - 1]);
					}
					return;
				}).catch(fail)
			}
			again();
		});
	}

	/**
	 * 
	 * ### `nodelive.code(message:String): Promise`
	 * 
	 * Asynchronous. Inject (multiline) code in live.
	 * 
	 * To get out, you must enter an empty line.
	 * 
	 */
	static code(message) {
		return this._evaluate(message, true)
	}

	/**
	 * 
	 * ### `nodelive.evaluate(message:String): Promise`
	 * 
	 * Asynchronous. Evaluate js expressions (one line, something) of code in live.
	 * 
	 */
	static evaluate(message) {
		return this._evaluate(message, false);
	}

	/**
	 * 
	 * ### `nodelive.live(message:String): Promise`
	 * 
	 * Asynchronous. Inject (multiline) code in loop (so, a simple REPL) until you return "exit" (as a string).
	 * 
	 * To get out, you must `return 'exit'`.
	 * 
	 */
	static live(message) {
		return new Promise((ok, fail) => {
			const again = () => {
				this.code(message).then(value => {
					if (value === "exit") {
						ok();
					} else {
						again();
					}
				}).catch(error => {
					this.print(error);
				});
			}
			again();
		});
	}

	/**
	 * 
	 * ### `nodelive.inspect(message:String): Promise`
	 * 
	 * Asynchronous. Explore the data that `nodelive` has saved in memory (from selector).
	 * 
	 */
	static inspect(message = false) {
		return new Promise((ok, fail) => {
			const next = () => {
				this.askone(Object.keys(memory), message ? message : undefined).then(value => {
					if (typeof value === "undefined") {
						ok();
						return
					}
					this.print("Type:    " + typeof(value));
					this.print("Label:   " + value);
					this.print("Value:   " + chalk.green.bold(this.stringify(memory[value], null, 2)));
					next();
				});
			};
			next();
		})
	}

	static _evaluate(message = false, isMultiline = false) {
		this.initializeGlobalAPI();
		return new Promise((proceed, stop) => {
			new Promise((ok, fail) => {
				if (message) {
					debug(message);
				}
				let alive = true;
				const lines = [];
				const next = () => {
					displayForm([{
						type: "input",
						name: "answer",
						message: " ",
						prefix: "",
						suffix: "",
					}]).then(answer => {
						if (isMultiline) {
							if (answer.answer === "") {
								const code = lines.join("\n");
								ok(code);
							} else {
								lines.push(answer.answer);
								next();
							}
						} else {
							ok(answer.answer);
						}
					}).catch(fail)
				};
				next();
			}).then(input => {
				this.executeCode(input, isMultiline, proceed, stop);
			}).catch(stop);
		});
	}

	/**
	 * 
	 * ### `nodelive.executeCode(code:String, isMultiline:Boolean, ok:Function, fail:Function)`
	 * 
	 * Asynchronous callback. Executes `js` code, embeded in `async` environment already.
	 * 
	 * Under the hood, `code`, `evaluate`, `live` and `editor` functions use this method to inject code
	 * and output a standard response.
	 * 
	 */
	static executeCode(input, isMultiline, ok, fail, argsNames = [], args = []) {
		const code = beautify(!isMultiline ? `(async (${argsNames.join(", ")}) => {
			try {
				return ${input}
			} catch(error) {
				this.debugError(error);
			}
		})(...args)` : `(async (${argsNames.join(", ")}) => {
			try {
				${input}
			} catch(error) {
				this.debugError(error);
			}
		})(...args)`);
		debug(chalk.red.bold("[code:]"));
		console.log(chalk.blackBright.bold(code));
		console.log();
		let output, hadError = false;
		try {
			output = eval(code);
		} catch (error) {
			hadError = true;
			output = error;
		}
		if (hadError) {
			this.debugError(error);
		} else {
			debug(chalk.green.bold("[output:]"));
			console.log(this.stringify(output, null, 2));
		}
		if (output instanceof Promise) {
			output.then(result => {
				debug("[asynchronous output:]");
				console.log(util.inspect(result));
				console.log();
				try {
					ok(result);
				} catch (error) {
					fail(error);
				}
			}).catch(fail);
		} else {
			try {
				ok(output);
			} catch (error) {
				fail(error);
			}
		}
	}

	static debugError(error) {
		debug(chalk.red.bold("[error message:]"));
		console.log(this.stringify(error.message, null, 2));
		debug(chalk.red.bold("[error data:]"));
		console.log(util.inspect(error, null, 2));
	}

	/**
	 * 
	 * ### `nodelive.editor()`
	 * 
	 * Asynchronous. Opens a file on your preferred editor (set it at `nodelive.PREFERRED_EDITOR`)
	 * that when saved, it is injected.
	 * 
	 * To get out, save an empty text.
	 * 
	 */
	static editor(argsNames, args) {
		return new Promise((ok, fail) => {
			let watcher;
			const pathToFileTemp = path.resolve(process.cwd(), ".nodelive.live.js");
			fs.writeFileSync(pathToFileTemp, "", "utf8");
			const editorProcess = cp.spawn(this.PREFERRED_EDITOR, [pathToFileTemp], {
				detached: true,
				stdio: "inherit"
			});
			const onSuccess = (contents) => {
				if(contents === "") {
					editorProcess.kill();
					watcher.close();
					return ok();
				}
				this.executeCode(contents, true, data => this.print("success", data), error => this.print(error), argsNames, args);
			};
			watcher = chokidar.watch(pathToFileTemp).on("change", () => {
				this.print("Injecting...");
				fs.readFile(pathToFileTemp, "utf8", (error, contents) => {
					if(error) {
						this.debugError(error);
						return;
					}
					onSuccess(contents);
				});
			});
		});
	}

}

nodelive.PREFERRED_EDITOR = "subl";

global.nodelive = nodelive;

module.exports = nodelive;