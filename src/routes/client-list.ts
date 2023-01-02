import { generateID } from '../lib/id';
import { CLIENTS } from '../mock-data/clients';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // Could you transform the clients names so that the last name comes before the first name?
  // Example: `John Smith` becomes `Smith, John`
  const clients = CLIENTS.slice(0, +(url.searchParams.get('limit') || 10));
  // Could you add a sorting mechanism to sort the clients alphabetically?
  return new Response(JSON.stringify(clients));
}

export async function POST(request: Request): Promise<Response> {
  // What are some security implications for this POST call?
  const body: typeof CLIENTS[number] = await request.json();
  const id = generateID();
  // How might you do data validation for the incoming request body?
  CLIENTS.push({ ...body, id });
  return new Response(id);
}

export const ROUTES = [
  {
    route: '/client',
    method: 'GET',
    handler: GET,
  },
  {
    route: '/client',
    method: 'POST',
    handler: POST,
  },
];
