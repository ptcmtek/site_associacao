# Vídeo — Associação de Pais de Pardilhó

Vídeo institucional responsivo criado com Remotion, React e TypeScript.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run render:16x9
npm run render:9x16
npm run render:en:16x9
npm run render:en:9x16
npm run build:site
```

Os renders são guardados em `out/`. Textos e durações ficam em `src/config/scenes.ts`, a identidade visual em `src/config/theme.ts` e o áudio/recursos em `src/config/media.ts`.

As locuções neurais PT-PT e EN estão divididas por cena em `public/audio/pt/` e `public/audio/en/`. Para as voltar a gerar, execute `python scripts/generate_voiceovers.py`. A música opcional continua configurável em `src/config/media.ts`.

## Site

A landing page está em `site/`. O comando `npm run build:site` prepara a pasta `dist/` com a página, o Google Form e as versões horizontal e vertical do vídeo.

Configuração do Cloudflare Pages:

- Build command: `npm run build:site`
- Build output directory: `dist`
