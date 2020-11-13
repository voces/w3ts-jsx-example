import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";

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
			},
		]}
		size={{ width: 432, height: 279 }}
	>
		<backdrop
			position={["parent"]}
			texture={{
				texFile: "assets/detail-pane.tga",
			}}
		/>
		{/* {primaryUnit && (
			<>
				<Mana unit={primaryUnit} />
				<Health unit={primaryUnit} />
			</>
		)} */}
	</container>
);
