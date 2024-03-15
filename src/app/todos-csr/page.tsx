'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import type { Todo, newTodo } from '@/types';

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
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone }),
      });
    },
  });

  const addTodoHandler = (e: FormEvent) => {
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
        onError: () => {
          alert('POST Todo Error');
        },
      }
    );
  };

  const toggleTodohandler = (id: string, isDone: boolean) => {
    toggleTodoMutation.mutate(
      { id, isDone: !isDone },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: () => {
          alert('PATCH Todo Error');
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h1 className="text-[20px]">Add todo</h1>
      <p>todo list CRUD - CSR rendering</p>
      <form onSubmit={addTodoHandler}>
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
              <input
                type="checkbox"
                checked={todo.isDone}
                onClick={() => toggleTodohandler(todo.id, todo.isDone)}
              />
              <button className="cursor-pointer">x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodosPageCSR;
