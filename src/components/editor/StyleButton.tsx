import {Component} from "react";
import type {DraftInlineStyleType} from "draft-js";

type StyleButtonProps = {
    active: boolean;
    onToggle: (style: DraftInlineStyleType) => void;
    label: string;
    style: string;
}

class StyleButton extends Component<StyleButtonProps> {
    // private preventFocusChange = (event: React.MouseEvent<HTMLButtonElement>) =>
    //     event.preventDefault();

    constructor(props: StyleButtonProps) {
        super(props);
    }

    render() {
        const { active, label } = this.props;
        return (
            <button
                type="button"
                className="rich-editor-style-button"
                aria-pressed={active}
                // onMouseDown={this.preventFocusChange}
                onClick={() => this.props.onToggle(this.props.style as DraftInlineStyleType)}
            >
                {label}
            </button>
        );
    }
}

export default StyleButton;