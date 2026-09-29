import type {AnyAction} from "redux";
import {SET_VIDEO_SRC, type SetVideoSrcAction} from "../actions.ts";

export type VideoState = {
    src: string | null
};

const INITIAL_STATE: VideoState = {
    src: null
};

function videoReducer(state: VideoState = INITIAL_STATE, action: AnyAction): VideoState {
    switch (action.type) {
        case SET_VIDEO_SRC : {
            return Object.assign({}, state, { src: (action as SetVideoSrcAction).src });
        }
        default :
            return state;
    }
}

export default videoReducer;
