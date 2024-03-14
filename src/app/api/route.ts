export async function GET(request: Request) {
  const response = await fetch('http://localhost:4000/todos');
  const todos = await response.json();

  if (!todos) {
    return new Response('Todo is not found', {
      status: 404,
    });
  }

  return Response.json({
    todos,
  });
}

export async function POST(request: Request) {
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
}

export async function PUT(request: Request) {
  console.log('PUT');
}

export async function DELETE(request: Request) {
  console.log('DELETE');
}

export async function PATCH(request: Request) {
  console.log('PATCH');
}
