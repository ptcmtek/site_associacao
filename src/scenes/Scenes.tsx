import React from 'react';
import {Check, Users, Vote} from 'lucide-react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {PersonIcon} from '../components/People';
import {QRCodePlaceholder} from '../components/Placeholders';
import {Format, SceneShell} from '../components/SceneShell';
import {SchoolIllustration} from '../components/SchoolIllustration';
import {SchoolPhoto} from '../components/SchoolPhoto';
import {SceneConfig} from '../config/scenes';
import {theme} from '../config/theme';

type Props = {format: Format; scene: SceneConfig; datesToBeConfirmed?: boolean};
const size = (format: Format, horizontal: number, vertical: number) => format === 'vertical' ? vertical : horizontal;
const centered: React.CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center'};

const Heading: React.FC<{format: Format; children: React.ReactNode; giant?: boolean}> = ({format, children, giant}) => <div style={{fontSize: size(format, giant ? 116 : 78, giant ? 128 : 88), lineHeight: .98, fontWeight: 900, letterSpacing: -3, maxWidth: format === 'vertical' ? 900 : 1500}}>{children}</div>;
const Eyebrow: React.FC<{format: Format; children?: React.ReactNode}> = ({format, children}) => <div style={{fontSize: size(format, 27, 30), fontWeight: 800, color: theme.colors.blue, letterSpacing: 3, marginBottom: 28}}>{children}</div>;

export const OpeningScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format}><div style={{...centered, gap: 38}}>
  <AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText>
  <AnimatedText delay={18}><Heading format={format} giant>{scene.headline}</Heading></AnimatedText>
  <AnimatedText delay={34}><SchoolIllustration width={size(format, 560, 720)}/></AnimatedText>
</div></SceneShell>;

export const ChildrenScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format} accent={theme.colors.green}><div style={{display: 'flex', flexDirection: format === 'vertical' ? 'column' : 'row', height: '100%', alignItems: 'center', justifyContent: 'center', gap: size(format, 90, 58)}}>
  <AnimatedText><Heading format={format}><span style={{color: theme.colors.green}}>{scene.headline}</span></Heading></AnimatedText>
  <SchoolPhoto src="images/alunos-colaboracao.png" width={size(format, 760, 850)} height={size(format, 650, 760)} objectPosition="center 64%"/>
</div></SceneShell>;

export const PurposeScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format}><div style={{...centered, flexDirection: format === 'vertical' ? 'column' : 'row', gap: format === 'vertical' ? 0 : 80}}>
  <div style={{width: format === 'vertical' ? '100%' : 900}}><AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow><div style={{fontSize: size(format, 92, 104), lineHeight: .94, fontWeight: 900, letterSpacing: -3, width: '100%', textAlign: 'center', color: theme.colors.blue}}>{scene.headline.split('. ').map((line, index) => <div key={line}>{index === 0 ? `${line}.` : line}</div>)}</div></AnimatedText>
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 18, marginTop: format === 'vertical' ? 46 : 52}}>{scene.lines?.map((line, i) => <AnimatedText key={line} delay={28 + i * 8}><div style={{fontSize: size(format, 24, 29), fontWeight: 800, padding: '18px 25px', borderRadius: 999, background: i === 3 ? theme.colors.mint : theme.colors.sky, color: i === 3 ? theme.colors.green : theme.colors.navy}}>{line}{i < 3 ? '  →' : ''}</div></AnimatedText>)}</div></div>
  <div style={{marginTop: format === 'vertical' ? 42 : 0}}><SchoolPhoto src="images/dialogo-pais-escola.png" width={size(format, 700, 850)} height={size(format, 690, 650)} delay={54} objectPosition="center 55%"/></div>
</div></SceneShell>;

export const PeopleScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format} accent={theme.colors.green}><div style={{...centered, flexDirection: format === 'vertical' ? 'column' : 'row', gap: format === 'vertical' ? 0 : 90}}>
  <AnimatedText><Heading format={format}><span style={{color: theme.colors.green}}>{scene.headline}</span></Heading></AnimatedText>
  <div style={{marginTop: format === 'vertical' ? 58 : 0}}><SchoolPhoto src="images/familias-escola.png" width={size(format, 760, 850)} height={size(format, 650, 790)} delay={18} objectPosition="center 62%"/></div>
</div></SceneShell>;

export const MemberScene: React.FC<Props> = ({format, scene}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const p = spring({frame: frame - 30, fps, config: {damping: 13, stiffness: 120}});
  return <SceneShell format={format} accent={theme.colors.yellow}><div style={centered}><AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText><div style={{transform: `scale(${p})`}}><Heading format={format} giant><span style={{color: theme.colors.blue}}>{scene.headline}</span></Heading><div style={{height: 24, background: theme.colors.yellow, borderRadius: 20, marginTop: 24, transform: `scaleX(${p})`}}/></div></div></SceneShell>;
};

