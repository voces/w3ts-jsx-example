import * as React from "../../node_modules/w3ts-jsx/dist/src/index";

type PaddingMap = {
	top?: number;
	left?: number;
	bottom?: number;
	right?: number;
	horizontal?: number;
	vertical?: number;
};

type Padding = PaddingMap | number;

export const BlackBackground = ({
	padding = 0,
	alpha = 159,
}: {
	padding?: Padding;
	alpha?: number;
}): React.Node => {
	const topPadding =
		typeof padding === "number"
			? padding
			: padding.top ?? padding.vertical ?? 0;
	const bottomPadding =
		typeof padding === "number"
			? padding
			: padding.bottom ?? padding.vertical ?? 0;
	const leftPadding =
		typeof padding === "number"
			? padding
			: padding.left ?? padding.horizontal ?? 0;
	const rightPadding =
		typeof padding === "number"
			? padding
			: padding.right ?? padding.horizontal ?? 0;
	return (
		<backdrop
			position={[
				{
					point: FRAMEPOINT_TOPLEFT,
					relative: "parent",
					relativePoint: FRAMEPOINT_TOPLEFT,
					y: -topPadding,
					x: leftPadding,
				},
				{
					point: FRAMEPOINT_BOTTOMRIGHT,
					relative: "parent",
					relativePoint: FRAMEPOINT_BOTTOMRIGHT,
					x: -rightPadding,
					y: bottomPadding,
				},
			]}
			texture={{ texFile: "Textures/Black32.blp" }}
			alpha={alpha}
		/>
	);
};
