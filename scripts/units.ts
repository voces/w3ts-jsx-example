import { units, UnitSpec } from "wc3data/dist/index";

const getModel = (data: UnitSpec) => {
	const art = data.art;
	if (!art) return null;
	if ("file" in art) return art.file;
	return null;
};

console.log(
	Object.entries(units)
		.map(([id, data]): [string, { model: string | null }] => [
			id,
			{ model: getModel(data) },
		])
		.reduce(
			(units, [unitId, unit]) => Object.assign(units, { [unitId]: unit }),
			{},
		),
);
