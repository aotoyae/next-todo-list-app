import { Todo } from '@/types';

const ReportPage = async () => {
  const response = await fetch('http://localhost:4000/todos', {
    next: { revalidate: 10 },
  });
  const todos = await response.json();

  const ongoingTodos = todos.filter((todo: Todo) => todo.isDone === false);
  const finishTodos = todos.filter((todo: Todo) => todo.isDone === true);

  return (
    <div>
      <h1 className="text-[20px]">report</h1>
      <p>todo list report - ISR rendering</p>
      <h2>
        {todos.length}개의 todo 중에서 {finishTodos.length}개를 완료했어요!
      </h2>
    </div>
  );
};

export default ReportPage;
