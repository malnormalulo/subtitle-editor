import {Component} from "react";
import './SubtitleLine.css'
import SMPTEtime from "../utils/SMPTEtime.ts";
import TimeInput from "./TimeInput.tsx";

type SubtitleLineProps = {
    content: string;
    start: SMPTEtime;
    end: SMPTEtime;
};

class SubtitleLine extends Component<SubtitleLineProps, SubtitleLineProps> {
    constructor(props: SubtitleLineProps) {
        super(props);
        this.state = props;

        // this.onTimeFieldChange = this.onTimeFieldChange.bind(this)
    }

    render() {
        return (
            <div className="subtitle-line-container">
                <div className="subtitle-line-times">
                    <TimeInput label="start:" time={this.state.start}/>
                    <TimeInput label="end:" time={this.state.end}/>
                </div>
                <div className="subtitle-line-actions">
                    <button type="button">Add before</button>
                    <button type="button">Add after</button>
                    <button type="button">Delete</button>
                </div>
                <div className="subtitle-line-content">{this.state.content}</div>
            </div>
        )
    }

    // private onTimeFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const newValue = event.currentTarget.value;
    //     const newTime = SMPTEtime.createTimeFromString(newValue, this.state.start.fps);
    //
    //     if (newTime)
    //         console.log(newTime)
    //     else
    //         console.log(`invalid: ${newValue}`)
    // }
}

export default SubtitleLine;