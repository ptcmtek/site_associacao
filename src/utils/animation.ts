import {Easing, interpolate, spring} from 'remotion';

export const fadeSlide = (frame: number, fps: number, delay = 0) => {
  const progress = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 110}});
  return {
    opacity: interpolate(frame, [delay, delay + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    transform: `translateY(${interpolate(progress, [0, 1], [36, 0])}px)`,
  };
};

const SCENE_FADE_FRAMES = 5;

export const sceneFade = (frame: number, duration: number) =>
  interpolate(frame, [0, SCENE_FADE_FRAMES, duration - SCENE_FADE_FRAMES, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease),
  });
