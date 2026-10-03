import {Component} from "react";
import {ContentState, Editor, EditorState} from "draft-js";

type StateProps = { content: string };
type DispatchProps = {};
type LineContentEditorProps = StateProps & DispatchProps;

type LineContentEditorState = {
    editorState: EditorState;
};

class LineContentEditor extends Component<LineContentEditorProps, LineContentEditorState> {
    constructor(props: LineContentEditorProps) {
        super(props)
        this.state = {editorState: EditorState.createWithContent(ContentState.createFromText(this.props.content))};

        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    onChange (editorState: EditorState) {
        this.setState({editorState});
    }
}

export default LineContentEditor;