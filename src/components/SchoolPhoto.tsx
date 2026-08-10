import React from 'react';
import {CanvasImage, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';

type Props = {
  src: string;
  width: number;
  height: number;
  delay?: number;
  objectPosition?: string;
};

export const SchoolPhoto: React.FC<Props> = ({src, width, height, delay = 10, objectPosition = 'center'}) => {
  const frame = useCurrentFrame();

  return <div style={{
    width,
    height,
    borderRadius: 38,
    overflow: 'hidden',
    background: '#eef6ff',
    boxShadow: '0 24px 60px rgba(14, 48, 82, 0.14)',
    opacity: interpolate(frame, [delay, delay + 16], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
    translate: interpolate(frame, [delay, delay + 20], ['0px 24px', '0px 0px'], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
  }}>
    <CanvasImage
      src={staticFile(src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        scale: interpolate(frame, [delay, delay + 120], [1.035, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    />
  </div>;
};
