import { CLIENTS } from '../mock-data/clients';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const clients = CLIENTS.slice(0, +(url.searchParams.get('limit') || 10));
  return new Response(JSON.stringify(clients));
}

export const ROUTES = [
  {
    route: '/client',
    method: 'GET',
    handler: GET,
  },
];
