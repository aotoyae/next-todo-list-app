export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:4000/company');
    const company = await response.json();

    return Response.json({
      company,
    });
  } catch (error) {
    throw new Error('GET Company Error');
  }
}
