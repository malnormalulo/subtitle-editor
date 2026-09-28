import {Component} from "react";
import './EditorFeed.css'
import SubtitleLine, {type SubtitleLineProps} from "./SubtitleLine.tsx";
import {List} from "immutable";
import SMPTEtime from "../utils/SMPTEtime.ts";

class EditorFeed extends Component<object> {
    constructor(props: object) {
        super(props)
    }

    render() {
        let subtitleLines = List<SubtitleLineProps>([]);
        for (let i = 0; i < 10; i += 2) {
            subtitleLines = subtitleLines.push({
                content: `test content ${i/2+1}`,
                start: new SMPTEtime(24, 0, 0, i, 0),
                end: new SMPTEtime(24, 0, 0, i + 1, 0)
            });
        }

        return (
            <div id="editor-feed">
                {/*{Array.apply(0, Array(30)).map(() => <br/>)}*/}
                {subtitleLines.map((line: SubtitleLineProps, index: number) =>
                    <SubtitleLine key={index} content={line.content} start={line.start} end={line.end}/>)}
            </div>
        )
    }
}

export default EditorFeed