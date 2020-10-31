import * as React from "../node_modules/w3ts-jsx/dist/src/index";
import { Minimap } from "./components/Minimap/Minimap";

// const Fill = () => (
// 	<backdrop
// 		position={["parent"]}
// 		texture={{
// 			texFile:
// 				"ReplaceableTextures\\CommandButtons\\BTNCryptFiendUnBurrow",
// 		}}
// 	/>
// );

export const App = (): React.Node => (
	<>
		<Minimap
			actions={[
				{
					name: "Minimap Signal",
					hotkey: "G",
					tooltip: "Minimap Signal (Alt-G)",
					icon:
						"UI\\Widgets\\Console\\Human\\human-minimap-ping-active",
				},
				{
					name: "Minimap Signal",
					hotkey: "G",
					tooltip: "Minimap Signal (Alt-G)",
					icon:
						"UI\\Widgets\\Console\\Human\\human-minimap-terrain-active",
				},
			]}
		/>
		{/* <backdrop
			position={[
				{
					point: FRAMEPOINT_BOTTOMLEFT,
					relative: "previous",
					relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				},
			]}
			size={{ width: 0.256, height: 0.256 }}
			texture={{
				texFile: "UI\\Console\\Human\\HumanUITile02.blp",
			}}
		/>
		<backdrop
			position={[
				{
					point: FRAMEPOINT_BOTTOMLEFT,
					relative: "previous",
					relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				},
			]}
			size={{ width: 0.256, height: 0.256 }}
			texture={{
				texFile: "UI\\Console\\Human\\HumanUITile03.blp",
			}}
		/>
		<backdrop
			position={[
				{
					point: FRAMEPOINT_BOTTOMLEFT,
					relative: "previous",
					relativePoint: FRAMEPOINT_BOTTOMRIGHT,
				},
			]}
			size={{ width: 0.04, height: 0.256 }}
			texture={{
				texFile: "UI\\Console\\Human\\HumanUITile04.blp",
			}}
		/> */}
	</>
);
