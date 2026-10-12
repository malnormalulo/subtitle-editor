import {Component} from "react";
import './Video.css'
import type {RootState} from "../state/reducers/reducers.ts";
import { connect } from "react-redux";
import type {Line} from "../state/reducers/subtitlesReducer.ts";
import type { List } from "immutable";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

type StateProps = {
    currentTime?: number;
    subtitles: List<Line>;
};
type DispatchProps = {};
type VideoOverlayProps = StateProps & DispatchProps;

//https://tumee.medium.com/how-to-display-draft-js-content-as-html-154a0b2bac27

class VideoOverlay extends Component<VideoOverlayProps> {
    constructor(props: VideoOverlayProps) {
        super(props);
    }

    render() {
        const currentTime = this.props.currentTime!

        const linesToDisplay = this.props.subtitles.filter(line =>
            line !== undefined &&
            line.start.toSeconds() <= currentTime &&
            currentTime <= line.end.toSeconds() &&
            convertFromRaw(line!.rawContentState).getPlainText() !== ""
        );

        const editorContentHtml = linesToDisplay.map(line =>
            <div key={line!.id} dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(line!.rawContentState)) }} />)

        return (
            <div className="overlay">
                {editorContentHtml}
            </div>
        )
    }
}


const mapStateToProps = (state: RootState): StateProps => ({
    currentTime: state.video.currentTime,
    subtitles: state.subtitles
});

const mapDispatchToProps: DispatchProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverlay);
