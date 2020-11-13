import { useState } from "../../node_modules/w3ts-jsx/dist/src/index";
import { areArraysDifferent } from "../utils/arrays";
import { useDebouncedCallback } from "./useDebouncedCallback";
import {
	useTriggerPlayerKeyEvent,
	useTriggerPlayerUnitEvent,
} from "./useTriggerEvent";

// We don't actually use this group, it's just required to iterate through
// selected units
const dummyGroup = CreateGroup();

/**
 * Returns the range of indicies that are considered the primary unit for
 * purposes of displaying a portrait, health, mana, and command buttons.
 *
 * Note: The end value may be more than the number of units selected.
 *
 * Inspiried by [Tasyen's approach](https://discordapp.com/channels/178569180625240064/311662737015046144/724126703282290798)
 * but adapted to use width instead of visibility, since we've disabled the UI.
 */
const getPrimaryIndicies = (): [number, number] => {
	const console = BlzGetFrameByName("ConsoleUI", 0);
	const bottomUI = BlzFrameGetChild(console, 1);
	const groupframe = BlzFrameGetChild(bottomUI, 5);
	const groupButtonContainer = BlzFrameGetChild(groupframe, 0);

	let indexStart;
	let indexEnd;
	const children = BlzFrameGetChildrenCount(groupButtonContainer);
	for (let i = 0; i < children; i++) {
		const buttonContainer = BlzFrameGetChild(groupButtonContainer, i);
		const buttonBackground = BlzFrameGetChild(buttonContainer, 0);
		const button = BlzFrameGetChild(buttonContainer, 1);

		// This is pretty hacky, but it works
		const isPrimary = BlzFrameGetWidth(button) === 0.028;

		// First primary unit
		if (isPrimary && indexStart == null) indexStart = i;

		print();

		// First non-primary unit, given a primary unit has been found
		if (!isPrimary && indexStart != null && indexEnd == null) indexEnd = i;
	}

	if (indexStart != null) {
		if (indexEnd != null) return [indexStart, indexEnd];
		return [indexStart, indexStart + 1];
	}

	return [0, 1];
};

/**
 * Sorts units how they're sorted by Blizzard's default UI
 */
const prioritySort = (a: unit, b: unit): number => {
	const aPriority = BlzGetUnitRealField(a, UNIT_RF_PRIORITY);
	const bPriority = BlzGetUnitRealField(b, UNIT_RF_PRIORITY);
	// High priority first
	if (aPriority !== bPriority) return bPriority - aPriority;

	// For heroes, "oldest" first
	if (IsUnitType(a, UNIT_TYPE_HERO) && IsUnitType(b, UNIT_TYPE_HERO))
		return GetHandleId(a) - GetHandleId(b);

	// Sort by type
	const aSecondaryPriority = GetUnitTypeId(a);
	const bSecondaryPriority = GetUnitTypeId(b);
	if (aSecondaryPriority !== bSecondaryPriority)
		return aSecondaryPriority - bSecondaryPriority;

	// For same type, "oldest" first
	return GetHandleId(a) - GetHandleId(b);
};

/**
 * Hook that returns the currently selected units and the primary selected
 * units. Primary select units are used for rendering portraits, health/mana,
 * and the command card.
 */
export const useSelectedUnits = (): [unit[], unit[]] => {
	const selectedUnitsState = useState<unit[]>([]);
	let selectedUnits = selectedUnitsState[0];
	const setSelectedUnits = selectedUnitsState[1];

	const primaryUnitsState = useState<unit[]>([]);
	let primaryUnits = primaryUnitsState[0];
	const setPrimaryUnits = primaryUnitsState[1];

	const onSelectionChange = useDebouncedCallback(() => {
		const newSelectedUnits: unit[] = [];
		GroupEnumUnitsSelected(
			dummyGroup,
			GetLocalPlayer(),
			Filter(() => {
				newSelectedUnits.push(GetFilterUnit());
				return false;
			}),
		);

		newSelectedUnits.sort((a, b) => prioritySort(a, b));

		if (areArraysDifferent(selectedUnits, newSelectedUnits)) {
			selectedUnits = newSelectedUnits;
			setSelectedUnits(newSelectedUnits);
		}

		const primaryIndicies = getPrimaryIndicies();
		const newPrimaryUnits = selectedUnits.slice(...primaryIndicies);

		if (areArraysDifferent(primaryUnits, newPrimaryUnits)) {
			primaryUnits = newPrimaryUnits;
			setPrimaryUnits(newPrimaryUnits);
		}
	}, 0.01);

	useTriggerPlayerUnitEvent(EVENT_PLAYER_UNIT_SELECTED, onSelectionChange);
	useTriggerPlayerUnitEvent(EVENT_PLAYER_UNIT_DESELECTED, onSelectionChange);
	useTriggerPlayerKeyEvent(
		OSKEY_TAB,
		undefined,
		undefined,
		onSelectionChange,
	);

	return [selectedUnits, primaryUnits];
};
