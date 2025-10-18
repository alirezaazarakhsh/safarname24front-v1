// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { VoiceRecorderPropsType } from '@/types/dashboard/component';
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { cn } from '@/utils/utils';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting VoiceRecorder component as default
export default function VoiceRecorder({
  className,
  onChange,
}: VoiceRecorderPropsType): ReactNode {
  // Defining hooks
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  // Initialize WaveSurfer + plugin
  useEffect(() => {
    if (containerRef.current) {
      const ws = WaveSurfer.create({
        container: containerRef.current,
        progressColor: ' #2f508f',
        waveColor: '#548BF6',
        cursorColor: 'transparent',
        barWidth: 4,
        barHeight: 1,
        barGap: 2,
        height: 46,
        barRadius: 100,
      });

      // Register record plugin
      const recordPlugin = ws.registerPlugin(RecordPlugin.create({}));

      // Hook plugin events
      recordPlugin.on('record-end', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      });

      ws.on('play', () => setPlaying(true));
      ws.on('pause', () => setPlaying(false));
      ws.on('finish', () => setPlaying(false));
      recordPlugin.on('record-end', (blob: Blob) => onChange && onChange(blob));

      wavesurferRef.current = ws;
      recordPluginRef.current = recordPlugin;

      return () => {
        recordPlugin.stopRecording && recordPlugin.stopRecording();
        ws.destroy();
      };
    }
  }, []);

  // Handlers
  const handleStartStop = useCallback(async () => {
    if (recordPluginRef.current) {
      const plugin = recordPluginRef.current;
      if (isRecording) {
        plugin.stopRecording();
        setIsRecording(false);
      } else {
        await plugin.startRecording();
        setIsRecording(true);
      }
    }
  }, [isRecording]);

  // Handling play
  const handlePlay = useCallback(() => {
    if (wavesurferRef.current && audioURL) {
      wavesurferRef.current.playPause();
    }
  }, [audioURL]);

  // Returning JSX
  return (
    <div className={cn('h-[50px] flex items-center justify-start', className)}>
      <div className="flex items-center justify-start shrink-0 ml-3">
        <button
          type="button"
          onClick={() => handleStartStop()}
          className="flex items-center justify-center size-[50px]"
        >
          <IconsaxIcons
            name="Microphone"
            className="size-5"
            color="currentColor"
          />
        </button>
        <button
          type="button"
          onClick={() => handlePlay()}
          className="flex items-center justify-center h-[50px]"
        >
          <IconsaxIcons
            name={isPlaying ? 'Pause' : 'Play'}
            className="size-5"
            color="currentColor"
          />
        </button>
      </div>
      <div ref={containerRef} className="w-full flex-1 h-full" />
    </div>
  );
}
