export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:4000/todos');
    const todos = await response.json();

    if (!todos) {
      return new Response('Todo is not found', {
        status: 404,
      });
    }

    return Response.json({ todos });
  } catch (error) {
    throw new Error('GET Todos Error');
  }
}

export async function POST(request: Request) {
  try {
    const { title, contents } = await request.json();
    const response = await fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, contents, isDone: false }),
    });

    const todo = await response.json();

    return Response.json({ todo });
  } catch (error) {
    throw new Error('POST Todos Error');
  }
}

export async function PATCH(request: Request) {
  try {
    console.log('PATCH');
  } catch (error) {
    throw new Error('PATCH Todos Error');
  }
}

export async function DELETE(request: Request) {
  try {
    const id = await request.json();
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
    });

    const todos = await response.json();
    return Response.json({ todos });
  } catch (error) {
    throw new Error('DELETE Todos Error');
  }
}
