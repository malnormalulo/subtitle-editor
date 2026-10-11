import {Component, createRef} from "react";
import {connect} from "react-redux";
import './Video.css'
import {setVideoAttributes} from "../state/actions/videoActions.ts";
import type {RootState} from "../state/reducers/reducers.ts";
import type {FPS} from "../utils/SMPTEtime.ts";
import {getVideoFps} from "../utils/getFps.ts";
import VideoOverlay from "./VideoOverlay.tsx";

type StateProps = {
    src?: string;
    currentTime?: number;
};
type DispatchProps = {
    setVideoAttributes: (src: string | undefined, fps: FPS | undefined, currentTime: number | undefined) => void;
};
type VideoProps = StateProps & DispatchProps;

class Video extends Component<VideoProps> {
    private videoRef = createRef<HTMLVideoElement>();

    constructor(props: VideoProps) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    render() {
        const {src, currentTime} = this.props;

        if (currentTime !== undefined && this.videoRef.current && this.videoRef.current.currentTime !== currentTime)
            this.videoRef.current.currentTime = currentTime;

        return (
            <div className="video-container">
                {!src && <div className="video-upload-container">
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
                {src && <video
                    src={src}
                    ref={this.videoRef}
                    onTimeUpdate={this.onTimeUpdate}
                    controls
                />}
                {src && <VideoOverlay/>}
            </div>
        )
    }

    private async onFileChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = event.target.files?.[0];

        if (file) {
            const src = URL.createObjectURL(file);
            const fps = await getVideoFps(file);

            this.props.setVideoAttributes(src, (fps as unknown) as FPS, 0);
        }
    }

    private onTimeUpdate(event: React.SyntheticEvent<HTMLVideoElement, Event>){
        this.props.setVideoAttributes(undefined, undefined, event.currentTarget.currentTime);
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    src: state.video.src,
    currentTime: state.video.currentTime
});

const mapDispatchToProps: DispatchProps = { setVideoAttributes: setVideoAttributes };

export default connect(mapStateToProps, mapDispatchToProps)(Video);