export const TimeScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format} accent={theme.colors.green}><div style={centered}>
  <AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText>
  <div style={{display: 'flex', flexDirection: format === 'vertical' ? 'column' : 'row', alignItems: 'center', gap: format === 'vertical' ? 0 : 70, width: '100%', justifyContent: 'center'}}><div style={{width: format === 'vertical' ? '100%' : 760}}>
    <AnimatedText delay={12}><div style={{fontSize: 48, lineHeight: 1.08, fontWeight: 900, color: theme.colors.green}}>{scene.lines?.[0]}</div></AnimatedText>
    <AnimatedText delay={22} style={{marginTop: 26}}><div style={{padding: '22px 30px', background: theme.colors.sky, borderRadius: 22, fontSize: 29, lineHeight: 1.22, fontWeight: 700}}>{scene.lines?.[1]}</div></AnimatedText>
    <AnimatedText delay={48} style={{marginTop: format === 'vertical' ? 34 : 38}}><div style={{fontSize: size(format, 44, 51), fontWeight: 900, color: theme.colors.green}}>{scene.headline}</div></AnimatedText>
  </div><div style={{marginTop: format === 'vertical' ? 36 : 0}}><SchoolPhoto src="images/crianca-pai-conversa.png" width={size(format, 720, 850)} height={size(format, 620, 610)} delay={30} objectPosition="center 48%"/></div></div>
</div></SceneShell>;

export const RightsScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format}><div style={centered}><AnimatedText><Heading format={format}>{scene.headline}</Heading></AnimatedText><div style={{display: 'flex', flexDirection: format === 'vertical' ? 'column' : 'row', alignItems: 'center', gap: size(format, 22, 30), marginTop: 70}}>{scene.lines?.map((line, i) => <React.Fragment key={line}><AnimatedText delay={18 + i * 12}><div style={{padding: size(format, 32, 40), minWidth: size(format, 300, 620), borderRadius: 28, color: i === 2 ? '#fff' : theme.colors.navy, background: i === 2 ? theme.colors.blue : theme.colors.sky, fontSize: size(format, i === 2 ? 53 : 39, i === 2 ? 66 : 48), fontWeight: 900, boxShadow: i === 2 ? '0 20px 45px rgba(22,119,255,.22)' : 'none'}}>{line}</div></AnimatedText>{i < 2 && <div style={{fontSize: 42, color: theme.colors.blue}}>→</div>}</React.Fragment>)}</div></div></SceneShell>;

export const ListsScene: React.FC<Props> = ({format, scene}) => <SceneShell format={format} accent={theme.colors.green}>
  <div style={{...centered, flexDirection: format === 'vertical' ? 'column' : 'row', gap: format === 'vertical' ? 0 : 70}}>
    <div style={{width: format === 'vertical' ? '100%' : 850}}>
    <AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText>
    <div style={{display: 'grid', gap: 18, width: '100%', maxWidth: 1100}}>
      {scene.lines?.map((line, i) => <AnimatedText key={line} delay={12 + i * 14}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: size(format, 24, i === 2 ? 30 : 34), border: `4px solid ${i === 2 ? theme.colors.green : theme.colors.line}`, borderRadius: 26, fontSize: size(format, i === 2 ? 43 : 34, i === 2 ? 44 : 42), lineHeight: i === 2 ? 1.08 : 1.2, fontWeight: i === 2 ? 900 : 700, color: i === 2 ? theme.colors.green : theme.colors.navy, textAlign: 'left'}}>
          {i === 0 ? <Users size={48}/> : i === 1 ? <Check size={48}/> : <Vote size={48}/>} {line}
        </div>
      </AnimatedText>)}
    </div>
    </div>
    <div style={{marginTop: format === 'vertical' ? 42 : 0}}><SchoolPhoto src="images/pais-novas-ideias.png" width={size(format, 700, 850)} height={size(format, 650, 620)} delay={48} objectPosition="center 49%"/></div>
  </div>
</SceneShell>;

export const StaysScene: React.FC<Props> = ({format, scene}) => {const frame = useCurrentFrame(); const x = interpolate(frame, [0, 50], [-160, 160], {extrapolateRight: 'clamp'}); return <SceneShell format={format} accent={theme.colors.yellow}><div style={centered}><AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText><div style={{display: 'flex', gap: 20, opacity: .35, transform: `translateX(${x}px)`, marginBottom: 50}}>{[0,1,2,3,4].map(i => <PersonIcon key={i} index={i} size={size(format, 70, 90)} color={theme.colors.muted}/>)}</div><AnimatedText delay={30}><Heading format={format} giant><span style={{color: theme.colors.blue}}>{scene.headline}</span></Heading></AnimatedText></div></SceneShell>};

