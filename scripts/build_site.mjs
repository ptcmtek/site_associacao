import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'site');
const destination = path.join(root, 'dist');

await fs.rm(destination, {recursive: true, force: true});
await fs.mkdir(path.join(destination, 'assets', 'videos'), {recursive: true});
await fs.mkdir(path.join(destination, 'assets', 'images'), {recursive: true});

const html = await fs.readFile(path.join(source, 'index.html'), 'utf8');
const deployHtml = html
  .replaceAll('../out/', 'assets/videos/')
  .replaceAll('../public/images/', 'assets/images/');

await fs.writeFile(path.join(destination, 'index.html'), deployHtml, 'utf8');
await fs.copyFile(path.join(source, 'styles.css'), path.join(destination, 'styles.css'));
await fs.copyFile(path.join(source, 'script.js'), path.join(destination, 'script.js'));
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-pt-16x9.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-pt-16x9.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-pt-9x16.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-pt-9x16.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'images', 'familias-escola.png'),
  path.join(destination, 'assets', 'images', 'familias-escola.png'),
);

console.log(`Site preparado em ${destination}`);
