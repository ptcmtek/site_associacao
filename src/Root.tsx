import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './components/MainVideo';
import {FPS, totalFramesByLanguage} from './config/scenes';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AssociacaoPais-16x9"
      component={MainVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.pt}
      defaultProps={{format: 'horizontal' as const, language: 'pt' as const}}
    />
    <Composition
      id="AssociacaoPais-9x16"
      component={MainVideo}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.pt}
      defaultProps={{format: 'vertical' as const, language: 'pt' as const}}
    />
    <Composition
      id="AssociacaoPais-EN-16x9"
      component={MainVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.en}
      defaultProps={{format: 'horizontal' as const, language: 'en' as const}}
    />
    <Composition
      id="AssociacaoPais-EN-9x16"
      component={MainVideo}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.en}
      defaultProps={{format: 'vertical' as const, language: 'en' as const}}
    />
    <Composition
      id="AssociacaoPais-Temporaria-16x9"
      component={MainVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.pt}
      defaultProps={{format: 'horizontal' as const, language: 'pt' as const, datesToBeConfirmed: true}}
    />
    <Composition
      id="AssociacaoPais-Temporaria-9x16"
      component={MainVideo}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.pt}
      defaultProps={{format: 'vertical' as const, language: 'pt' as const, datesToBeConfirmed: true}}
    />
    <Composition
      id="AssociacaoPais-Temporary-EN-16x9"
      component={MainVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.en}
      defaultProps={{format: 'horizontal' as const, language: 'en' as const, datesToBeConfirmed: true}}
    />
    <Composition
      id="AssociacaoPais-Temporary-EN-9x16"
      component={MainVideo}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={totalFramesByLanguage.en}
      defaultProps={{format: 'vertical' as const, language: 'en' as const, datesToBeConfirmed: true}}
    />
  </>
);
