// Forcing next.js to render this component as client side component
'use client';

import IconsaxIcons from '@/components/icons/iconsaxIcons';
// Importing part
import {
  AudioWaveHandle,
  TicketsFileItemPropsType,
} from '@/types/dashboard/component';
import { cn, getFileCategory } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useRef, useState } from 'react';
import AudioWave from './audioWave';
import { formatTime } from '@/utils/string';

// Creating and exporting Tikcets FileItem component as default
export default function FileItem({
  className,
  file,
}: TicketsFileItemPropsType): ReactNode {
  // Defining variables
  const fileCat = getFileCategory(file);
  const audioRef = useRef<AudioWaveHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Defining a function to handle play and pause audio
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Conditinal rendering
  if (fileCat === 'voice') {
    return (
      <div
        className={cn(
          'flex items-center justify-between gap-3 p-4 rounded-lg bg-white relative',
          className,
        )}
      >
        <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden bg-gray-100 px-4 h-[50px] rounded-lg">
          <button
            onClick={handlePlayPause}
            className="size-[35px] aspect-square bg-white text-gray-500 flex items-center justify-center rounded-full shrink-0"
          >
            <IconsaxIcons
              className="size-[15px]"
              name={isPlaying ? 'Pause' : 'Play'}
              variant="Bold"
              color="currentColor"
            />
          </button>
          <div className="overflow-hidden flex-1">
            <AudioWave
              audioUrl={file}
              progressColor="white"
              className="w-full h-[35px]"
              ref={audioRef}
            />
          </div>
        </div>
        <div className="rounded-md w-[60px] py-2 shrink-0 flex items-center justify-center text-cs-blue bg-cs-blue/10">
          <span className="text-center text-cs75 font-medium block truncate">
            {audioRef.current?.getDuration
              ? formatTime(audioRef.current.getDuration() ?? 0)
              : '0:00'}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        href={file}
        download
        className={cn(
          'flex items-center justify-between gap-3 p-4 rounded-lg bg-white',
          className,
        )}
      >
        <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden">
          {fileCat == 'image' && (
            <div className="size-[50px] aspect-square rounded-lg overflow-hidden relative srhink-0">
              <Image
                alt={file}
                src={file}
                width={100}
                height={100}
                className="absolute top-0 left-0 object-cover w-full h-full"
              />
            </div>
          )}
          <div className="overflow-hidden flex-1">
            <span className="text-cs08 font-bold text-black text-right truncate block mb-1">
              {file}
            </span>
            <span className="text-cs75 font-medium text-black/50 text-right truncate block">
              12 MB
            </span>
          </div>
        </div>
        <div className="rounded-md w-[60px] py-2 shrink-0 flex items-center justify-center text-green-500 bg-green-500/10">
          <span className="text-center text-cs75 font-medium block truncate">
            دانلود
          </span>
        </div>
      </Link>
    );
  }
}
