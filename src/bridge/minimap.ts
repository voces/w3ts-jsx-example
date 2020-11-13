export const signal = (): void => {
	BlzFrameClick(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP_BUTTON, 0));
};
export const toggleTerrain = (): void => {
	BlzFrameClick(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP_BUTTON, 1));
};
