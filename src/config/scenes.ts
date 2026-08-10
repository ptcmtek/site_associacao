export const FPS = 30;

export type SceneConfig = {
  id: string;
  seconds: number;
  eyebrow?: string;
  headline: string;
  lines?: readonly string[];
  footer?: readonly string[];
  subheadline?: string;
  events?: readonly {date: string; weekday: string; items: readonly string[]}[];
  eventsLabel?: string;
  qrLabel?: string;
  dateTbdLabel?: string;
  narration: string;
};

export const scenesPt = [
  {id: 'opening', seconds: 5.4, eyebrow: 'AGRUPAMENTO DE ESCOLAS DE PARDILHÓ', headline: 'A ESCOLA TAMBÉM É NOSSA.', narration: 'Agrupamento de Escolas de Pardilhó. A escola também é nossa.'},
  {id: 'children', seconds: 3.3, headline: 'Todos queremos o melhor para os nossos filhos.', narration: 'Todos queremos o melhor para os nossos filhos.'},
  {id: 'purpose', seconds: 12.5, eyebrow: 'ASSOCIAÇÃO DE PAIS', headline: 'DAR VOZ. REPRESENTAR.', lines: ['OUVIR', 'QUESTIONAR', 'PROPOR', 'SOLUÇÕES'], narration: 'E é precisamente para isso que existe uma Associação de Pais: para dar voz aos pais e representá-los na comunidade escolar, ouvindo, questionando, propondo e ajudando a encontrar soluções.'},
  {id: 'people', seconds: 4.6, headline: 'Uma Associação cresce com a participação dos pais.', narration: 'Uma Associação cresce com a participação dos pais.'},
  {id: 'member', seconds: 3, eyebrow: 'E TUDO COMEÇA POR…', headline: 'SER SÓCIO.', narration: 'E tudo começa por ser sócio.'},
  {id: 'time', seconds: 10.5, eyebrow: 'NÃO PRECISAS DE ESTAR SEMPRE PRESENTE', headline: 'Só tens de querer fazer parte.', lines: ['Participa quando e como puderes.', 'Não tens de ir a todas as reuniões, organizar atividades ou assumir um cargo.'], narration: 'Não precisas de estar sempre presente. Participa quando e como puderes. Não tens de ir a todas as reuniões nem de assumir um cargo.'},
  {id: 'rights', seconds: 7.1, headline: 'SER SÓCIO É…', lines: ['TER VOZ', 'PARTICIPAR', 'VOTAR'], narration: 'Porque ser sócio é ter voz, é poder participar e, claro, é poder votar.'},
  {id: 'lists', seconds: 8, eyebrow: 'NOVOS SÓCIOS • NOVAS IDEIAS • NOVAS POSSIBILIDADES', headline: 'PARTICIPAÇÃO DEMOCRÁTICA', lines: ['Novos sócios podem juntar-se', 'Trazer novas ideias', 'E até fazer parte de uma lista'], narration: 'E ser sócio é também saber que os novos sócios podem juntar-se, trazer novas ideias e até fazer parte de uma lista.'},
  {id: 'stays', seconds: 7, eyebrow: 'AS DIREÇÕES MUDAM.', headline: 'A ASSOCIAÇÃO FICA.', narration: 'Porque uma Associação não é apenas uma Direção: as Direções mudam, mas a Associação fica.'},
  {id: 'strength', seconds: 4.6, eyebrow: 'QUANTO MAIS SÓCIOS FORMOS…', headline: 'MAIS FORTE SERÁ A VOZ DOS PAIS.', narration: 'E quanto mais sócios formos, mais forte será a voz dos pais.'},
  {id: 'final', seconds: 10.7, headline: 'ASSOCIA-TE.', subheadline: 'Torna-te sócio ou renova a tua inscrição.', lines: ['PARTICIPA', 'VOTA', 'DECIDE'], eventsLabel: 'PRÓXIMAS ASSEMBLEIAS', qrLabel: 'QR DUMMY — INSCRIÇÃO', dateTbdLabel: 'DATA A DEFINIR', events: [{date: '28 SETEMBRO', weekday: 'SEGUNDA-FEIRA', items: ['Relatório de Atividades 2025/2026']}, {date: '12 OUTUBRO', weekday: 'SEGUNDA-FEIRA', items: ['Apresentação de listas e respetivos planos de atividades', 'Eleição e tomada de posse da lista vencedora']}], footer: ['A escola é dos nossos filhos.', 'A voz dos pais também conta.'], narration: 'Associa-te ou renova a tua inscrição e participa nas próximas Assembleias. Participa, vota e decide. A voz dos pais também conta.'},
] as const satisfies readonly SceneConfig[];

