import {Component} from "react";
import {connect} from "react-redux";
import './Video.css'
import {setVideoAttributes} from "../state/actions/videoActions.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import type {FPS} from "../utils/SMPTEtime.ts";
import {getVideoFps} from "../utils/getFps.ts";

type StateProps = { videoSrc: string | null };
type DispatchProps = { setVideoAttributes: (src: string | null, fps: FPS | null) => void };
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

    async onFileChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = event.target.files?.[0];

        if (file) {
            const src = URL.createObjectURL(file);
            const fps = await getVideoFps(file);

            this.props.setVideoAttributes(src, (fps as unknown) as FPS | null);
        }
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    videoSrc: state.video.src
});

const mapDispatchToProps: DispatchProps = { setVideoAttributes: setVideoAttributes };

export default connect(mapStateToProps, mapDispatchToProps)(Video);