import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

// Local preview of the project's limited static routing rules; Vercel remains the production router.
export function createPreviewServer(directory = join(root, 'dist')) {
  return createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
      }
      const url = new URL(request.url, 'http://localhost');
      for (const rule of config.redirects) {
        const pathMatches = rule.source === '/:path*' || rule.source === url.pathname;
        const conditionsMatch = (rule.has ?? []).every((condition) => {
          if (condition.type === 'host') return request.headers.host?.split(':')[0] === condition.value;
          if (condition.type === 'query') return url.searchParams.get(condition.key) === condition.value;
          return false;
        });
        if (pathMatches && conditionsMatch) {
          const destination = rule.destination.replace(':path*', url.pathname.slice(1)) + url.search;
          response.writeHead(rule.permanent ? 308 : 307, { Location: destination }).end();
          return;
        }
      }
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch {
        response.writeHead(400).end('Invalid URL');
        return;
      }
      const rewrite = config.rewrites.find((rule) => rule.source === pathname);
      pathname = rewrite?.destination ?? pathname;
      let file = resolve(directory, '.' + pathname);
      const pathFromRoot = relative(directory, file);
      if (pathFromRoot.startsWith('..' + sep) || pathFromRoot === '..' || pathname.includes('\0')) {
        response.writeHead(404).end('Not found');
        return;
      }
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      const content = await readFile(file);
      const headers = { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY' };
      response.writeHead(200, headers).end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR' || error.code === 'EISDIR') {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      } else {
        console.error(error);
        response.writeHead(500).end('Preview server error');
      }
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 8001);
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Bookra preview: http://127.0.0.1:${port}/`));
}
