import type {AnyAction} from "redux";
import {
    CREATE_LINE,
    type CreateLineAction,
    DELETE_LINE, type DeleteLineAction, type ID_PROPERTY,
    type NewLine,
    UPDATE_LINE, type UpdateLineAction
} from "../actions/subtitlesActions.ts";
import {List} from "immutable";
import {mergeIgnoringUndefined} from "../../utils/mergeIgnoringUndefined.ts";
import SMPTEtime from "../../utils/SMPTEtime.ts";

export type Line = ID_PROPERTY & NewLine;

function lineComparator(a: Line, b: Line): number {
    return SMPTEtime.comparator(a.start, b.start) || SMPTEtime.comparator(a.end, b.end);
}

export type SubtitlesState = List<Line>;

const INITIAL_STATE: SubtitlesState = List<Line>();

function subtitlesReducer(state: SubtitlesState = INITIAL_STATE, action: AnyAction): SubtitlesState {
    switch (action.type) {
        case CREATE_LINE : {
            const newLineProps = (action as CreateLineAction).line;
            const nextId = state.isEmpty()
                ? 1
                : state.map(line => (line as Line).id).max() + 1;

            const newLine = {id: nextId, ...newLineProps};

            return state
                .push(newLine)
                .sort(lineComparator)
                .toList();
        }
        case UPDATE_LINE : {
            const updatedLineProps = (action as UpdateLineAction).line;
            const id = updatedLineProps.id;

            const lineIndex = state.findIndex(line => (line as Line).id == id);

            if (lineIndex == -1)
                return state;

            return state
                .update(lineIndex, line => mergeIgnoringUndefined(line, updatedLineProps))
                .sort(lineComparator)
                .toList();
        }
        case DELETE_LINE : {
            const id = (action as DeleteLineAction).line.id;

            const lineIndex = state.findIndex(line => (line as Line).id == id);

            if (lineIndex == -1)
                return state;

            return state.delete(lineIndex);
        }
        default :
            return state;
    }
}

export default subtitlesReducer;
