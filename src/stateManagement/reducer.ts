import {handleActions, Action} from 'redux-actions';

import {
  Todo,
  IState,
} from './model';
import {ActionTypes} from '../constants/ActionTypes';

const initialState: IState = [<Todo>{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}];

export default handleActions<IState, Todo>({
  [ActionTypes.ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id ? todo.id : 0, maxId), -1) + 1,
      completed: action.payload ? action.payload.completed : false,
      text: action.payload ? action.payload.text : ''
    }, ...state];
  },

  [ActionTypes.DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return state.filter(todo =>
      action.payload && todo.id !== action.payload.id
    );
  },

  [ActionTypes.EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
    return <IState>state.map(todo =>
      action.payload && todo.id === action.payload.id
        ? {...todo, text: action.payload.text}
        : todo
    );
  },

  [ActionTypes.COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return <IState>state.map(todo =>
      action.payload && todo.id === action.payload.id ?
        {...todo, completed: !todo.completed} :
        todo
    );
  },

  [ActionTypes.COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
    const areAllMarked = state.every(todo => todo.completed);
    return <IState>state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }));
  },

  [ActionTypes.CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
    return state.filter(todo => !todo.completed);
  }
}, initialState);
