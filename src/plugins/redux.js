import {createStore,applyMiddleware} from 'redux';
import think from 'redux-thunk';
import reducer from "../store/reducer";
import state from "../store/state";

let store = createStore(reducer,state,applyMiddleware(think));

export default store