import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fadeSlide} from '../utils/animation';

export const AnimatedText: React.FC<React.PropsWithChildren<{delay?: number; className?: string; style?: React.CSSProperties}>> = ({children, delay = 0, className, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div className={className} style={{...fadeSlide(frame, fps, delay), ...style}}>{children}</div>;
};
