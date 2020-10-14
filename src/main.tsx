import * as React from "../node_modules/w3ts-jsx/dist/src/index";
import { App } from "./App";

// eslint-disable-next-line prefer-const
declare let main: () => void;

const oldMain = main;

main = () => {
	oldMain();

	const t = CreateTimer();
	TimerStart(t, 0.25, false, () => {
		// eslint-disable-next-line react/no-deprecated
		React.render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
	});
};
