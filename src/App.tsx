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

const Box = (props: BackdropProps) => (
	<backdrop
		texture={{
			texFile:
				"ReplaceableTextures\\CommandButtons\\BTNCryptFiendUnBurrow",
		}}
		size={{ width: 100, height: 100 }}
		{...props}
	/>
);

export const App = (): React.Node => (
	<>
		<Minimap
			actions={[
				{
					name: "Minimap Signal",
					hotkey: "G",
					modifiers: ["alt"],
					description:
						"This option will allow you to send a minimap signal " +
						"notification to all your allies.\n\nTargeting a " +
						"position on the minimap or in the game world will " +
						"display a signal at that location on your allies' " +
						"minimaps.\n\nAlternatively, you can hold down Alt " +
						"and left-click on the minimap or game world to " +
						"perform the same action.",
					icon:
						"UI\\Widgets\\Console\\Human\\human-minimap-ping-active",
				},
				{
					name: "Toggle Minimap Terrain",
					hotkey: "T",
					modifiers: ["alt"],
					description:
						"This option will toggle the display of the terrain " +
						"on the minimap.\n\nYou can use this feature if you " +
						"are having difficulty seeing units on top of the " +
						"terrain.",
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
