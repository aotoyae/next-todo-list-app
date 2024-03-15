'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Todo, newTodo } from '@/types/todo';
import { FormEvent, useState } from 'react';

const TodosPageCSR = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/todos');
      const { todos } = await response.json();

      return todos;
    },
  });

  const newTodoMudation = useMutation({
    mutationFn: async (newTodo: newTodo) => {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      const todo = await response.json();
      return todo;
    },
  });

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    newTodoMudation.mutate(
      { title, contents },
      {
        onSuccess: () => {
          setTitle('');
          setContents('');

          queryClient.invalidateQueries({
            queryKey: ['todos'],
          });
        },
      }
    );
  };

  if (isLoading) return <div>Loding...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h1 className="text-[20px]">todos-csr</h1>
      <p>info</p>
      <form onSubmit={onSubmitHandler}>
        <input
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={contents}
          placeholder="contents"
          onChange={(e) => setContents(e.target.value)}
        />
        <button>click</button>
      </form>
      <ul className="p-5 flex gap-10 text-left">
        {todos.map((todo: Todo) => {
          return (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.contents}</p>
              {todo.isDone ? <p>finish</p> : <p>Ongoing</p>}
              <button className="cursor-pointer">x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodosPageCSR;
