import {Component} from "react";
import './SubtitleLine.css'
import type SMPTEtime from "../utils/SMPTEtime.ts";

export type SubtitleLineProps = {
    content: string;
    start: SMPTEtime;
    end: SMPTEtime;
};

class SubtitleLine extends Component<SubtitleLineProps, SubtitleLineProps> {
    constructor(props: SubtitleLineProps) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="subtitle-line-container">

                {this.state.content}
            </div>
        )
    }
}

export default SubtitleLine;