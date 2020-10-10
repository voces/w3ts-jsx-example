import { Adapter } from "../basic-pragma/adapter";

// https://wc3modding.info/pages/jass-documentation-database/class/functions/file/common.j/

const frameDefaults: Required<FrameProps> & { children: null } = {
	// immutable props
	name: "",
	priority: 0,
	isSimple: true,
	typeName: null,
	inherits: "",
	context: 0,
	// mutable props
	alpha: 255,
	enabled: true,
	font: { fileName: "", height: 16, flags: 0 },
	level: 0,
	maxLength: 9999,
	minMaxValue: { min: -999999999, max: 999999999 },
	model: { modelFile: "", cameraIndex: 0 },
	scale: 1,
	spriteAnimate: { primaryProp: 0, flags: 0 },
	stepSize: 0,
	text: "",
	textAlignment: { vert: TEXT_JUSTIFY_TOP, horz: TEXT_JUSTIFY_LEFT },
	textColor: 0xffffff,
	texture: { texFile: "", flag: 0, blend: true },
	tooltip: null,
	value: 0,
	vertexColor: 0xffffff,
	visible: true,
	position: null,
	absPosition: null,
	size: { width: 0.1, height: 0.1 },
	children: null,
	// events
	onClick: null,
	onMouseEnter: null,
	onMouseLeave: null,
	onMouseUp: null,
	onMouseDown: null,
	onMouseWheel: null,
	onCheckboxChecked: null,
	onCheckboxUnchecked: null,
	onEditboxTextChanged: null,
	onPopupmenuItemChanged: null,
	onDoubleClick: null,
	onSpriteAnimUpdate: null,
	onSliderChanged: null,
	onDialogCancel: null,
	onDialogAccept: null,
	onEditboxEnter: null,
};

const absurd = (value: never) => {
	throw `Got ${value} when expected nothing`;
};

const triggerMap = new WeakMap<(...args: unknown[]) => unknown, trigger>();
const conditionMap = new WeakMap<
	(...args: unknown[]) => unknown,
	triggercondition
>();

const setEventProp = (
	frame: framehandle,
	// This typing is wrong, should be prop: K, value?: FrameProps[K]
	event: frameeventtype,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	val?: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	oldValue?: any,
) => {
	// Get the existing trigger
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let t = triggerMap.get(oldValue as any);

	// Destroy it if there's no mouse event
	if (val == null) {
		if (t) DestroyTrigger(t);

		// Otherwise just modify the condition
	} else {
		if (t == null) {
			t = CreateTrigger();
			BlzTriggerRegisterFrameEvent(t, frame, event);
			triggerMap.set(val, t);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const condition = conditionMap.get(oldValue as any);
			if (condition) TriggerRemoveCondition(t, condition);
		}

		const condition = TriggerAddCondition(
			t,
			Condition(() => {
				val();
				return false;
			}),
		);
		conditionMap.set(val, condition);
	}
};

