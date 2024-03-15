export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { isDone } = await request.json();

    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone }),
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error('PATCH Todos Error');
  }
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error('DELETE Todos Error');
  }
}
