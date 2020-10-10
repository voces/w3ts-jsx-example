import * as React from "./w3ts-jsx/index";
import { App } from "./App";

// eslint-disable-next-line prefer-const
declare let main: () => void;

const oldMain = main;

main = () => {
	oldMain();

	// eslint-disable-next-line react/no-deprecated
	React.render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
};
