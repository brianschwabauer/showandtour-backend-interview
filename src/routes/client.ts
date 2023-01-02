import { CLIENTS } from '../mock-data/clients';

export async function GET(request: Request): Promise<Response> {
  // Can you add a '_fetchTime' field to the returned 'client' that gets the current time?
  const url = new URL(request.url);
  const id = url.pathname.match(/\/client\/([^\/]+)/)?.[1];
  const client = CLIENTS.find((v) => v.id === id);
  if (!client) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(client));
}

export async function PATCH(request: Request): Promise<Response> {
  // How could you do a 'partial' update on the client and only update the provided fields?
  const body: typeof CLIENTS[number] = await request.json();
  const url = new URL(request.url);
  const id = url.pathname.match(/\/client\/([^\/]+)/)?.[1];
  const index = CLIENTS.findIndex((v) => v.id === id);
  CLIENTS[index] = body;
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request): Promise<Response> {
  // How would you implement the delete functionality?
  return new Response(null, { status: 204 });
}

export const ROUTES = [
  {
    route: '/client/{clientID}',
    method: 'GET',
    handler: GET,
  },
  {
    route: '/client/{clientID}',
    method: 'PATCH',
    handler: PATCH,
  },
  {
    route: '/client/{clientID}',
    method: 'DELETE',
    handler: DELETE,
  },
];
