import { useState } from "../../node_modules/w3ts-jsx/dist/src/index";
import { clearTimer, startTimeout } from "../utils/timers";

export const useTimeout = (seconds: number, callback: () => void): void => {
	const [timeout, setTimeout] = useState<timer | null>(null);
	if (timeout) clearTimer(timeout);
	setTimeout(startTimeout(seconds, callback));
};
