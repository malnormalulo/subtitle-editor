import type {AnyAction} from "redux";
import {SET_VIDEO_ATTRIBUTES, type SetVideoAttributesAction} from "../actions/videoActions.ts";
import type {FPS} from "../../utils/SMPTEtime.ts";

export type VideoState = {
    src: string | null,
    fps: FPS | null
};

const INITIAL_STATE: VideoState = {
    src: null,
    fps: null
};

function videoReducer(state: VideoState = INITIAL_STATE, action: AnyAction): VideoState {
    switch (action.type) {
        case SET_VIDEO_ATTRIBUTES : {
            return Object.assign({}, state, {
                src: (action as SetVideoAttributesAction).src,
                fps: (action as SetVideoAttributesAction).fps
            });
        }
        default :
            return state;
    }
}

export default videoReducer;
