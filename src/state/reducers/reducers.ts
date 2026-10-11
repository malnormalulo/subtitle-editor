import {type AnyAction, combineReducers} from "redux";
import videoReducer, {type VideoState} from "./videoReducer.ts";
import subtitlesReducer, {type Line, type SubtitlesState} from "./subtitlesReducer.ts";
import activeLineReducer, {type ActiveLineState} from "./activeLineReducer.ts";
import {SET_ACTIVE_LINE, type SetActiveLineAction} from "../actions/activeLineActions.ts";

export type RootState = {
    video: VideoState,
    subtitles: SubtitlesState,
    activeLine: ActiveLineState
};

const combinedReducers = combineReducers<RootState>({
    video: videoReducer,
    subtitles: subtitlesReducer,
    activeLine: activeLineReducer
});

function reducers(state: RootState | undefined, action: AnyAction): RootState {
    const nextState = combinedReducers(state as RootState, action);

    switch (action.type) {
        case SET_ACTIVE_LINE : {
            const id = (action as SetActiveLineAction).line.id;
            const line = nextState.subtitles.find(line => (line as Line).id == id);

            if (!line)
                return nextState;

            return {
                ...nextState,
                video: {...nextState.video, currentTime: line.start.toSeconds()}
            };
        }
        default :
            return nextState;
    }
}

export default reducers;