import {Component} from "react";
import './SubtitleLine.css'
import SMPTEtime from "../utils/SMPTEtime.ts";
import TimeInput from "./TimeInput.tsx";
import LineContentEditor from "./LineContentEditor.tsx";
import type {ID_PROPERTY} from "../state/actions/subtitlesActions.ts";

type SubtitleLineProps = {
    content: string;
    start: SMPTEtime;
    end: SMPTEtime;
} & ID_PROPERTY;

class SubtitleLine extends Component<SubtitleLineProps, object> {
    constructor(props: SubtitleLineProps) {
        super(props);
    }

    render() {
        const id = this.props.id;

        return (
            <div className="subtitle-line-container">
                <div className="subtitle-line-times">
                    <TimeInput id={id} isStart={true} time={this.props.start} max={this.props.end}/>
                    <TimeInput id={id} isStart={false} time={this.props.end} min={this.props.start}/>
                </div>
                <div className="subtitle-line-actions">
                    <button type="button">Add before</button>
                    <button type="button">Add after</button>
                    <button type="button">Delete</button>
                </div>
                <div className="subtitle-line-content">
                    <LineContentEditor id={id} content={this.props.content}/>
                </div>
            </div>
        )
    }
}

export default SubtitleLine;