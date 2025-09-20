'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ReactNode, useState, useRef, useEffect } from 'react';
import AudioWave from './audioWave';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { formatTime } from '@/utils/string';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import Link from 'next/link';
import Image from 'next/image';
import {
  cn,
  fileFromPath,
  formatFileSize,
  getFileCategory,
  hexToRgba,
  isColorDark,
  toPercentage,
} from '@/utils/utils';
import moment from 'jalali-moment';
import {
  MessageItemPropsType,
  AudioWaveHandle,
} from '@/types/dashboard/component';
import useLocalStorageState from 'use-local-storage-state';
import { File } from 'lucide-react';
import PlayIcon from '../ui/playIcon';

export default function MessageItem({
  data,
  className,
  setReply,
}: MessageItemPropsType): ReactNode {
  const audioRef = useRef<AudioWaveHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userInfo = useUserInfo();
  const fileCat = getFileCategory(data.message);
  const [x, setX] = useState(0);
  const [theme] = useLocalStorageState<string>('ticketTheme');
  const [walpaper] = useLocalStorageState<string>('ticketWalpaper');
  const actualFile = fileFromPath(data.message);

  const [backgroundScalePercentage, setBackgroundScalePercentage] =
    useState<number>(0);

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

  const MAX_LEFT_SWIPE = -80;
  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (data.from === 'answerer') {
        if (e.deltaX < 0 && e.deltaX > MAX_LEFT_SWIPE) {
          setX(Math.max(e.deltaX, MAX_LEFT_SWIPE));
        }
      }
    },

    onSwiped: () => {
      if (data.from === 'answerer') setX(0);
    },

    onSwipedLeft: () => {
      if (data.from === 'answerer' && setReply) {
        if (data.type === 'voice') {
          setReply('صدا', data.answererName);
        } else if (data.type === 'file') {
          setReply('فایل', data.answererName);
        } else {
          setReply(data.message, data.answererName);
        }
      }
    },
    trackMouse: true,
  });

  useEffect(() => {
    const value = toPercentage(Math.abs(x), 80);
    setBackgroundScalePercentage(Math.ceil(value));
  }, [x]);

  return (
    <AnimatePresence>
      <motion.div
        {...handlers}
        animate={{ x }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'flex items-center w-full',
          data.from === 'user' ? 'justify-start' : 'justify-end',
          className,
        )}
      >
        <div className="max-w-[calc(100%-100px)] relative">
          {data.from === 'answerer' && (
            <div
              data-show={x < 0}
              className={cn(
                'size-[30px] aspect-square absolute top-[50%] transition-all delay-300 duration-500 -translate-y-[calc(50%+15px)] data-[show=true]:opacity-100 data-[show=false]:opacity-0',
                data.from === 'answerer'
                  ? 'left-[calc(100%+12px)]'
                  : 'right-[calc(100%+12px)]',
              )}
            >
              <div
                className="size-full aspect-square absolute top-0 left-0 -z-10 rounded-full scale-150"
                style={{
                  opacity: `${backgroundScalePercentage - 50}%`,
                  background: theme,
                }}
              />
              <div
                className="size-[30px] aspect-square flex items-center justify-center rounded-full"
                style={{
                  background: theme,
                  color: isColorDark(theme) ? '#ffffff' : '#000000',
                }}
              >
                <IconsaxIcons
                  className="size-[15px]"
                  name="Back"
                  color="currentColor"
                />
              </div>
            </div>
          )}
          <div
            style={{
              background: data.from === 'user' ? theme : '#ffffff',
              color:
                data.from === 'user'
                  ? isColorDark(theme)
                    ? '#ffffff'
                    : '#000000'
                  : '#000000',
            }}
            className={cn(
              'py-3 px-4 w-full rounded-xl overflow-hidden',
              data.from === 'user' ? 'rounded-br-none' : 'rounded-bl-none',
            )}
          >
            {data.replyMessage && (
              <div
                style={{
                  color: data.from === 'answerer' ? theme : 'white',
                  background:
                    data.from === 'answerer'
                      ? theme === '#548BF6'
                        ? '#548bf61c'
                        : hexToRgba(theme, 0.2)
                      : 'rgba(255,255,255,0.13)',
                }}
                className={
                  'border-r-2 border-r-current py-1 px-3 mb-2 rounded-l-md'
                }
              >
                <span className="text-current font-bold text-right block truncate mb-1 text-[11px] select-none">
                  {data.from === 'answerer'
                    ? `${userInfo.first_name} ${userInfo.last_name}`
                    : data.answererName}
                </span>
                <p className="text-current font-semibold text-[11px] text-right leading-4 select-none">
                  {data.replyMessage}
                </p>
              </div>
            )}
            {data.type === 'voice' ? (
              <div className="flex items-center justify-between w-[200px] gap-3">
                <button
                  onClick={handlePlayPause}
                  style={{
                    background:
                      data.from === 'answerer'
                        ? '#000000'
                        : isColorDark(theme)
                          ? '#ffffff'
                          : '#000000',
                    color: data.from === 'answerer' ? '#ffffff' : theme,
                  }}
                  className="size-[35px] aspect-square flex items-center justify-center rounded-full shrink-0"
                >
                  {!isPlaying ? (
                    <PlayIcon className="size-[15px] text-current" />
                  ) : (
                    <IconsaxIcons
                      className="size-[15px]"
                      name={'Pause'}
                      variant="Bold"
                      color="currentColor"
                    />
                  )}
                </button>
                <div className="flex-1 h-[35px] overflow-hidden">
                  <AudioWave
                    audioUrl={data.message}
                    className="w-full h-[35px]"
                    ref={audioRef}
                    progressColor={
                      data.from === 'answerer'
                        ? '#000000'
                        : isColorDark(theme)
                          ? '#ffffff'
                          : '#000000'
                    }
                  />
                </div>
                <span className="text-center text-cs75 font-medium block truncate shrink-0 text-current select-none">
                  {audioRef.current?.getDuration
                    ? formatTime(audioRef.current.getDuration() ?? 0)
                    : '0:00'}
                </span>
              </div>
            ) : data.type === 'file' ? (
              <Link
                dir={data.from === 'answerer' ? 'ltr' : 'rtl'}
                download
                href={data.message}
                className="flex items-center justify-between gap-3"
              >
                {fileCat === 'image' ? (
                  <Image
                    src={data.message}
                    width={50}
                    height={50}
                    className="size-[35px] aspect-square shrink-0 rounded-lg object-cover"
                    alt={data.message}
                  />
                ) : (
                  <div className="size-[35px] aspect-square shrink-0 flex items-center justify-center">
                    <File
                      style={{ fill: theme, strokeWidth: '1px' }}
                      className="text-current size-[20px]"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span className="text-current font-light text-start block select-none truncate mb-1 text-cs06 w-[20ch]">
                    {actualFile.name}
                  </span>
                  <span className="text-current font-light text-start block select-none truncate text-cs06">
                    {formatFileSize(actualFile.size)}
                  </span>
                </div>
              </Link>
            ) : (
              <p className="text-current font-semibold text-[13px] text-right select-none leading-6">
                {data.message}
              </p>
            )}
          </div>
          <span
            style={{
              color: isColorDark(walpaper) ? '#ffffff' : '#484848',
            }}
            className={cn(
              data.from === 'user' ? 'text-right' : 'text-left',
              'block truncate font-semibold mt-2 text-[10px]',
            )}
          >
            {moment(data.createdAt).locale('fa').format('HH:mm A')}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
