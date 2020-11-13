import * as React from "../node_modules/w3ts-jsx/dist/src/index";
import { App } from "./App";
import { colorize } from "./utils/colorize";

// eslint-disable-next-line prefer-const
declare let main: () => void;

const oldMain = main;

main = () => {
	oldMain();

	const t = CreateTimer();
	TimerStart(t, 0.25, false, () => {
		if (!BlzLoadTOCFile("assets/toc.toc"))
			print(colorize.red(`Unable to load toc "${"assets/toc.toc"}"`));

		BlzEnableUIAutoPosition(false);
		BlzHideOriginFrames(true);
		BlzFrameSetVisible(BlzGetFrameByName("ConsoleUIBackdrop", 0), false);
		React.render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
	});
};
