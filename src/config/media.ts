export const media = {
  narration: {enabled: true, volume: 1, directory: 'audio', voices: {pt: 'pt-PT-RaquelNeural', en: 'en-GB-SoniaNeural'}},
  music: {enabled: true, src: 'audio/musica.mp3', volume: 0.08, fadeSeconds: 2.5},
  logo: {enabled: false, src: 'logo/logo.png'},
  qr: {enabled: false, src: 'qr/qr-code.png'},
  contact: '[ CONTACTO / SITE ]',
} as const;
