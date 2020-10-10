import * as React from "./w3ts-jsx/index";

export const App = (): React.Node => (
	<frame
		typeName="BUTTON"
		name="FaceButton"
		inherits="ScoreScreenTabButtonTemplate"
		absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.3 }]}
		size={{ width: 0.05, height: 0.05 }}
		onClick={() => print("onClick")}
		onMouseEnter={() => print("onMouseEnter")}
		onMouseLeave={() => print("onMouseLeave")}
		onMouseUp={() => print("onMouseUp")}
		onMouseDown={() => print("onMouseDown")}
		onMouseWheel={() => print("onMouseWheel")}
	>
		<frame
			typeName="BACKDROP"
			name="FaceButtonIcon"
			position={["parent"]}
			texture={{
				texFile: "ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn",
			}}
		/>
	</frame>
);