const setProp = (
	frame: framehandle,
	// This typing is wrong, should be prop: K, value?: FrameProps[K]
	prop: keyof FrameProps | "children",
	value?: FrameProps[keyof FrameProps],
	oldValue?: FrameProps[keyof FrameProps],
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const val = value ?? (frameDefaults[prop] as any);
	switch (prop) {
		case "text": {
			BlzFrameSetText(frame, val);
			break;
		}
		case "maxLength": {
			BlzFrameSetTextSizeLimit(frame, val);
			break;
		}
		case "textColor": {
			BlzFrameSetTextColor(frame, val);
			break;
		}
		case "texture": {
			BlzFrameSetTexture(
				frame,
				val.texFile ?? frameDefaults.texture.texFile,
				val.flag ?? frameDefaults.texture.flag,
				val.blend ?? frameDefaults.texture.blend,
			);
			break;
		}
		case "model": {
			BlzFrameSetModel(
				frame,
				val.modelFile ?? frameDefaults.model.modelFile,
				val.cameraIndex ?? frameDefaults.model.cameraIndex,
			);
			break;
		}
		case "alpha": {
			BlzFrameSetAlpha(frame, val);
			break;
		}
		case "level": {
			BlzFrameSetLevel(frame, val);
			break;
		}
		case "visible": {
			BlzFrameSetVisible(frame, val);
			break;
		}
		case "enabled": {
			BlzFrameSetEnable(frame, val);
			break;
		}
		case "vertexColor": {
			BlzFrameSetVertexColor(frame, val);
			break;
		}
		case "value": {
			BlzFrameSetValue(frame, val);
			break;
		}
		case "size": {
			BlzFrameSetSize(
				frame,
				val.width ?? frameDefaults.size.width,
				val.height ?? frameDefaults.size.height,
			);
			break;
		}
		case "stepSize": {
			BlzFrameSetStepSize(frame, val);
			break;
		}
		case "tooltip": {
			BlzFrameSetTooltip(frame, val);
			break;
		}
		case "font": {
			BlzFrameSetFont(
				frame,
				val.fileName ?? frameDefaults.font.fileName,
				val.height ?? frameDefaults.font.height,
				val.flags ?? frameDefaults.font.flags,
			);
			break;
		}
		case "minMaxValue": {
			BlzFrameSetMinMaxValue(
				frame,
				val.min ?? frameDefaults.minMaxValue.min,
				val.max ?? frameDefaults.minMaxValue.max,
			);
			break;
		}
		case "scale": {
			BlzFrameSetScale(frame, val);
			break;
		}
		case "spriteAnimate": {
			BlzFrameSetSpriteAnimate(
				frame,
				val.primaryProp ?? frameDefaults.spriteAnimate.primaryProp,
				val.flags ?? frameDefaults.spriteAnimate.flags,
			);
			break;
		}
		case "textAlignment": {
			BlzFrameSetTextAlignment(
				frame,
				val.vert ?? frameDefaults.textAlignment.vert,
				val.horz ?? frameDefaults.textAlignment.horz,
			);
			break;
		}
		case "position": {
			if (val != null)
				for (const position of val as Pos[])
					if (position === "clear") BlzFrameClearAllPoints(frame);
					else if (position === "parent")
						BlzFrameSetAllPoints(frame, BlzFrameGetParent(frame));
					else
						BlzFrameSetPoint(
							frame,
							position.point,
							position.relative,
							position.relativePoint,
							position.x ?? 0,
							position.y ?? 0,
						);
			break;
		}
		case "absPosition": {
			if (val != null)
				for (const absPosition of val as AbsPos[])
					if (absPosition === "clear") BlzFrameClearAllPoints(frame);
					else
						BlzFrameSetAbsPoint(
							frame,
							absPosition.point,
							absPosition.x ?? 0,
							absPosition.y ?? 0,
						);
			break;
		}
		case "onClick": {
			setEventProp(frame, FRAMEEVENT_CONTROL_CLICK, val, oldValue);
			break;
		}
		case "onMouseEnter": {
			setEventProp(frame, FRAMEEVENT_MOUSE_ENTER, val, oldValue);
			break;
		}
		case "onMouseLeave": {
			setEventProp(frame, FRAMEEVENT_MOUSE_LEAVE, val, oldValue);
			break;
		}
		case "onMouseUp": {
			setEventProp(frame, FRAMEEVENT_MOUSE_UP, val, oldValue);
			break;
		}
		case "onMouseDown": {
			setEventProp(frame, FRAMEEVENT_MOUSE_DOWN, val, oldValue);
			break;
		}
		case "onMouseWheel": {
			setEventProp(frame, FRAMEEVENT_MOUSE_WHEEL, val, oldValue);
			break;
		}
		case "onCheckboxChecked": {
			setEventProp(frame, FRAMEEVENT_CHECKBOX_CHECKED, val, oldValue);
			break;
		}
		case "onCheckboxUnchecked": {
			setEventProp(frame, FRAMEEVENT_CHECKBOX_UNCHECKED, val, oldValue);
			break;
		}
		case "onEditboxTextChanged": {
			setEventProp(frame, FRAMEEVENT_EDITBOX_TEXT_CHANGED, val, oldValue);
			break;
		}
		case "onPopupmenuItemChanged": {
			setEventProp(
				frame,
				FRAMEEVENT_POPUPMENU_ITEM_CHANGED,
				val,
				oldValue,
			);
			break;
		}
		case "onDoubleClick": {
			setEventProp(frame, FRAMEEVENT_MOUSE_DOUBLECLICK, val, oldValue);
			break;
		}
		case "onSpriteAnimUpdate": {
			setEventProp(frame, FRAMEEVENT_SPRITE_ANIM_UPDATE, val, oldValue);
			break;
		}
		case "onSliderChanged": {
			setEventProp(frame, FRAMEEVENT_SLIDER_VALUE_CHANGED, val, oldValue);
			break;
		}
		case "onDialogCancel": {
			setEventProp(frame, FRAMEEVENT_DIALOG_CANCEL, val, oldValue);
			break;
		}
		case "onDialogAccept": {
			setEventProp(frame, FRAMEEVENT_DIALOG_ACCEPT, val, oldValue);
			break;
		}
		case "onEditboxEnter": {
			setEventProp(frame, FRAMEEVENT_EDITBOX_ENTER, val, oldValue);
			break;
		}
		case "name":
		case "priority":
		case "isSimple":
		case "typeName":
		case "inherits":
		case "children":
		case "context":
			break;
		default:
			absurd(prop);
	}
};

export const adapter: Adapter<framehandle> = {
	createFrame: (
		jsxType: string,
		parentFrame: framehandle,
		props: FrameProps,
	) => {
		let frame: framehandle;
		const {
			name,
			priority = 0,
			typeName,
			inherits,
			isSimple,
			context = 0,
		} = props;
		if (isSimple ?? jsxType === "simple-frame")
			frame = BlzCreateSimpleFrame(name, parentFrame, context);
		else if (typeName)
			frame = BlzCreateFrameByType(
				typeName,
				name,
				parentFrame,
				inherits ?? "",
				context,
			);
		else frame = BlzCreateFrame(name, parentFrame, priority, context);
		// This type casting is safe here, but may cause bugs later...
		adapter.updateFrameProperties(frame, {}, props);
		return frame;
	},

	cleanupFrame: (frame: framehandle): void => BlzDestroyFrame(frame),

	updateFrameProperties: (
		frame: framehandle,
		prevProps: FrameProps,
		nextProps: FrameProps,
	) => {
		let prop: keyof FrameProps;
		// Clear removed props
		for (prop in prevProps)
			if (!(prop in nextProps))
				try {
					setProp(frame, prop);
				} catch (err) {
					print(err);
				}
		// Add new props
		for (prop in nextProps)
			if (nextProps[prop] !== prevProps[prop])
				try {
					setProp(frame, prop, nextProps[prop], prevProps[prop]);
				} catch (err) {
					print(err);
				}
	},

	getParent: (frame: framehandle): framehandle => BlzFrameGetParent(frame),
};
