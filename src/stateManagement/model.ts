export type Todo = {
  id?: number;
  text: string;
  completed: boolean;
};

export interface AppState {
  todos: Todo[];
}
