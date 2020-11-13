import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { Health } from "./Health";
import { Mana } from "./Mana";

export const Portrait = ({
	primaryUnit,
}: {
	primaryUnit: unit | undefined;
}): React.Node => {
	React.useEffect(() => {
		// There's no way to get an arbitrary unit's model (without
		// preprocessing), so we'll just reuse the frame. :(
		BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), true);

		return () =>
			BlzFrameSetVisible(
				BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0),
				false,
			);
	});

	return (
		<container
			position={[
				{
					point: FRAMEPOINT_BOTTOMLEFT,
					relative: "parent",
					relativePoint: FRAMEPOINT_BOTTOMLEFT,
					x: 386,
				},
			]}
			size={{ width: 221, height: 277 }}
		>
			<backdrop
				position={["parent"]}
				texture={{
					texFile: "assets/portrait.tga",
				}}
			/>
			{primaryUnit && (
				<>
					<Mana unit={primaryUnit} />
					<Health unit={primaryUnit} />
				</>
			)}
		</container>
	);
};
