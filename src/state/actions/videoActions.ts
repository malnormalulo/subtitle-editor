import type {FPS} from "../../utils/SMPTEtime.ts";

export const SET_VIDEO_ATTRIBUTES = "SET_VIDEO_ATTRIBUTES";

export type SetVideoAttributesAction = {
    type: typeof SET_VIDEO_ATTRIBUTES,
    src: string | undefined,
    fps: FPS | undefined,
    currentTime: number | undefined
};

export function setVideoAttributes(src: string | undefined, fps: FPS | undefined, currentTime: number | undefined): SetVideoAttributesAction {
    return {
        type: SET_VIDEO_ATTRIBUTES,
        src: src,
        fps: fps,
        currentTime: currentTime
    };
}
