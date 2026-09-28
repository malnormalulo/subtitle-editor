import { Component } from 'react'
import './App.css'
import EditorFeed from "./components/EditorFeed.tsx";
import Video from "./components/Video.tsx";

type AppState = { count: number }

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    return (
      <div className="app">
        <section id="header"><h3>subtitle-editor-header</h3></section>

        <section id="center">
          <Video/>
          <EditorFeed/>
        </section>
      </div>
    )
  }
}

export default App
