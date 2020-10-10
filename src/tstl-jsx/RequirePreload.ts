import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

export const RequirePreload: tstl.Plugin = {
	visitors: {
		[ts.SyntaxKind.SourceFile]: (
			node: ts.SourceFile,
			context: tstl.TransformationContext,
		): tstl.Block => {
			const [fileContent] = context.superTransformNode(
				node,
			) as tstl.Block[];
			if (context.isModule) {
				const moduleFunction = tstl.createFunctionExpression(
					fileContent,
					undefined,
					undefined,
					undefined,
				);
				let moduleName = context.sourceFile.fileName.split("src")[1];
				console.log("received", moduleName);
				if (moduleName.startsWith("/"))
					moduleName = moduleName.substring(1);
				if (moduleName.endsWith(".tsx"))
					moduleName = moduleName.substring(0, moduleName.length - 4);
				if (moduleName.endsWith(".ts"))
					moduleName = moduleName.substring(0, moduleName.length - 3);
				moduleName = moduleName.split("/").join(".");
				moduleName = moduleName.replace(".index", "");
				console.log("final", moduleName);
				// Skip init.lua so it can be the entry-point
				if (moduleName === "init") return fileContent;

				// Generates:
				// require("module/name", function() ... end)
				const moduleCallExpression = tstl.createCallExpression(
					tstl.createIdentifier("require"),
					[tstl.createStringLiteral(moduleName), moduleFunction],
				);

				return tstl.createBlock([
					tstl.createExpressionStatement(moduleCallExpression),
				]);
			}
			return fileContent;
		},
	},
};

// import { transformSourceFileNode } from "typescript-to-lua/dist/transformation/visitors/sourceFile";

// export const RequirePreload: tstl.Plugin = {
// 	visitors: {
// 		[ts.SyntaxKind.SourceFile]: (
// 			node: ts.SourceFile,
// 			context: tstl.TransformationContext,
// 		): tstl.Block => {
// 			if ()
// 			console.log(node);
// 			return transformSourceFileNode(node, context);
