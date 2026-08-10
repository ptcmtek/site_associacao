import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {media} from '../config/media';
import {getSceneTimeline, Language} from '../config/scenes';
import {theme} from '../config/theme';
import {ChildrenScene, FinalScene, ListsScene, MemberScene, OpeningScene, PeopleScene, PurposeScene, RightsScene, StaysScene, StrengthScene, TimeScene} from '../scenes/Scenes';
import {Format} from './SceneShell';

const componentById = {
  opening: OpeningScene, children: ChildrenScene, purpose: PurposeScene, people: PeopleScene,
  member: MemberScene, time: TimeScene, rights: RightsScene, lists: ListsScene,
  stays: StaysScene, strength: StrengthScene, final: FinalScene,
} as const;

export const MainVideo: React.FC<{format: Format; language: Language; datesToBeConfirmed?: boolean}> = ({format, language, datesToBeConfirmed = false}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const musicVolume = interpolate(frame, [0, media.music.fadeSeconds * 30, durationInFrames - media.music.fadeSeconds * 30, durationInFrames], [0, media.music.volume, media.music.volume, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: theme.colors.white}}>
    {getSceneTimeline(language).map((scene) => {
      const Component = componentById[scene.id];
      return <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames} premountFor={30}>
        <Component format={format} scene={scene} datesToBeConfirmed={datesToBeConfirmed}/>
        {media.narration.enabled && language === 'en' && scene.id === 'opening' ? <>
          <Audio src={staticFile('audio/en/opening-name-pt.mp3')} volume={media.narration.volume}/>
          <Sequence from={90}><Audio src={staticFile('audio/en/opening-rest-en.mp3')} volume={media.narration.volume}/></Sequence>
        </> : media.narration.enabled && <Audio src={staticFile(`${media.narration.directory}/${language}/${scene.id}.mp3`)} volume={media.narration.volume}/>} 
      </Sequence>;
    })}
    {media.music.enabled && <Audio src={staticFile(media.music.src)} volume={musicVolume} loop/>}
  </AbsoluteFill>;
};
