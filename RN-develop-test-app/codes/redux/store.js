import {createStore, combineReducers} from 'redux';
import {setURLReducer, setPortReducer} from './reducers';

const store = createStore(
  combineReducers({
    url: setURLReducer,
    port: setPortReducer,
  }),
);

export default store;
