import {combineReducers} from "redux";
import videoReducer, {type VideoState} from "./videoReducer.ts";
import subtitlesReducer, {type SubtitlesState} from "./subtitlesReducer.ts";

export type RootState = {
    video: VideoState,
    subtitles: SubtitlesState
};

const reducers = combineReducers<RootState>({
    video: videoReducer,
    subtitles: subtitlesReducer
});

export default reducers;