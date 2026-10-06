import {Component} from "react";
import './SubtitlesFeed.css'
import SubtitleLine from "./SubtitleLine.tsx";
import type {Line} from "../state/reducers/subtitlesReducer.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import {connect} from "react-redux";
import {List} from "immutable";
import SMPTEtime, {type FPS} from "../utils/SMPTEtime.ts";
import {createLine, type NewLine} from "../state/actions/subtitlesActions.ts";

type StateProps = {
    subtitles: List<Line>;
    videoFps: FPS | null;
};
type DispatchProps = {
    createLine: (line: NewLine) => void;
};
type SubtitlesFeedProps = StateProps & DispatchProps;

class SubtitlesFeed extends Component<SubtitlesFeedProps> {
    constructor(props: SubtitlesFeedProps) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div id="subtitles-feed">
                {this.props.videoFps && <div id="actions-bar">
                    {this.props.subtitles.size > 1 && <input
                        type="text"
                        id="search-bar"
                        placeholder="search"
                    />}
                    <button
                        type="button"
                        id="add-line-button"
                        onClick={this.onClick}
                    >
                        Add line
                    </button>
                </div>}
                {this.props.subtitles.toArray().map((line: Line, index: number, lines: Line[]) =>
                    <SubtitleLine
                        key={line.id}
                        id={line.id}
                        content={line.content}
                        start={line.start}
                        end={line.end}
                        prevEnd={lines[index - 1]?.end}
                        nextStart={lines[index + 1]?.start}
                    />)}
            </div>
        )
    }

    private onClick() {
        const newLineStart = new SMPTEtime(this.props.videoFps!, 0, 0, 0, 0);
        const newLineEnd = new SMPTEtime(this.props.videoFps!, 0, 0, 1, 0);
        const newLineContent = "";

        this.props.createLine({
            start: newLineStart,
            end: newLineEnd,
            content: newLineContent
        });
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    subtitles: state.subtitles,
    videoFps: state.video.fps
});

const mapDispatchToProps: DispatchProps = {
    createLine: createLine
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesFeed);