import {type DraftInlineStyleType, type EditorState} from "draft-js";
import {Component} from "react";
import StyleButton from "./StyleButton.tsx";
import './EditorToolbar.css'

// https://stackblitz.com/edit/react-draft-js-demo

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    // { label: 'Monospace', style: 'CODE' },
];

type EditorToolbarProps = {
    editorState: EditorState;
    onToggleInline: (style: DraftInlineStyleType) => void;
}

class EditorToolbar extends Component<EditorToolbarProps> {
    render() {
        const { editorState, onToggleInline } = this.props;
        const inlineStyles = editorState.getCurrentInlineStyle();

        return (
            <div className="rich-editor-toolbar">
                <div
                    className="rich-editor-controls"
                    role="group"
                    aria-label="Inline formatting"
                >
                    {INLINE_STYLES.map((option) => (
                        <StyleButton
                            key={option.style}
                            {...option}
                            active={inlineStyles.has(option.style)}
                            onToggle={onToggleInline}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default EditorToolbar;