import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';

import {
  Header,
  MainSection,
} from './components';

import {model} from './stateManagement';

import {
  addTodo,
  editTodo,
  clearCompleted,
  completeAll,
  completeTodo,
  deleteTodo,
} from './stateManagement';

interface AppProps {
  todos: model.Todo[];
  dispatch: Dispatch<{}>;
}

interface AppState {
  todos: model.Todo[];
}

class App extends React.Component<AppProps, AppState> {
  render() {
    const {todos, dispatch} = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => dispatch(addTodo(text))}/>
        <MainSection
          todos={todos}
          editTodo={(t, s) => dispatch(editTodo(t, s))}
          deleteTodo={(t: model.Todo) => dispatch(deleteTodo(t))}
          completeTodo={(t: model.Todo) => dispatch(completeTodo(t))}
          clearCompleted={() => dispatch(clearCompleted())}
          completeAll={() => dispatch(completeAll())}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
