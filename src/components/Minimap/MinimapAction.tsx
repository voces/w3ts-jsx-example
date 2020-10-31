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
	modifier?: "alt";
	tooltip: string;
	icon: string;
}

export const MinimapAction = ({
	action,
}: {
	action: MinimapActionType;
}): React.Node => (
	<container
		position={[
			{
				point: FRAMEPOINT_TOPRIGHT,
				relative: "previous",
				relativePoint: FRAMEPOINT_BOTTOMRIGHT,
			},
		]}
		size={{ width: 50, height: 46 }}
		tooltip={<Tooltip content={action.tooltip} />}
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
	</container>
);
