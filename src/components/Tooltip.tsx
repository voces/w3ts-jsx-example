import * as React from "../../node_modules/w3ts-jsx/dist/src/index";

compiletime(() => {
	const fs = require("fs-extra");
	fs.ensureFileSync("dist/map.w3x/assets/dyn.fdf");
	const cur = fs.readFileSync("dist/map.w3x/assets/dyn.fdf", "utf-8");
	const final = cur + "hello";
	fs.writeFileSync("dist/map.w3x/assets/dyn.fdf", final);
	return 0;
});

export const Tooltip = ({ content }: { content: string }): React.Node => (
	<frame
		name="QuestButtonBaseTemplate"
		// inherits="ScriptDialogButton"
		position={[
			{
				point: FRAMEPOINT_TOPLEFT,
				relative: "children",
				relativePoint: FRAMEPOINT_TOPLEFT,
				x: -16,
				y: 16,
			},
			{
				point: FRAMEPOINT_BOTTOMRIGHT,
				relative: "children",
				relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				x: 16,
				y: -16,
			},
		]}
	>
		<text
			size={{ width: 0.25 }}
			absPosition={[
				{
					point: FRAMEPOINT_CENTER,
					x: 0.4,
					y: 0.3,
				},
			]}
			text={content}
		/>
	</frame>
);
