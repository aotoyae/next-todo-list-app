import Link from 'next/link';

import type { Todo } from '@/types';

const TodosPageSSR = async () => {
  const response = await fetch('http://localhost:4000/todos', {
    cache: 'no-cache',
  });
  const todos = await response.json();
  console.log(todos);

  let num = 0; // 리스트 넘버..
  const TH_TD_ST = 'px-5 py-3';

  return (
    <div>
      <h1 className="text-[20px]">todo list</h1>
      <p>todo list table - SSR rendering</p>
      <Link href="/report">
        <button>➡️ to todo list report</button>
      </Link>
      <table>
        <thead>
          <tr className="border-b-2 border-white">
            <th className={TH_TD_ST}>*</th>
            <th className={TH_TD_ST}>title</th>
            <th className={TH_TD_ST}>contents</th>
            <th className={TH_TD_ST}>state</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: Todo) => {
            return (
              <tr key={todo.id} className="border-b-2 border-white">
                <td className={TH_TD_ST}>{++num}</td>
                <td className={TH_TD_ST}>{todo.title}</td>
                <td className={TH_TD_ST}>{todo.contents}</td>
                <td className={TH_TD_ST}>
                  {todo.isDone ? 'finish' : 'ongoing'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodosPageSSR;