export const StrengthScene: React.FC<Props> = ({format, scene}) => {const frame = useCurrentFrame(); const grow = interpolate(frame, [18, 85], [.72, 1.06], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <SceneShell format={format} accent={theme.colors.green}><div style={{...centered, flexDirection: format === 'vertical' ? 'column' : 'row', gap: format === 'vertical' ? 0 : 80}}><div style={{width: format === 'vertical' ? '100%' : 850}}><AnimatedText><Eyebrow format={format}>{scene.eyebrow}</Eyebrow></AnimatedText><AnimatedText delay={16}><div style={{transform: `scale(${grow})`}}><Heading format={format}><span style={{color: theme.colors.blue}}>{scene.headline}</span></Heading></div></AnimatedText></div><div style={{marginTop: format === 'vertical' ? 58 : 0}}><SchoolPhoto src="images/pais-participacao.png" width={size(format, 720, 850)} height={720} delay={28} objectPosition="center 65%"/></div></div></SceneShell>};

export const FinalScene: React.FC<Props> = ({format, scene, datesToBeConfirmed}) => <SceneShell format={format}>
  <div style={{display: 'flex', flexDirection: format === 'vertical' ? 'column' : 'row', alignItems: 'center', justifyContent: format === 'vertical' ? 'space-around' : 'center', height: '100%', gap: format === 'vertical' ? 0 : 90, textAlign: format === 'vertical' ? 'center' : 'left'}}>
    <div style={{flex: format === 'vertical' ? 'none' : 1, width: '100%'}}>
      <AnimatedText><Heading format={format} giant><span style={{color: theme.colors.blue}}>{scene.headline}</span></Heading></AnimatedText>
      {scene.subheadline && <AnimatedText delay={10}><div style={{fontSize: size(format, 32, 38), lineHeight: 1.15, fontWeight: 750, marginTop: 20}}>{scene.subheadline}</div></AnimatedText>}
      <AnimatedText delay={15}><div style={{fontSize: size(format, 29, 32), fontWeight: 900, letterSpacing: 2, margin: '24px 0', color: theme.colors.green}}>{scene.lines?.join('  •  ')}</div></AnimatedText>
      {scene.events && <AnimatedText delay={22} style={{marginTop: format === 'vertical' ? 44 : 0}}>
        <div style={{fontSize: size(format, 20, 23), fontWeight: 900, letterSpacing: 2, color: theme.colors.muted, marginBottom: 13}}>{scene.eventsLabel}</div>
        <div style={{display: 'grid', gap: size(format, 14, 20)}}>{scene.events.map((event) => <div key={event.date} style={{display: 'flex', flexDirection: 'column', textAlign: 'left', border: `3px solid ${theme.colors.blue}`, borderRadius: 22, overflow: 'hidden', background: '#fff'}}>
          <div style={{display: 'flex', justifyContent: datesToBeConfirmed ? 'center' : 'space-between', alignItems: 'center', gap: 20, background: theme.colors.blue, color: '#fff', padding: format === 'vertical' ? '17px 24px' : '15px 22px'}}><div style={{fontSize: size(format, datesToBeConfirmed ? 28 : 34, datesToBeConfirmed ? 30 : 36), fontWeight: 950, letterSpacing: datesToBeConfirmed ? 1.4 : -0.4}}>{datesToBeConfirmed ? scene.dateTbdLabel : event.date}</div>{!datesToBeConfirmed && <div style={{fontSize: size(format, 18, 21), fontWeight: 800, letterSpacing: 1.5}}>{event.weekday}</div>}</div>
          <div style={{display: 'grid', gap: 10, fontSize: size(format, 23, event.items.length > 1 ? 25 : 28), lineHeight: 1.18, fontWeight: 750, padding: format === 'vertical' ? '20px 24px' : '18px 22px'}}>{event.items.map((item) => <div key={item} style={{display: 'grid', gridTemplateColumns: '18px 1fr', gap: 10}}><span style={{color: theme.colors.blue}}>•</span><span>{item}</span></div>)}</div>
        </div>)}</div>
      </AnimatedText>}
      {!scene.events && <AnimatedText delay={25}><div style={{fontSize: size(format, 33, 39), lineHeight: 1.25, fontWeight: 700}}>{scene.footer?.[0]}<br/><span style={{color: theme.colors.blue}}>{scene.footer?.[1]}</span></div></AnimatedText>}
    </div>
    <AnimatedText delay={30}><QRCodePlaceholder size={size(format, 280, 245)} label={scene.qrLabel}/></AnimatedText>
  </div>
</SceneShell>;
