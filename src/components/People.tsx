import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../config/theme';

const palette = [theme.colors.blue, theme.colors.green, theme.colors.yellow, theme.colors.coral, theme.colors.navy];

export const PersonIcon: React.FC<{color?: string; size?: number; index?: number}> = ({color = theme.colors.blue, size = 80, index = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - index * 3, fps, config: {damping: 16}});
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 80 92" style={{transform: `scale(${p})`, overflow: 'visible'}}>
      <circle cx="40" cy="20" r="16" fill={color}/>
      <path d="M12 88c1-28 10-43 28-43s27 15 28 43" fill={color}/>
      <circle cx="40" cy="20" r="7" fill="#fff" opacity=".2"/>
    </svg>
  );
};

export const PeopleGroup: React.FC<{count?: number; vertical?: boolean}> = ({count = 9, vertical = false}) => {
  const frame = useCurrentFrame();
  return <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'end', gap: vertical ? 20 : 28, maxWidth: vertical ? 700 : 900}}>
    {Array.from({length: count}).map((_, i) => {
      const drift = interpolate(frame, [0, 30], [i % 2 ? 24 : -24, 0], {extrapolateRight: 'clamp'});
      return <div key={i} style={{transform: `translateX(${drift}px)`}}><PersonIcon index={i} size={vertical ? 84 : 94} color={palette[i % palette.length]}/></div>;
    })}
  </div>;
};
