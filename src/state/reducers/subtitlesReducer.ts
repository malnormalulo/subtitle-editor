import type {AnyAction} from "redux";
import SMPTEtime from "../../utils/SMPTEtime.ts";

export type SubtLine = {
    id: number;
    start: SMPTEtime;
    end: SMPTEtime;
    content: string;
}

export type SubtitlesState = SubtLine[];

const INITIAL_STATE: SubtitlesState = [...Array(20).keys()].map((index) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const startTime = SMPTEtime.createTimeFromString(`00:00:${pad(index * 2)}:00`, 24);
    const endTime = SMPTEtime.createTimeFromString(`00:00:${pad(index * 2 + 1)}:00`, 24);
    if (!startTime || !endTime)
        throw new Error(`bad test time for line ${index}`);
    return {
        id: index,
        start: startTime,
        end: endTime,
        content: `test content ${index + 1}`};
});

function subtitlesReducer(state: SubtitlesState = INITIAL_STATE, action: AnyAction): SubtitlesState {
    switch (action.type) {
        // case SET_VIDEO_SRC : {
        //     return Object.assign({}, state, { src: (action as SetVideoSrcAction).src });
        // }
        default :
            return state;
    }
}

export default subtitlesReducer;
