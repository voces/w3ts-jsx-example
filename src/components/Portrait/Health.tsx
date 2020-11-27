import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { useInterval } from "../../hooks/useInterval";
import { MediumText } from "../Text";

/**
 * Returns a hex color code between red (0), yellow (0.5), and green (1).
 */
export const tweenHealthColor = (percent: number): number => {
	let r = 0;
	let g = 0;
	const b = 0;

	if (percent > 0.5) {
		g = 255;
		r = Math.round(((0.5 - (percent - 0.5)) / 0.5) * 255);
	} else {
		r = 255;
		g = Math.round((percent / 0.5) * 255);
	}

	return r * 256 ** 2 + g * 256 + b;
};

export const Health = ({ unit }: { unit: unit }): React.Node => {
	const forceUpdate = React.useForceUpdate();
	useInterval(0.5, () => forceUpdate());

	const health = GetUnitState(unit, UNIT_STATE_LIFE);
	const maxHealth = BlzGetUnitMaxHP(unit);
	const numerator = Math.round(health).toString();
	const formattedHealth =
		health === maxHealth ? numerator : `${numerator} / ${maxHealth}`;

	return (
		<MediumText
			text={formattedHealth}
			textColor={tweenHealthColor(health / maxHealth)}
			position={[
				{
					point: FRAMEPOINT_BOTTOM,
					relative: "previous",
					relativePoint: FRAMEPOINT_TOP,
					y: 7,
				},
			]}
		/>
	);
};
