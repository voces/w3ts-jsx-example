import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { BlackBackground } from "../BlackBackground";
import { MultiUnitDetailPane } from "./MultiUnitDetailPane";

export const DetailPane = ({
	units,
	primaryUnits,
}: {
	units: unit[];
	primaryUnits: unit[];
}): React.Node => (
	<container
		position={[
			{
				point: FRAMEPOINT_BOTTOMLEFT,
				relative: "previous",
				relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				x: -16,
			},
		]}
		size={{ width: 432, height: 279 }}
	>
		<BlackBackground padding={{ horizontal: 8, top: 32 }} />
		<backdrop
			position={["parent"]}
			texture={{
				texFile: "assets/detail-pane.tga",
			}}
		/>
		{units.length > 1 && (
			<MultiUnitDetailPane units={units} primaryUnits={primaryUnits} />
		)}
	</container>
);
