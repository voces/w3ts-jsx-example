import { Tooltip } from "../Tooltip";
import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";

export interface MinimapActionType {
	name: string;
	hotkey:
		| "A"
		| "B"
		| "C"
		| "D"
		| "E"
		| "F"
		| "G"
		| "H"
		| "I"
		| "J"
		| "K"
		| "L"
		| "M"
		| "N"
		| "O"
		| "P"
		| "Q"
		| "R"
		| "S"
		| "T"
		| "U"
		| "V"
		| "W"
		| "X"
		| "Y"
		| "Z";
	modifiers?: "alt"[];
	description: string;
	icon: string;
	onClick: () => void;
}

export const MinimapAction = ({
	action,
}: {
	action: MinimapActionType;
}): React.Node => {
	let title = action.name;
	if (action.hotkey) {
		let hotkey;
		if (action.modifiers && action.modifiers.length > 0)
			hotkey = [
				...action.modifiers.map(
					(m) => m.slice(0, 1).toUpperCase() + m.slice(1),
				),
				action.hotkey,
			].join("-");
		else hotkey = action.hotkey;
		title = `${title} (|cfffed312${hotkey}|r)`;
	}

	return (
		<button
			position={[
				{
					point: FRAMEPOINT_TOPRIGHT,
					relative: "previous",
					relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				},
			]}
			size={{ width: 50, height: 46 }}
			tooltip={<Tooltip title={title} description={action.description} />}
			onClick={action.onClick}
		>
			<backdrop
				position={[
					{
						point: FRAMEPOINT_TOPRIGHT,
						relative: "parent",
						relativePoint: FRAMEPOINT_TOPRIGHT,
					},
				]}
				size={{ width: 50, height: 46 }}
				texture={{
					texFile: "assets/minimap-icon-frame-square.tga",
				}}
			/>
			<backdrop
				position={[
					{
						point: FRAMEPOINT_TOPRIGHT,
						relative: "parent",
						relativePoint: FRAMEPOINT_TOPRIGHT,
						x: -4,
						y: -2,
					},
				]}
				size={{ width: 42, height: 42 }}
				texture={{ texFile: action.icon }}
			/>
		</button>
	);
};
