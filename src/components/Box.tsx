import * as React from "../../node_modules/w3ts-jsx/dist/src/index";

export const Span = ({
	name = "Span",
	typeName = "frame",
	position = [
		{
			point: FRAMEPOINT_LEFT,
			relative: "previous",
			relativePoint: FRAMEPOINT_RIGHT,
		},
	],
	...props
}: FrameProps): React.Node => (
	<frame name={name} typeName={typeName} position={position} {...props} />
);

export const Div = ({
	name = "Div",
	typeName = "frame",
	position = [
		// Not sure why this doesn't work...
		// {
		// 	point: FRAMEPOINT_LEFT,
		// 	relative: "parent",
		// 	relativePoint: FRAMEPOINT_LEFT,
		// },
		// {
		// 	point: FRAMEPOINT_RIGHT,
		// 	relative: "parent",
		// 	relativePoint: FRAMEPOINT_RIGHT,
		// },
		{
			point: FRAMEPOINT_TOP,
			relative: "previous",
			relativePoint: FRAMEPOINT_BOTTOM,
		},
	],
	...props
}: FrameProps): React.Node => (
	<frame name={name} typeName={typeName} position={position} {...props} />
);
