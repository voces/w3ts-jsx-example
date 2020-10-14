import * as React from "../node_modules/w3ts-jsx/dist/src/index";
import { range } from "./utils/range";
import { Div } from "./components/Box";

const Button = ({
	onClick,
	x,
	y,
	texFile,
}: {
	onClick?: () => void;
	x: number;
	y: number;
	texFile: string;
}) => (
	<frame
		typeName="BUTTON"
		name="FaceButton"
		inherits="ScoreScreenTabButtonTemplate"
		absPosition={[{ point: FRAMEPOINT_CENTER, x, y }]}
		size={{ width: 0.05, height: 0.05 }}
		onClick={onClick}
	>
		<frame
			typeName="BACKDROP"
			name="FaceButtonIcon"
			position={["parent"]}
			texture={{
				texFile,
			}}
		/>
	</frame>
);

export const App = (): React.Node => {
	const [count, setCount] = React.useState(0);
	return (
		<frame name="app" typeName="FRAME">
			<Button
				onClick={() => setCount(count + 1)}
				x={0.5}
				y={0.3}
				texFile="ReplaceableTextures\\CommandButtons\\BTNCryptFiendUnBurrow"
			/>
			<Button
				onClick={() => setCount(count - 1)}
				x={0.56}
				y={0.3}
				texFile="ReplaceableTextures\\CommandButtons\\BTNCryptFiendBurrow"
			/>
			<frame
				name="iteration"
				typeName="TEXT"
				text="Hello!"
				absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.5 }]}
			/>
			<frame
				name="container"
				typeName="frame"
				absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.48 }]}
				size={{ width: 0.1, height: 0.01 }}
			>
				{range(count, (i) => (
					<Div typeName="TEXT" text={i.toString()} />
				))}
			</frame>
		</frame>
	);
};
