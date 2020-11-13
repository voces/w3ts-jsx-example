import { useInterval } from "../../hooks/useInterval";
import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { MediumText } from "../Text";
import { hex } from "../../utils/colorize";

export const Mana = ({ unit }: { unit: unit }): React.Node => {
	const forceUpdate = React.useForceUpdate();
	// useInterval(0.5, () => forceUpdate());

	const mana = GetUnitState(unit, UNIT_STATE_MANA);
	const maxMana = BlzGetUnitMaxMana(unit);
	const numerator = Math.round(mana).toString();
	const formattedMana =
		maxMana === 0
			? " "
			: mana === maxMana
			? numerator
			: `${numerator} / ${maxMana}`;

	return (
		<MediumText
			text={formattedMana}
			textColor={hex.mana}
			position={[
				{
					point: FRAMEPOINT_BOTTOM,
					relative: "parent",
					relativePoint: FRAMEPOINT_BOTTOM,
					y: 1,
					x: 10,
				},
			]}
		/>
	);
};
