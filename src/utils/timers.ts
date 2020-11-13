const pool: timer[] = [];

export const getTimer = (): timer =>
	pool.length > 0 ? (pool.pop() as timer) : CreateTimer();

export const startTimeout = (
	seconds: number,
	fn: () => void,
	timer?: timer | null,
): timer => {
	const t = timer ?? getTimer();

	TimerStart(t, seconds, false, () => {
		pool.push(t);
		fn();
	});

	return t;
};

export const startInterval = (seconds: number, fn: () => void): timer => {
	const t = getTimer();
	TimerStart(t, seconds, true, fn);
	return t;
};

export const clearTimer = (timer: timer): void => {
	PauseTimer(timer);
	pool.push(timer);
};
