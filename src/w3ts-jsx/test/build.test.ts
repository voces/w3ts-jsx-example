import * as tstl from "typescript-to-lua";
import { readFileSync } from "fs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globals = globalThis as any;
globals.TEXT_JUSTIFY_TOP = 0;
globals.TEXT_JUSTIFY_LEFT = 0;

it.skip("works", async () => {
	const result = tstl.transpileProject(
		"src/w3ts-jsx/test/test.tsconfig.json",
	);
	// const result = tstl.transpileProject("test.tsconfig.json");

	expect(result.diagnostics).toHaveLength(0);

	const lua = readFileSync("src/test/__lua__/bundle.lua", "utf-8");

	expect(lua).toMatchSnapshot();
	expect(lua.indexOf("createTextElement") >= 0).toBeTruthy();
});
