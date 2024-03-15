export type newTodo = {
  title: string;
  contents: string;
};

export type Todo = newTodo & {
  id: string;
  isDone: boolean;
};

export type Company = {
  name: string;
  description: string;
  image: string;
};
