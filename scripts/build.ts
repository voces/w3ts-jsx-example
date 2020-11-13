import * as fs from "fs-extra";
import War3Map from "mdx-m3-viewer/src/parsers/w3x/map";
import * as path from "path";

import {
	compileMap,
	getFilesInDirectory,
	IProjectConfig,
	loadJsonFile,
	logger,
	toArrayBuffer,
} from "./utils";

function main() {
	const config: IProjectConfig = loadJsonFile("config.json");
	const result = compileMap(config);

	if (!result) {
		logger.error("Failed to compile map.");
		return;
	}

	logger.info("Creating w3x archive...");
	if (!fs.existsSync(config.outputFolder)) fs.mkdirSync(config.outputFolder);

	createMapFromDir(
		`${config.outputFolder}/2${config.mapFolder}`,
		`./dist/${config.mapFolder}`,
	);
}

/**
 * Creates a w3x archive from a directory
 * @param output The output filename
 * @param dir The directory to create the archive from
 */
export function createMapFromDir(output: string, dir: string): void {
	const map = new War3Map();
	const files = getFilesInDirectory(dir);

	map.archive.resizeHashtable(files.length);

	for (const fileName of files) {
		const contents = toArrayBuffer(fs.readFileSync(fileName));
		const archivePath = path.relative(dir, fileName);
		const imported = map.import(archivePath, contents);

		if (!imported) {
			logger.warn("Failed to import " + archivePath);
			continue;
		}
	}

	const result = map.save();

	if (!result) {
		logger.error("Failed to save archive.");
		return;
	}

	fs.writeFileSync(output, new Uint8Array(result));

	logger.info("Cloning to Windows...");

	fs.writeFile(
		"/mnt/c/Users/verit/Documents/Warcraft III/Maps/dev/w3ts-jsx-example.w3x",
		new Uint8Array(result),
	);

	logger.info("Finished!");
}

main();
