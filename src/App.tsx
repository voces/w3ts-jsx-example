import * as React from "./w3ts-jsx/index";

export const App = (): React.Node => (
	<frame
		typeName="BUTTON"
		name="FaceButton"
		inherits="ScoreScreenTabButtonTemplate"
		absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.3 }]}
		size={{ width: 0.05, height: 0.05 }}
		onClick={() => print("onClick1")}
		onMouseEnter={() => print("onMouseEnter1")}
		onMouseLeave={() => print("onMouseLeave1")}
		onMouseUp={() => print("onMouseUp1")}
		onMouseDown={() => print("onMouseDown1")}
		onMouseWheel={() => print("onMouseWheel1")}
		onCheckboxChecked={() => print("onCheckboxChecked1")}
		onCheckboxUnchecked={() => print("onCheckboxUnchecked1")}
		onEditboxTextChanged={() => print("onEditboxTextChanged1")}
		onPopupmenuItemChanged={() => print("onPopupmenuItemChanged1")}
		onDoubleClick={() => print("onDoubleClick1")}
		onSpriteAnimUpdate={() => print("onSpriteAnimUpdate1")}
		onSliderChanged={() => print("onSliderChanged1")}
		onDialogCancel={() => print("onDialogCancel1")}
		onDialogAccept={() => print("onDialogAccept1")}
		onEditboxEnter={() => print("onEditboxEnter1")}
	>
		<frame
			typeName="BACKDROP"
			name="FaceButtonIcon"
			position={["parent"]}
			texture={{
				texFile: "ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn",
			}}
			onClick={() => print("onClick2")}
			onMouseEnter={() => print("onMouseEnter2")}
			onMouseLeave={() => print("onMouseLeave2")}
			onMouseUp={() => print("onMouseUp2")}
			onMouseDown={() => print("onMouseDown2")}
			onMouseWheel={() => print("onMouseWheel2")}
			onCheckboxChecked={() => print("onCheckboxChecked2")}
			onCheckboxUnchecked={() => print("onCheckboxUnchecked2")}
			onEditboxTextChanged={() => print("onEditboxTextChanged2")}
			onPopupmenuItemChanged={() => print("onPopupmenuItemChanged2")}
			onDoubleClick={() => print("onDoubleClick2")}
			onSpriteAnimUpdate={() => print("onSpriteAnimUpdate2")}
			onSliderChanged={() => print("onSliderChanged2")}
			onDialogCancel={() => print("onDialogCancel2")}
			onDialogAccept={() => print("onDialogAccept2")}
			onEditboxEnter={() => print("onEditboxEnter2")}
		/>
	</frame>
);
