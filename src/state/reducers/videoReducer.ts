import type {AnyAction} from "redux";
import {SET_VIDEO_ATTRIBUTES, type SetVideoAttributesAction} from "../actions/videoActions.ts";
import type {FPS} from "../../utils/SMPTEtime.ts";
import {mergeIgnoringUndefined} from "../../utils/mergeIgnoringUndefined.ts";

export type VideoState = {
    src: string | undefined,
    fps: FPS | undefined,
    currentTime: number | undefined
};

const INITIAL_STATE: VideoState = {
    src: undefined,
    fps: undefined,
    currentTime: 0
};

function videoReducer(state: VideoState = INITIAL_STATE, action: AnyAction): VideoState {
    switch (action.type) {
        case SET_VIDEO_ATTRIBUTES : {
            return mergeIgnoringUndefined(state, action as SetVideoAttributesAction);
        }
        default :
            return state;
    }
}

export default videoReducer;
