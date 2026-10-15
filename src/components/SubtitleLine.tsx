import {Component} from "react";
import './SubtitleLine.css'
import SMPTEtime from "../utils/SMPTEtime.ts";
import TimeInput from "./TimeInput.tsx";
import LineContentEditor from "./editor/LineContentEditor.tsx";
import {
    createLine,
    type DeleteLine,
    deleteLine,
    type ID_PROPERTY,
    type NewLine
} from "../state/actions/subtitlesActions.ts";
import {connect} from "react-redux";
import {ContentState, convertToRaw, type RawDraftContentState} from "draft-js";

type DispatchProps = {
    deleteLine: (line: DeleteLine) => void;
    createLine: (line: NewLine) => void;
};

type SubtitleLineProps = {
    rawContentState: RawDraftContentState; // https://learn-draftjs-now.vercel.app/content-state
    start: SMPTEtime;
    end: SMPTEtime;
    prevEnd?: SMPTEtime;
    nextStart?: SMPTEtime;
} & ID_PROPERTY & DispatchProps;

class SubtitleLine extends Component<SubtitleLineProps, object> {
    constructor(props: SubtitleLineProps) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    render() {
        const id = this.props.id;

        const durationInSeconds = this.props.end.toSeconds() - this.props.start.toSeconds();
        const durationHours = Math.floor(durationInSeconds / 3600);
        const durationMinutes = Math.floor((durationInSeconds / 60) % 60);
        const durationSeconds = (durationInSeconds % 60).toFixed(2).padStart(5, '0');

        const pad = (num: number) => num.toString().padStart(2, '0');
        const durationText = `${pad(durationHours)}:${pad(durationMinutes)}:${durationSeconds}`;

        return (
            <div className="subtitle-line-container">
                <div className="subtitle-line-times">
                    <TimeInput id={id} isStart={true} time={this.props.start} max={this.props.end}/>
                    <span className="subtitle-line-duration">
                        duration:
                        <span>{durationText}</span>
                    </span>
                    <TimeInput id={id} isStart={false} time={this.props.end} min={this.props.start}/>
                </div>
                <div className="subtitle-line-actions">
                    <button type="button" onClick={() => this.onAdd(true)}>Add before</button>
                    <button type="button" onClick={() => this.onAdd(false)}>Add after</button>
                    <button type="button" onClick={this.onDelete}>Delete</button>
                </div>
                <div className="subtitle-line-content">
                    <LineContentEditor id={id} rawContentState={this.props.rawContentState}/>
                </div>
            </div>
        )
    }

    private onAdd(isBefore: boolean) {
        const {start, end, prevEnd, nextStart} = this.props;
        let newLineStart: SMPTEtime;
        let newLineEnd: SMPTEtime;

        if (isBefore) {
            newLineEnd = start;
            newLineStart = prevEnd
                ? SMPTEtime.max(start.addSeconds(-1), SMPTEtime.min(prevEnd, start))
                : start.addSeconds(-1);
        } else {
            newLineStart = nextStart ? SMPTEtime.min(end, nextStart) : end;
            newLineEnd = nextStart
                ? SMPTEtime.min(newLineStart.addSeconds(1), nextStart)
                : newLineStart.addSeconds(1);
        }

        const newLineContent = convertToRaw(ContentState.createFromText(""));

        this.props.createLine({
            start: newLineStart,
            end: newLineEnd,
            rawContentState: newLineContent
        });
    }

    private onDelete() {
        this.props.deleteLine({id: this.props.id})
    }
}

const mapDispatchToProps: DispatchProps = {
    deleteLine: deleteLine,
    createLine: createLine
};

export default connect(null, mapDispatchToProps)(SubtitleLine);