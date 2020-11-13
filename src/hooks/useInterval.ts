import {
	useEffect,
	useState,
} from "../../node_modules/w3ts-jsx/dist/src/index";
import { clearTimer, startInterval } from "../utils/timers";

export const useInterval = (seconds: number, callback: () => void): void => {
	const [timer, setTimer] = useState<timer | null>(null);
	if (timer) clearTimer(timer);
	setTimer(startInterval(seconds, callback));
	useEffect(() => () => timer && clearTimer(timer), [timer]);
};
