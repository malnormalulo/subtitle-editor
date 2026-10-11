import type {AnyAction} from "redux";
import {SET_ACTIVE_LINE, type SetActiveLineAction} from "../actions/activeLineActions.ts";

export type ActiveLineState = {
    id?: number;
};

const INITIAL_STATE: ActiveLineState = {};

function activeLineReducer(state: ActiveLineState = INITIAL_STATE, action: AnyAction): ActiveLineState {
    switch (action.type) {
        case SET_ACTIVE_LINE : {
            return {id: (action as SetActiveLineAction).line.id};
        }
        default :
            return state;
    }
}

export default activeLineReducer;
