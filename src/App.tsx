import * as React from "../node_modules/w3ts-jsx/dist/src/index";
import { range } from "./utils/range";
import { Div } from "./components/Box";

const Button = ({
	onClick,
	texFile,
	x,
	y,
}: {
	onClick?: () => void;
	texFile: string;
	x: number;
	y: number;
}) => (
	<button
		inherits="ScoreScreenTabButtonTemplate"
		absPosition={[{ point: FRAMEPOINT_CENTER, x, y }]}
		size={{ width: 0.05, height: 0.05 }}
		onClick={onClick}
	>
		<backdrop
			position={["parent"]}
			texture={{
				texFile,
			}}
		/>
	</button>
);

export const App = (): React.Node => {
	const [count, setCount] = React.useState(0);
	return (
		<>
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
			<text
				text="Hello!"
				absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.5 }]}
			/>
			<container
				absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.48 }]}
				size={{ width: 0.1, height: 0.01 }}
			>
				{range(count, (i) => (
					<Div typeName="TEXT" text={i.toString()} />
				))}
			</container>
		</>
	);
};
