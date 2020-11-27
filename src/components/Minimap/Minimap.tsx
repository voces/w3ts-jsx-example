import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { BlackBackground } from "../BlackBackground";
import { MinimapAction, MinimapActionType } from "./MinimapAction";

export const Minimap = ({
	actions,
}: {
	actions: MinimapActionType[];
}): React.Node => {
	BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP, 0), true);

	return (
		<container
			position={[
				{
					point: FRAMEPOINT_BOTTOMLEFT,
					relative: "parent",
					relativePoint: FRAMEPOINT_BOTTOMLEFT,
				},
			]}
			size={{ width: 413, height: 327 }}
		>
			<BlackBackground padding={{ horizontal: 16, top: 32 }} />
			<backdrop
				position={["parent"]}
				texture={{
					texFile: "assets/minimap.tga",
				}}
			/>
			<container
				position={[
					{
						point: FRAMEPOINT_TOPRIGHT,
						relative: "previous",
						relativePoint: FRAMEPOINT_TOPRIGHT,
						x: -56,
						y: -32,
					},
				]}
				size={{ width: 50, height: 250 }}
			>
				{actions.map((action) => (
					<MinimapAction action={action} />
				))}
			</container>
		</container>
	);
};
