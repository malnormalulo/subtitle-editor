import {Component} from "react";
import './Video.css'

type VideoState = { videoSrc: string | null };

class Video extends Component<object, VideoState> {
    constructor(props: object) {
        super(props)

        this.state = { videoSrc: null };

        this.setVideoSrc = this.setVideoSrc.bind(this);
    }

    render() {
        return (
            <div className="video-container">
                {!this.state.videoSrc && <div className="video-upload-container">
                    <label htmlFor="videoInput" className="custom-file-upload">
                        Upload a video
                    </label>
                    <input
                        id="videoInput"
                        type="file"
                        accept="video/mp4"
                        onChange={this.setVideoSrc}
                        style={{ display: 'none' }}
                    />
                </div>}
                {this.state.videoSrc && <video src={this.state.videoSrc} controls>
                    video
                </video>}
            </div>
        )
    }

    setVideoSrc(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];

        if (file) {
            const videoUrl = URL.createObjectURL(file);
            this.setState({ videoSrc: videoUrl });
        }
    }

}

export default Video