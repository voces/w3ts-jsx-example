export const range = <T>(count: number, fn: (index: number) => T): T[] => {
	const arr = [];
	for (let i = 0; i < count; i++) arr.push(fn(i));
	return arr;
};
