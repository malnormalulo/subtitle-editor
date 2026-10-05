import { Component } from 'react'
import './App.css'
import SubtitlesFeed from "./components/SubtitlesFeed.tsx";
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
          <SubtitlesFeed/>
        </section>
      </div>
    )
  }
}

export default App
