import React from 'react';
import {useCurrentFrame} from 'remotion';
import {theme} from '../config/theme';

export const SchoolIllustration: React.FC<{width?: number}> = ({width = 720}) => {
  const frame = useCurrentFrame();
  const wave = Math.sin(frame / 12) * 3;
  return <svg width={width} viewBox="0 0 760 410" style={{overflow: 'visible'}}>
    <circle cx="645" cy="75" r="40" fill={theme.colors.amber}/>
    <path d="M105 190 380 35l275 155" fill="none" stroke={theme.colors.blue} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="145" y="180" width="470" height="205" rx="22" fill={theme.colors.sky}/>
    <rect x="330" y="260" width="100" height="125" rx="10" fill={theme.colors.blue}/>
    {[210,480].map((x) => <g key={x}><rect x={x} y="230" width="82" height="70" rx="10" fill="#fff"/><path d={`M${x+41} 230v70M${x} 265h82`} stroke={theme.colors.blue} strokeWidth="6"/></g>)}
    <path d="M70 385h620" stroke={theme.colors.green} strokeWidth="14" strokeLinecap="round"/>
    <g transform={`translate(80 ${245 + wave})`}><circle cx="35" cy="22" r="20" fill={theme.colors.coral}/><path d="M10 110c0-48 10-65 25-65s25 17 25 65" fill={theme.colors.coral}/></g>
    <g transform={`translate(620 ${265 - wave})`}><circle cx="25" cy="17" r="16" fill={theme.colors.yellow}/><path d="M5 100c0-44 8-59 20-59s20 15 20 59" fill={theme.colors.yellow}/></g>
  </svg>;
};
