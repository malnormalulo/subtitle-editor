export const SET_VIDEO_SRC = "SET_VIDEO_SRC";

export type SetVideoSrcAction = {
    type: typeof SET_VIDEO_SRC,
    src: string | null
};

export function setVideoSrc(videoSrc: string | null): SetVideoSrcAction {
    return {type: SET_VIDEO_SRC, src: videoSrc};
}
