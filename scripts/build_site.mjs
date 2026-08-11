import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'site');
const destination = path.join(root, 'dist');

await fs.rm(destination, {recursive: true, force: true});
await fs.mkdir(path.join(destination, 'assets', 'videos'), {recursive: true});
await fs.mkdir(path.join(destination, 'assets', 'images'), {recursive: true});
await fs.mkdir(path.join(destination, 'assets', 'documents'), {recursive: true});
await fs.mkdir(path.join(destination, 'socio'), {recursive: true});
await fs.mkdir(path.join(destination, 'en'), {recursive: true});
await fs.mkdir(path.join(destination, 'en', 'member'), {recursive: true});

for (const page of ['index.html', 'socio.html']) {
  const html = await fs.readFile(path.join(source, page), 'utf8');
  const deployHtml = html
    .replaceAll('../out/', '/assets/videos/')
    .replaceAll('../public/images/', '/assets/images/');
  await fs.writeFile(path.join(destination, page), deployHtml, 'utf8');
  if (page === 'socio.html') {
    await fs.writeFile(path.join(destination, 'socio', 'index.html'), deployHtml, 'utf8');
  }
}

for (const [sourcePage, destinationPage] of [
  ['index.html', path.join('en', 'index.html')],
  ['member.html', path.join('en', 'member', 'index.html')],
]) {
  const html = await fs.readFile(path.join(source, 'en', sourcePage), 'utf8');
  await fs.writeFile(path.join(destination, destinationPage), html, 'utf8');
}
await fs.copyFile(path.join(source, 'styles.css'), path.join(destination, 'styles.css'));
await fs.copyFile(path.join(source, 'script.js'), path.join(destination, 'script.js'));
await fs.copyFile(path.join(source, '_redirects'), path.join(destination, '_redirects'));
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-pt-16x9.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-pt-16x9.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-pt-9x16.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-pt-9x16.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-en-16x9.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-en-16x9.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'site', 'videos', 'associacao-pais-en-9x16.mp4'),
  path.join(destination, 'assets', 'videos', 'associacao-pais-en-9x16.mp4'),
);
await fs.copyFile(
  path.join(root, 'public', 'images', 'familias-escola.png'),
  path.join(destination, 'assets', 'images', 'familias-escola.png'),
);
await fs.copyFile(
  path.join(root, 'src', 'documentos', 'Estatutos Associação de Pais Escola de Pardilhó.pdf'),
  path.join(destination, 'assets', 'documents', 'estatutos-associacao-pais-pardilho.pdf'),
);

console.log(`Site preparado em ${destination}`);
