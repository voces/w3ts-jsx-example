import { BlzGetUnitStringField } from "w3api/dist/api";

import * as React from "../../../node_modules/w3ts-jsx/dist/src/index";
import { useInterval } from "../../hooks/useInterval";
import { Tooltip } from "../Tooltip";
// import { tweenHealthColor } from "../Portrait/Health";

const PRIMARY_SIZE = 55;
const SECONDARY_SIZE = 45;
const SECONDARY_PADDING = (PRIMARY_SIZE - SECONDARY_SIZE) / 2;

const UnitIcon = ({ unit, primary }: { unit: unit; primary: boolean }) => (
	<backdrop
		texture={{ texFile: BlzGetAbilityIcon(GetUnitTypeId(unit)) }}
		position={[
			{
				point: FRAMEPOINT_TOPLEFT,
				relative: "parent",
				relativePoint: FRAMEPOINT_TOPLEFT,
				x: primary ? 0 : SECONDARY_PADDING,
				y: primary ? 0 : -SECONDARY_PADDING,
			},
		]}
		size={{
			width: primary ? PRIMARY_SIZE : SECONDARY_SIZE,
			height: primary ? PRIMARY_SIZE : SECONDARY_SIZE,
		}}
	/>
);

const isFrameHandleRef = (obj: {
	current: unknown;
}): obj is { current: framehandle } => obj.current != null;

const UnitHealth = ({
	unit,
	primary,
	parentRef,
}: {
	unit: unit;
	primary: boolean;
	parentRef: { current: React.Node };
}) => {
	const forceUpdate = React.useForceUpdate();
	useInterval(0.5, () => forceUpdate());
	const healthPercent =
		GetUnitState(unit, UNIT_STATE_LIFE) / BlzGetUnitMaxHP(unit);
	return (
		<simple-statusbar
			texture={{
				texFile: "ui\\feedback\\progressbar\\human-statbar-color",
			}}
			position={[
				"clear",
				{
					point: FRAMEPOINT_TOPLEFT,
					relative: isFrameHandleRef(parentRef)
						? parentRef.current
						: "parent",
					relativePoint: FRAMEPOINT_TOPLEFT,
					y: -(primary ? PRIMARY_SIZE + 4 : SECONDARY_SIZE + 8),
					x: primary ? 0 : SECONDARY_PADDING,
				},
			]}
			size={{
				width: primary ? PRIMARY_SIZE : SECONDARY_SIZE,
				height: 8,
			}}
			// vertexColor={tweenHealthColor(healthPercent)}
			value={healthPercent * 100}
		/>
	);
};

const UnitMana = ({
	unit,
	primary,
	parentRef,
}: {
	unit: unit;
	primary: boolean;
	parentRef: { current: React.Node };
}) => {
	const forceUpdate = React.useForceUpdate();
	useInterval(0.5, () => forceUpdate());
	const maxMana = BlzGetUnitMaxMana(unit);
	return (
		maxMana > 0 && (
			<simple-statusbar
				texture={{
					texFile: "ui\\feedback\\progressbar\\human-statbar-color",
				}}
				position={[
					"clear",
					{
						point: FRAMEPOINT_TOPLEFT,
						relative: isFrameHandleRef(parentRef)
							? parentRef.current
							: "parent",
						relativePoint: FRAMEPOINT_TOPLEFT,
						y: -(primary ? PRIMARY_SIZE + 12 : SECONDARY_SIZE + 16),
						x: primary ? 0 : SECONDARY_PADDING,
					},
				]}
				size={{
					width: primary ? PRIMARY_SIZE : SECONDARY_SIZE,
					height: 8,
				}}
				// vertexColor={BlzConvertColor(0, 63, 127, 255)}
				value={(GetUnitState(unit, UNIT_STATE_MANA) / maxMana) * 100}
			/>
		)
	);
};

const UnitDetail = ({
	unit,
	primary,
	firstInRow,
}: {
	unit: unit;
	primary: boolean;
	firstInRow: boolean;
}) => {
	const containerRef = React.useRef<React.Node | null>(null);
	return (
		<container
			position={[
				{
					point: FRAMEPOINT_TOPLEFT,
					relative: firstInRow ? "parent" : "previous",
					relativePoint: firstInRow
						? FRAMEPOINT_TOPLEFT
						: FRAMEPOINT_TOPRIGHT,
					x: firstInRow ? 0 : 4,
				},
			]}
			size={{ width: PRIMARY_SIZE, height: PRIMARY_SIZE + 48 }}
			ref={containerRef}
			tooltip={
				<Tooltip
					title={GetUnitName(unit)}
					description={BlzGetUnitStringField(unit, UNIT_DESCRI)}
				/>
			}
		>
			<UnitIcon unit={unit} primary={primary} />
			<UnitHealth
				unit={unit}
				primary={primary}
				parentRef={containerRef}
			/>
			<UnitMana unit={unit} primary={primary} parentRef={containerRef} />
		</container>
	);
};

export const MultiUnitDetailPane = ({
	units,
	primaryUnits,
}: {
	units: unit[];
	primaryUnits: unit[];
}): React.Node => {
	const row1 = units.slice(0, 6);
	const row2 = units.slice(6);

	return (
		<>
			<container
				position={[
					{
						point: FRAMEPOINT_TOPLEFT,
						relative: "parent",
						relativePoint: FRAMEPOINT_TOPLEFT,
						x: 30,
						y: -84,
					},
					{
						point: FRAMEPOINT_BOTTOMRIGHT,
						relative: "parent",
						relativePoint: FRAMEPOINT_BOTTOMRIGHT,
						x: -32,
						y: 8,
					},
				]}
			>
				{row1.map((unit, i) => (
					<UnitDetail
						firstInRow={i === 0}
						unit={unit}
						primary={primaryUnits.includes(unit)}
					/>
				))}
				{row2.length > 0 && (
					<container
						position={[
							{
								point: FRAMEPOINT_TOPLEFT,
								relative: "parent",
								relativePoint: FRAMEPOINT_TOPLEFT,
								y: -96,
							},
							{
								point: FRAMEPOINT_BOTTOMRIGHT,
								relative: "parent",
								relativePoint: FRAMEPOINT_BOTTOMRIGHT,
							},
						]}
					>
						{row2.map((unit, i) => (
							<UnitDetail
								firstInRow={i === 0}
								unit={unit}
								primary={primaryUnits.includes(unit)}
							/>
						))}
					</container>
				)}
			</container>
		</>
	);
};
