import { ROUTES } from './routes/index';

export async function mockFetch(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const route = ROUTES.find(
    (v) => (v.route === url && v.method === init?.method) || 'GET'
  );
  if (!route) {
    return new Response(null, { status: 404 });
  }
  return route.handler(new Request(url, init));
}
