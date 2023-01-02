import { ROUTES } from './routes/index';

export async function mockFetch(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const route = ROUTES.find((v) => {
    if (v.method !== (init?.method || 'GET')) return false;
    if (v.route === url) return true;
    return url.match(new RegExp(`^${v.route.replace(/{\w+}/g, '[^/]+')}$`));
  });
  if (!route) {
    return new Response('', { status: 404 });
  }
  return route.handler(new Request(url, init));
}
