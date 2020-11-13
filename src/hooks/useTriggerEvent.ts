import {
	useEffect,
	useForceUpdate,
} from "../../node_modules/w3ts-jsx/dist/src/index";

const useTriggerEvent = (
	callback: "update" | (() => void),
	registerEvent: (trigger: trigger) => void,
): void => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const t = CreateTrigger();

		registerEvent(t);

		TriggerAddCondition(
			t,
			Condition((): boolean => {
				if (callback === "update") forceUpdate();
				else callback();

				return false;
			}),
		);

		return () => {
			DestroyTrigger(t);
		};
	});
};

export const useTriggerPlayerUnitEvent = (
	eventid: playerunitevent,
	callback: "update" | (() => void) = "update",
	player?: player,
): void =>
	useTriggerEvent(callback, (t: trigger) => {
		if (player != null)
			TriggerRegisterPlayerUnitEvent(t, player, eventid, null);
		else
			for (let i = 0; i < bj_MAX_PLAYERS; i++)
				TriggerRegisterPlayerUnitEvent(t, Player(i), eventid, null);
	});

export const useTriggerPlayerKeyEvent = (
	key: oskeytype,
	metaKey = 0,
	keyDown = true,
	callback: "update" | (() => void) = "update",
	player?: player,
): void =>
	useTriggerEvent(callback, (t: trigger) => {
		if (player != null)
			BlzTriggerRegisterPlayerKeyEvent(t, player, key, metaKey, keyDown);
		else
			for (let i = 0; i < bj_MAX_PLAYERS; i++)
				BlzTriggerRegisterPlayerKeyEvent(
					t,
					Player(i),
					key,
					metaKey,
					keyDown,
				);
	});
