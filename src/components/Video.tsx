import {Component} from "react";
import {connect} from "react-redux";
import './Video.css'
import {setVideoSrc} from "../state/actions.ts";
import type {RootState} from "../state/reducers/reducers.ts";

type StateProps = { videoSrc: string | null };
type DispatchProps = { setVideoSrc: (src: string | null) => void };
type VideoProps = StateProps & DispatchProps;

class Video extends Component<VideoProps> {
    constructor(props: VideoProps) {
        super(props)
        this.onFileChange = this.onFileChange.bind(this);
    }

    render() {
        const {videoSrc} = this.props;
        return (
            <div className="video-container">
                {!videoSrc && <div className="video-upload-container">
                    <label htmlFor="video-input" className="custom-file-upload">
                        Upload a video
                    </label>
                    <input
                        id="video-input"
                        type="file"
                        accept="video/mp4"
                        onChange={this.onFileChange}
                        style={{ display: 'none' }}
                    />
                </div>}
                {videoSrc && <video src={videoSrc} controls/>}
            </div>
        )
    }

    onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            this.props.setVideoSrc(URL.createObjectURL(file));
        }
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    videoSrc: state.video.src
});

const mapDispatchToProps: DispatchProps = { setVideoSrc };

export default connect(mapStateToProps, mapDispatchToProps)(Video);