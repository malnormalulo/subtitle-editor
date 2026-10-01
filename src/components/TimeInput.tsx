import SMPTEtime from "../utils/SMPTEtime.ts";
import {Component} from "react";
import './TimeInput.css'

type TimeInputProps = {
    label: string;
    time: SMPTEtime;
};

class TimeInput extends Component<TimeInputProps, TimeInputProps> {
    constructor(props: TimeInputProps) {
        super(props);
        this.state = props;

        // this.onTimeFieldChange = this.onTimeFieldChange.bind(this)
    }

    render() {
        return (
            <label className="time-input">
                {this.state.label}
                <input
                    type="text"
                    defaultValue={this.state.time.toString()}
                    pattern={SMPTEtime.pattern}
                    // onChange={this.onTimeFieldChange}
                />
            </label>
        )
    }

    // private onTimeFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const newValue = event.currentTarget.value;
    //     const newTime = SMPTEtime.createTimeFromString(newValue, this.state.start.fps);
    //
    //     if (newTime)
    //         console.log(newTime)
    //     else
    //         console.log(`invalid: ${newValue}`)
    // }
}

export default TimeInput;