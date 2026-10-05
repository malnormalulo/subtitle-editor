import SMPTEtime from "../../utils/SMPTEtime.ts";

export const CREATE_LINE = "CREATE_LINE";
export const UPDATE_LINE = "UPDATE_LINE";
export const DELETE_LINE = "DELETE_LINE";

export type ID_PROPERTY = {
    id: number;
}


export type NewLine = {
    start: SMPTEtime;
    end: SMPTEtime;
    content: string;
}

export type CreateLineAction = {
    type: typeof CREATE_LINE,
    line: NewLine
};

export function createLine(line: NewLine): CreateLineAction {
    return {
        type: CREATE_LINE,
        line: line
    };
}


export type UpdateLine = {
    start?: SMPTEtime;
    end?: SMPTEtime;
    content?: string;
} & ID_PROPERTY;

export type UpdateLineAction = {
    type: typeof UPDATE_LINE,
    line: UpdateLine
};

export function updateLine(line: UpdateLine): UpdateLineAction {
    return {
        type: UPDATE_LINE,
        line: line
    };
}


export type DeleteLine = ID_PROPERTY;

export type DeleteLineAction = {
    type: typeof DELETE_LINE,
    line: DeleteLine
};

export function deleteLine(line: DeleteLine): DeleteLineAction {
    return {
        type: DELETE_LINE,
        line: line
    };
}
