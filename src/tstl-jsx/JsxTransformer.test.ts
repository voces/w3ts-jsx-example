import * as tstl from "typescript-to-lua";
import { readFileSync } from "fs";

it.skip("works", async () => {
	const result = tstl.transpileProject(
		"src/tstl-jsx/JsxTransformer.tsconfig.json",
	);

	expect(result.diagnostics).toHaveLength(0);

	const lua = readFileSync(
		"src/tstl-jsx/__lua__/src/JsxTransformer.sample.lua",
		"utf-8",
	);

	expect(lua).toMatchSnapshot();
});
