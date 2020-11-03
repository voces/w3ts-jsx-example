import * as React from "../../node_modules/w3ts-jsx/dist/src/index";

compiletime(() => {
	const fs = require("fs-extra");
	fs.ensureFileSync("dist/map.w3x/assets/dyn.fdf");
	const cur = fs.readFileSync("dist/map.w3x/assets/dyn.fdf", "utf-8");
	const final = cur + "hello";
	fs.writeFileSync("dist/map.w3x/assets/dyn.fdf", final);
	return 0;
});

const TooltipFrame = ({
	children,
	reverse,
}: {
	children?: React.Children;
	reverse?: boolean;
}) => (
	<frame
		name="QuestButtonBaseTemplate"
		position={[
			{
				point: FRAMEPOINT_TOPLEFT,
				relative: reverse ? "children-reverse" : "children",
				relativePoint: FRAMEPOINT_TOPLEFT,
				x: -16,
				y: 16,
			},
			{
				point: FRAMEPOINT_BOTTOMRIGHT,
				relative: reverse ? "children-reverse" : "children",
				relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				x: 16,
				y: -16,
			},
		]}
	>
		{children}
	</frame>
);

type Point =
	| "topleft"
	| "top"
	| "topright"
	| "bottomleft"
	| "bottom"
	| "bottomright";

const TEXT_POINTS = ["topleft", "top", "topright"];

const cornerToFramepoint = {
	topleft: FRAMEPOINT_TOPLEFT,
	top: FRAMEPOINT_TOPLEFT,
	topright: FRAMEPOINT_TOPRIGHT,
	bottomleft: FRAMEPOINT_BOTTOMLEFT,
	bottom: FRAMEPOINT_BOTTOMLEFT,
	bottomright: FRAMEPOINT_BOTTOMRIGHT,
};

const xRelative = (x: number, point: Point) => {
	if (point === "topleft" || point === "bottomleft") return x;
	// 1600/2 - 400/2 = 600
	if (point === "top" || point === "bottom") return 600;
	// From right, invert
	return 1600 - x;
};

// Slightly different than xRelative, since tooltips either flow down or up,
// not left or right
const yRelative = (y: number, point: Point) => {
	if (point === "bottomleft" || point === "bottom" || point === "bottomright")
		return y;

	// From top, invert
	return 1200 - y;
};
export const Tooltip = ({
	title,
	description,
	position = {
		point: "bottomright",
		x: 16,
		y: 256,
	},
}: {
	title: string;
	description?: string;
	position?: {
		point: Point;
		x?: number;
		y?: number;
	};
}): React.Node => {
	const flowDown = TEXT_POINTS.includes(position.point) || !description;

	const titleProps = flowDown
		? {
				absPosition: [
					{
						point: cornerToFramepoint[position.point],
						x: xRelative(position.x ?? 0, position.point),
						y: yRelative(position.y ?? 0, position.point),
					},
				],
		  }
		: {
				position: [
					{
						point: FRAMEPOINT_BOTTOM,
						relative: "previous" as const,
						relativePoint: FRAMEPOINT_TOP,
						y: 6,
					},
				],
		  };

	const descriptionProps = flowDown
		? {
				position: [
					{
						point: FRAMEPOINT_TOP,
						relative: "previous" as const,
						relativePoint: FRAMEPOINT_BOTTOM,
						y: -6,
					},
				],
		  }
		: {
				absPosition: [
					{
						point: cornerToFramepoint[position.point],
						x: xRelative(position.x ?? 0, position.point),
						y: yRelative(position.y ?? 0, position.point),
					},
				],
		  };

	const titleFrame = (
		<text size={{ width: 400 }} text={title} {...titleProps} />
	);

	const lineFrame = description ? (
		<backdrop
			size={{ height: 2, width: 400 }}
			texture={{
				texFile: "Textures/Loading-BarFill.blp",
			}}
			position={[
				{
					point: flowDown ? FRAMEPOINT_TOP : FRAMEPOINT_BOTTOM,
					relative: "previous" as const,
					relativePoint: flowDown
						? FRAMEPOINT_BOTTOM
						: FRAMEPOINT_TOP,
					y: flowDown ? -6 : 6,
				},
			]}
		/>
	) : null;

	const descriptionFrame = description ? (
		<text size={{ width: 400 }} text={description} {...descriptionProps} />
	) : null;

	return (
		<TooltipFrame reverse={!flowDown}>
			{flowDown ? (
				<>
					{titleFrame}
					{lineFrame}
					{descriptionFrame}
				</>
			) : (
				<>
					{descriptionFrame}
					{lineFrame}
					{titleFrame}
				</>
			)}
		</TooltipFrame>
	);
};
