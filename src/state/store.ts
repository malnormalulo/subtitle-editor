import {createStore} from 'redux';
import reducers from "./reducers/reducers.ts";

const store = createStore(reducers);

export default store;
