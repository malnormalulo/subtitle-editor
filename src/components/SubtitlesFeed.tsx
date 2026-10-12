import React, {Component} from "react";
import './SubtitlesFeed.css'
import SubtitleLine from "./SubtitleLine.tsx";
import type {Line} from "../state/reducers/subtitlesReducer.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import {connect} from "react-redux";
import {List} from "immutable";
import SMPTEtime, {type FPS} from "../utils/SMPTEtime.ts";
import {createLine, type NewLine} from "../state/actions/subtitlesActions.ts";
import {ContentState, convertFromRaw, convertToRaw} from "draft-js";

type SubtitlesFeedState = {
    searchTerm?: string
}

type StateProps = {
    subtitles: List<Line>;
    videoFps: FPS | undefined;
};
type DispatchProps = {
    createLine: (line: NewLine) => void;
};
type SubtitlesFeedProps = StateProps & DispatchProps;

class SubtitlesFeed extends Component<SubtitlesFeedProps, SubtitlesFeedState> {
    constructor(props: SubtitlesFeedProps) {
        super(props);

        this.state = {searchTerm: undefined}

        this.onClick = this.onClick.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    render() {

        const subsListToDisplay = this.state.searchTerm
            ? this.props.subtitles.filter(
                line => convertFromRaw(line!.rawContentState)
                    .getPlainText()
                    .toLowerCase()
                    .includes(this.state.searchTerm!))
                .toList()
            : this.props.subtitles;

        return (
            <div id="subtitles-feed">
                {this.props.videoFps && <div id="actions-bar">
                    {this.props.subtitles.size > 1 && <input
                        type="text"
                        id="search-bar"
                        placeholder="search"
                        onChange={this.onSearch}
                    />}
                    <button
                        type="button"
                        id="add-line-button"
                        onClick={this.onClick}
                    >
                        Add line
                    </button>
                </div>}
                {subsListToDisplay.toArray().map((line: Line, index: number, lines: Line[]) =>
                    <SubtitleLine
                        key={line.id}
                        id={line.id}
                        rawContentState={line.rawContentState}
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
        const newLineContent = convertToRaw(ContentState.createFromText(""));

        this.props.createLine({
            start: newLineStart,
            end: newLineEnd,
            rawContentState: newLineContent
        });
    }

    private onSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value.toLowerCase()})
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