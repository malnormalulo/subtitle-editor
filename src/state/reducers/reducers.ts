import {combineReducers} from "redux";
import videoReducer, {type VideoState} from "./videoReducer.ts";

export type RootState = {
    video: VideoState
};

const reducers = combineReducers<RootState>({
    video: videoReducer,
});

export default reducers;