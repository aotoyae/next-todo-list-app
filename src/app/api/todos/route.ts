export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:4000/todos');
    const todos = await response.json();

    return Response.json({ todos });
  } catch (error) {
    throw new Error('GET Todos Error');
  }
}

export async function POST(request: Request) {
  try {
    const newTodo = await request.json();
    const response = await fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...newTodo, isDone: false }),
    });

    const todo = await response.json();
    return Response.json({ todo });
  } catch (error) {
    throw new Error('POST Todo Error');
  }
}