export const scenesEn = [
  {id: 'opening', seconds: 5.4, eyebrow: 'PARDILHÓ SCHOOL GROUP', headline: 'THE SCHOOL IS OURS TOO.', narration: 'Agrupamento de Escolas de Pardilhó. The school is ours too.'},
  {id: 'children', seconds: 3.3, headline: 'We all want the best for our children.', narration: 'We all want the best for our children.'},
  {id: 'purpose', seconds: 12.5, eyebrow: 'PARENTS’ ASSOCIATION', headline: 'GIVE PARENTS A VOICE. REPRESENT THEM.', lines: ['LISTEN', 'QUESTION', 'PROPOSE', 'SOLUTIONS'], narration: 'That’s exactly what a Parents’ Association is for: giving parents a voice and representing them in the school community, by listening, asking questions, sharing ideas and helping to find solutions.'},
  {id: 'people', seconds: 4.6, headline: 'An Association grows through parents’ participation.', narration: 'An Association grows through parents’ participation.'},
  {id: 'member', seconds: 3, eyebrow: 'AND IT ALL STARTS WITH…', headline: 'BECOMING A MEMBER.', narration: 'And it all starts with becoming a member.'},
  {id: 'time', seconds: 11.5, eyebrow: 'YOU DON’T NEED TO BE THERE ALL THE TIME', headline: 'You just need to want to be part of it.', lines: ['Take part when and how you can.', 'You don’t have to attend every meeting, organise activities or take on a formal role.'], narration: 'You don’t need to be there all the time. Take part when and how you can. You don’t have to attend every meeting or take on a formal role.'},
  {id: 'rights', seconds: 7.1, headline: 'BEING A MEMBER MEANS…', lines: ['HAVING A VOICE', 'TAKING PART', 'VOTING'], narration: 'Because being a member means having a voice, being able to take part and, of course, being able to vote.'},
  {id: 'lists', seconds: 8, eyebrow: 'NEW MEMBERS • NEW IDEAS • NEW POSSIBILITIES', headline: 'DEMOCRATIC PARTICIPATION', lines: ['New members can come together', 'Bring new ideas', 'And even be part of a candidate list'], narration: 'Being a member also means knowing that new members can come together, bring new ideas and even be part of a candidate list.'},
  {id: 'stays', seconds: 7, eyebrow: 'COMMITTEES CHANGE.', headline: 'THE ASSOCIATION REMAINS.', narration: 'Because an Association is more than its Committee: Committees change, but the Association remains.'},
  {id: 'strength', seconds: 4.6, eyebrow: 'THE MORE MEMBERS WE HAVE…', headline: 'THE STRONGER THE PARENTS’ VOICE.', narration: 'And the more members we have, the stronger the parents’ voice will be.'},
  {id: 'final', seconds: 10.7, headline: 'JOIN US.', subheadline: 'Become a member or renew your membership.', lines: ['TAKE PART', 'VOTE', 'DECIDE'], eventsLabel: 'UPCOMING GENERAL MEETINGS', qrLabel: 'DUMMY QR — MEMBERSHIP', dateTbdLabel: 'DATE TO BE CONFIRMED', events: [{date: '28 SEPTEMBER', weekday: 'MONDAY', items: ['2025/2026 Activities Report']}, {date: '12 OCTOBER', weekday: 'MONDAY', items: ['Presentation of candidate lists and their activity plans', 'Election and appointment of the elected committee']}], footer: ['The school belongs to our children.', 'Parents’ voices matter too.'], narration: 'Join us or renew your membership and take part in the upcoming General Meetings. Take part, vote and decide. Parents’ voices matter too.'},
] as const satisfies readonly SceneConfig[];

export type Language = 'pt' | 'en';
export const scenesByLanguage = {pt: scenesPt, en: scenesEn} as const;

export const getSceneTimeline = (language: Language) => {
  const selected = scenesByLanguage[language];
  return selected.map((scene, index) => ({
    ...scene,
    from: selected.slice(0, index).reduce((sum, item) => sum + item.seconds * FPS, 0),
    durationInFrames: scene.seconds * FPS,
  }));
};

export const totalFramesByLanguage = {
  pt: scenesPt.reduce((sum, scene) => sum + scene.seconds * FPS, 0),
  en: scenesEn.reduce((sum, scene) => sum + scene.seconds * FPS, 0),
} as const;

export const totalFrames = totalFramesByLanguage.pt;
