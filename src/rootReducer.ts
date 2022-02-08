import {combineReducers} from 'redux';

import todosReducer from './stateManagement';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
