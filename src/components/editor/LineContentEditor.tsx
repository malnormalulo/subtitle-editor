import {Component} from "react";
import {ContentState, type DraftInlineStyleType, Editor, EditorState, RichUtils} from "draft-js";
import {type ID_PROPERTY, updateLine, type UpdateLine} from "../../state/actions/subtitlesActions.ts";
import './LineContentEditor.css'
import {connect} from "react-redux";
import EditorToolbar from "./EditorToolbar.tsx";

type StateProps = {
    content: string;
} & ID_PROPERTY;
type DispatchProps = {
    updateLine: (line: UpdateLine) => void;
};
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
                <EditorToolbar
                    editorState={this.state.editorState}
                    onToggleInline={this.toggleInlineStyle}
                />
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    spellCheck={true}
                />
            </div>
        )
    }

    private toggleInlineStyle = (style: DraftInlineStyleType) => {
        this.onChange(RichUtils.toggleInlineStyle(this.focusSelection(), style));
    };

    private focusSelection = () => {
        const editorState = this.state.editorState;
        return editorState.getSelection().getHasFocus()
            ? editorState
            : EditorState.forceSelection(editorState, editorState.getSelection());
    };

    onChange(editorState: EditorState) {
        this.props.updateLine({id: this.props.id, content: editorState.getCurrentContent().getPlainText()})
        this.setState({editorState});
    }
}


const mapDispatchToProps: DispatchProps = {updateLine: updateLine};

export default connect(null, mapDispatchToProps)(LineContentEditor);