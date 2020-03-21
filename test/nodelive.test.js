const {
	expect
} = require("chai");
const nodelive = require(__dirname + "/../src/nodelive.js");
const data = {
	a: 123,
	b: function() {
		console.log("hello!");
	}
}

describe("nodelive class", function() {

	it("nodelive.set(name, value)", function() {
		nodelive.set("message", "bye!");
	});

	it("nodelive.put(values)", function() {
		nodelive.put({"things": [0,1,2]});
	});

	it("nodelive.get(name)", function() {
		expect(nodelive.get("message")).to.equal("bye!");
	});

	it("nodelive.get()", function() {
		expect(nodelive.get()).to.deep.equal({
			message: "bye!",
			things: [0,1,2]
		});
	});

	it("nodelive.print(...data)", function() {
		nodelive.print({
			some: "data"
		});
	});

	it("nodelive.description(data)", async function() {
		this.timeout(100*1000);
		try {
			const a = "aaa", b = "bbb", c = "ccc";
			console.log(nodelive.description({a,b,c}));
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.describe(data)", async function() {
		this.timeout(100*1000);
		try {
			const a = "aaa", b = "bbb", c = "ccc";
			nodelive.describe({a,b,c});
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.view(data)", async function() {
		this.timeout(100*1000);
		try {
			const a = "aaa", b = "bbb", c = "ccc";
			nodelive.view({a,b,c});
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.explore()", async function() {
		try {
			this.timeout(60*1000);
			nodelive.explore((a = 100) => a + 500);
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.memory()", function() {
		nodelive.memory();
	});

	it("nodelive.ask()", async function() {
		try {
			this.timeout(60 * 1000);
			const answer = await nodelive.ask("can you write 'ok'?");
			expect(answer).to.equal("ok");
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.askif()", async function() {
		try {
			this.timeout(60 * 1000);
			const answer = await nodelive.askif("do you like this tool?");
			expect(answer).to.equal(true);
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.askone()", async function() {
		try {
			this.timeout(60 * 1000);
			const answer = await nodelive.askone(["a", "b", "c", "d"], "Type 1:");
			expect(answer).to.equal("a");
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.evaluate()", async function() {
		try {
			this.timeout(60 * 1000);
			nodelive.print("write <'ok'> (quotes included)");
			const result = await nodelive.evaluate();
			expect(result).to.equal("ok");
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.code()", async function() {
		try {
			this.timeout(60 * 1000);
			nodelive.print("write <return 'ok'>");
			const result = await nodelive.code();
			expect(result).to.equal("ok");
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.live()", async function() {
		try {
			this.timeout(60*1000);
			await nodelive.live("return <'exit'> to leave");
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.cmd()", async function() {
		try {
			nodelive.cmd("echo 'hello from the inside'");
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.inspect()", async function() {
		try {
			this.timeout(60 * 1000);
			nodelive.set("messageForDogs", "respect cats");
			nodelive.set("messageForCats", {
				respect: "rats"
			});
			nodelive.set("messageForHumans", ["please", {
				respect: "all"
			}]);
			nodelive.print("Select last option to exit.");
			await nodelive.inspect();
		} catch (error) {
			console.log(error);
		}
	});

	it("nodelive.editor()", async function() {
		this.timeout(100*1000);
		try {
			await nodelive.editor(["a", "b", "c"], ["aaa","bbb","ccc"]);
		} catch(error) {
			console.log(error);
		}
	});

	it("nodelive.editor({...mapping}')", async function() {
		this.timeout(100*1000);
		try {
			const a = "aaa", b = "bbb", c = "ccc";
			await nodelive.editor({a,b,c});
		} catch(error) {
			console.log(error);
		}
	});

});