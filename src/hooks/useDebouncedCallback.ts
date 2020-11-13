import {
	useEffect,
	useState,
} from "../../node_modules/w3ts-jsx/dist/src/index";
import { clearTimer, getTimer, startTimeout } from "../utils/timers";

const placeholder = () => {
	/* do nothing */
};

export const useDebouncedCallback = (
	fn: () => void,
	seconds: number,
): (() => void) => {
	const wrappedFnState = useState<() => void>(placeholder);
	let wrappedFn = wrappedFnState[0];
	const setWrappedFn = wrappedFnState[1];

	const timerState = useState<timer | null>(null);
	let timer = timerState[0];
	const setTimer = timerState[1];

	if (wrappedFn === placeholder) {
		timer = getTimer();
		setTimer(timer);
		wrappedFn = () => startTimeout(seconds, fn, timer);
		setWrappedFn(wrappedFn);
	}

	useEffect(() => () => timer && clearTimer(timer));

	return wrappedFn;
};
