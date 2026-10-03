import {Component} from "react";
import './EditorFeed.css'
import SubtitleLine from "./SubtitleLine.tsx";
import type {SubtLine} from "../state/reducers/subtitlesReducer.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import {connect} from "react-redux";

type StateProps = { subtitles: SubtLine[] };
type DispatchProps = {};
type SubtitlesFeedProps = StateProps & DispatchProps;

class SubtitlesFeed extends Component<SubtitlesFeedProps> {
    constructor(props: SubtitlesFeedProps) {
        super(props)
    }

    render() {
        return (
            <div id="subtitles-feed">
                {this.props.subtitles.map((line: SubtLine, index: number) =>
                    <SubtitleLine key={index} content={line.content} start={line.start} end={line.end}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    subtitles: state.subtitles
});

const mapDispatchToProps: DispatchProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesFeed);