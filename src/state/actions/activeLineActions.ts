import type {ID_PROPERTY} from "./subtitlesActions.ts";

export const SET_ACTIVE_LINE = "SET_ACTIVE_LINE";

export type ActiveLine = ID_PROPERTY;

export type SetActiveLineAction = {
    type: typeof SET_ACTIVE_LINE,
    line: ActiveLine
};

export function setActiveLine(line: ActiveLine): SetActiveLineAction {
    return {
        type: SET_ACTIVE_LINE,
        line: line
    };
}
