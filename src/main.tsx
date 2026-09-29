import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "./state/store.ts";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')!
)
