import type {FPS} from "../../utils/SMPTEtime.ts";

export const SET_VIDEO_ATTRIBUTES = "SET_VIDEO_ATTRIBUTES";

export type SetVideoAttributesAction = {
    type: typeof SET_VIDEO_ATTRIBUTES,
    src: string | null,
    fps: FPS | null
};

export function setVideoAttributes(videoSrc: string | null, fps: FPS | null): SetVideoAttributesAction {
    return {
        type: SET_VIDEO_ATTRIBUTES,
        src: videoSrc,
        fps: fps
    };
}
