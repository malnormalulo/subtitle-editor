import {Component} from "react";
import {ContentState, type DraftInlineStyleType, Editor, EditorState, RichUtils} from "draft-js";
import {type ID_PROPERTY, updateLine, type UpdateLine} from "../../state/actions/subtitlesActions.ts";
import './LineContentEditor.css'
import {connect} from "react-redux";
import EditorToolbar from "./EditorToolbar.tsx";
import {type ActiveLine, setActiveLine} from "../../state/actions/activeLineActions.ts";

type StateProps = {
    content: string;
} & ID_PROPERTY;
type DispatchProps = {
    updateLine: (line: UpdateLine) => void;
    setActiveLine: (line: ActiveLine) => void;
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
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.focusSelection = this.focusSelection.bind(this);
        this.onFocus = this.onFocus.bind(this);
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
                    onFocus={this.onFocus}
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

    onFocus() {
        this.props.setActiveLine({id: this.props.id});
    }
}


const mapDispatchToProps: DispatchProps = {
    updateLine: updateLine,
    setActiveLine: setActiveLine
};

export default connect(null, mapDispatchToProps)(LineContentEditor);