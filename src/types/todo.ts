export type newTodo = {
  title: string;
  contents: string;
};

export type Todo = newTodo & {
  id: string;
  isDone: boolean;
};
