// Forcing next.js to render this component as client side component
'use client';

import {
  AudioWaveHandle,
  AudioWavePropsType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import React, {
  ReactNode,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import WaveSurfer from 'wavesurfer.js';

// Define exposed methods for parent (HOC can call these)
const AudioWave = forwardRef<AudioWaveHandle, AudioWavePropsType>(
  (
    {
      audioUrl,
      className,
      backgroundColor = '#A9C5FB',
      progressColor = '#343434',
    },
    ref,
  ): ReactNode => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
      if (!waveformRef.current) return;

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: backgroundColor,
        progressColor: progressColor,
        cursorColor: 'transparent',
        barWidth: 2,
        barHeight: 1,
        barGap: 2,
      });

      wavesurferRef.current.load(audioUrl);

      wavesurferRef.current.on('error', (err) =>
        console.error('Wavesurfer error:', err),
      );

      return () => {
        wavesurferRef.current?.destroy();
        wavesurferRef.current = null;
      };
    }, [audioUrl]);

    // Expose play/pause/toggle to parent
    useImperativeHandle(ref, () => ({
      play: () => wavesurferRef.current?.play(),
      pause: () => wavesurferRef.current?.pause(),
      getDuration: () => wavesurferRef.current?.getDuration() ?? null,
      isPlaying: () => !!wavesurferRef.current?.isPlaying(),
    }));

    return <div ref={waveformRef} className={cn('!z-0', className)} />;
  },
);

AudioWave.displayName = 'AudioWave';
export default AudioWave;
