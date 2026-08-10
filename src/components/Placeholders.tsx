import React from 'react';
import {Img, staticFile} from 'remotion';
import {media} from '../config/media';
import {theme} from '../config/theme';

const box: React.CSSProperties = {border: `4px dashed ${theme.colors.line}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.muted, fontWeight: 800, letterSpacing: 1, background: '#fff'};

const dummyModules = [[34,8],[46,8],[58,8],[34,20],[58,20],[34,32],[46,32],[58,32],[8,46],[20,46],[32,46],[46,46],[58,46],[70,46],[82,46],[8,58],[32,58],[46,58],[70,58],[82,58],[34,70],[46,70],[58,70],[70,70],[82,70],[34,82],[58,82],[82,82]];

export const QRCodePlaceholder: React.FC<{size: number; label?: string}> = ({size, label = 'QR DUMMY — INSCRIÇÃO'}) => media.qr.enabled
  ? <Img src={staticFile(media.qr.src)} style={{width: size, height: size, objectFit: 'contain'}}/>
  : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{background: '#fff', border: `4px solid ${theme.colors.navy}`, borderRadius: 12, padding: 8}}>
        {[[8,8],[70,8],[8,70]].map(([x,y]) => <g key={`${x}-${y}`}><rect x={x} y={y} width="22" height="22" fill={theme.colors.navy}/><rect x={x+5} y={y+5} width="12" height="12" fill="#fff"/><rect x={x+8} y={y+8} width="6" height="6" fill={theme.colors.navy}/></g>)}
        {dummyModules.map(([x,y]) => <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" fill={theme.colors.navy}/>)}
      </svg>
      <div style={{fontSize: size * .075, fontWeight: 800, letterSpacing: 1.5, color: theme.colors.muted}}>{label}</div>
    </div>;

export const LogoPlaceholder: React.FC<{width: number}> = ({width}) => media.logo.enabled
  ? <Img src={staticFile(media.logo.src)} style={{width, maxHeight: width * 0.45, objectFit: 'contain'}}/>
  : <div style={{...box, width, height: width * 0.35, fontSize: width * 0.065}}>[ LOGÓTIPO DA ASSOCIAÇÃO ]</div>;
