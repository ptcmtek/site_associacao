import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../config/theme';
import {sceneFade} from '../utils/animation';

export type Format = 'horizontal' | 'vertical';

export const SceneShell: React.FC<React.PropsWithChildren<{format: Format; accent?: string}>> = ({children, format, accent = theme.colors.blue}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const vertical = format === 'vertical';
  return <AbsoluteFill style={{background: theme.colors.white, color: theme.colors.navy, fontFamily: theme.font, opacity: sceneFade(frame, durationInFrames), padding: vertical ? '110px 76px' : '76px 118px', overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: vertical ? 520 : 650, height: vertical ? 520 : 650, borderRadius: '50%', right: vertical ? -300 : -260, top: vertical ? -300 : -350, background: accent, opacity: 0.08}}/>
    <div style={{position: 'absolute', left: vertical ? 76 : 118, top: vertical ? 80 : 54, width: vertical ? 90 : 130, height: 10, borderRadius: 10, background: accent}}/>
    {children}
  </AbsoluteFill>;
};
