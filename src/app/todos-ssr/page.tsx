import { Todo } from '@/types/todo';

const TodosPageSSR = async () => {
  const response = await fetch('http://localhost:4000/todos', {
    cache: 'no-cache',
  });
  const todos = await response.json();
  console.log(todos);

  let num = 0; // 리스트 넘버..

  return (
    <div>
      <h1>todo list</h1>
      <p>info</p>
      <table>
        <thead>
          <tr>
            <th>*</th>
            <th>title</th>
            <th>contents</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: Todo) => {
            return (
              <tr key={todo.id}>
                <td>{++num}</td>
                <td>{todo.title}</td>
                <td>{todo.contents}</td>
                <td>{todo.isDone ? 'finish' : 'ongoing'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodosPageSSR;
