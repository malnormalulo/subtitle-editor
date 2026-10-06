import SMPTEtime from "../utils/SMPTEtime.ts";
import React, {Component} from "react";
import './TimeInput.css'
import {
    type ID_PROPERTY,
    type UpdateLine,
    updateLine
} from "../state/actions/subtitlesActions.ts";
import {connect} from "react-redux";

type DispatchProps = { updateLine: (line: UpdateLine) => void };

type TimeInputProps = {
    isStart: boolean;
    time: SMPTEtime;
    min?: SMPTEtime;
    max?: SMPTEtime;
} & ID_PROPERTY & DispatchProps;

type TimeInputState = {
    value: string;
    isInvalid: boolean;
}

class TimeInput extends Component<TimeInputProps, TimeInputState> {
    constructor(props: TimeInputProps) {
        super(props);

        this.state = {value: props.time.toString(), isInvalid: false};

        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    componentDidUpdate(prevProps: TimeInputProps) {
        if (prevProps.time !== this.props.time)
            this.setState({value: this.props.time.toString(), isInvalid: false});
    }

    render() {
        return (
            <label className="time-input">
                {`${this.props.isStart ? "start" : "end"}:`}
                <input
                    type="text"
                    value={this.state.value}
                    pattern={SMPTEtime.pattern}
                    aria-invalid={this.state.isInvalid}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                />
            </label>
        )
    }

    /**
     * Parses value using the edited time's fps, returns null if value is invalid or outside [min, max]
     */
    private parseTime(value: string): SMPTEtime | null {
        const time = SMPTEtime.createTimeFromString(value, this.props.time.fps);

        if (!time)
            return null;
        if (this.props.min && SMPTEtime.comparator(time, this.props.min) < 0)
            return null;
        if (this.props.max && SMPTEtime.comparator(time, this.props.max) > 0)
            return null;
        return time;
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        this.setState({
            value:value,
            isInvalid: this.parseTime(value) === null
        });
    }

    private onBlur() {
        const newTime = this.parseTime(this.state.value);

        if (!newTime) {
            this.setState({
                value: this.props.time.toString(),
                isInvalid: false
            });
            return;
        }

        if (SMPTEtime.comparator(newTime, this.props.time) === 0)
            return;

        this.props.updateLine(this.props.isStart
            ? {id: this.props.id, start: newTime}
            : {id: this.props.id, end: newTime})
    }
}

const mapDispatchToProps: DispatchProps = {updateLine: updateLine};

export default connect(null, mapDispatchToProps)(TimeInput);