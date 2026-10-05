import {Component} from "react";
import './SubtitlesFeed.css'
import SubtitleLine from "./SubtitleLine.tsx";
import type {Line} from "../state/reducers/subtitlesReducer.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import {connect} from "react-redux";
import {List} from "immutable";

type StateProps = { subtitles: List<Line>; };
type DispatchProps = {};
type SubtitlesFeedProps = StateProps & DispatchProps;

class SubtitlesFeed extends Component<SubtitlesFeedProps> {
    constructor(props: SubtitlesFeedProps) {
        super(props)
    }

    render() {
        return (
            <div id="subtitles-feed">
                {this.props.subtitles.toArray().map((line: Line, index: number) =>
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