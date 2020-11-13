import { test } from "./Health";

const { tweenHealthColor } = test;

describe("tweenHealthColor", () => {
	it("green", () => {
		expect(tweenHealthColor(1)).toEqual(0x00ff00);
	});

	it("yellowgreen", () => {
		expect(tweenHealthColor(0.75)).toEqual(0x80ff00);
	});

	it("yellow", () => {
		expect(tweenHealthColor(0.5)).toEqual(0xffff00);
	});

	it("orange", () => {
		expect(tweenHealthColor(0.25)).toEqual(0xff8000);
	});

	it("red", () => {
		expect(tweenHealthColor(0)).toEqual(0xff0000);
	});
});
