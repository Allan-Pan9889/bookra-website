import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'dist');
execFileSync(process.execPath, [
  join(root, 'node_modules/@tailwindcss/cli/dist/index.mjs'),
  '-i', 'styles/site.css', '-o', 'assets/site.css', '--minify'
], { cwd: root, stdio: 'inherit' });

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of await readdir(root)) {
  if (name.endsWith('.html') || name === 'robots.txt' || name === 'sitemap.xml') {
    await cp(join(root, name), join(output, name));
  }
}
await cp(join(root, 'en'), join(output, 'en'), { recursive: true });
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
console.log(`Static site built in ${output}`);
