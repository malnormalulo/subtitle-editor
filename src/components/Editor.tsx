import {Component} from "react";
import './Editor.css'

class Editor extends Component<object> {
    constructor(props: object) {
        super(props)
    }

    render() {
        return (
            <div id="editor-feed">
                {Array.apply(0, Array(30)).map( () => <br/>)}
                editor
            </div>
        )
    }
}

export default Editor