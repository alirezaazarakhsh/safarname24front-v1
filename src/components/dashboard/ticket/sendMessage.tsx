// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Picker from '@emoji-mart/react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { File } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import VoiceRecorder from './voiceRecorder';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
  reply,
  clearReply,
}: TicketsSendMessagePropsType): ReactNode {
  // Defining hooks
  const [mode, setMode] = useState<'voice' | 'file' | 'text'>('text');
  const [textValue, setTextValue] = useState<string>('');
  const [mediaValue, setMediaValue] = useState<File | undefined>();
  const [voiceMedia, setVoiceMedia] = useState<Blob | undefined>();

  const [emojiOpened, setEmojiOpened] = useState<boolean>(false);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  // Using useEffect to open select modal for files when mode is "file" (mode === "file")
  useEffect(() => {
    if (mode === 'file') {
      mediaInputRef.current?.click();
    }
  }, [mode]);

  // Defining reply component
  function Reply(): ReactNode {
    if (reply.name !== '') {
      return (
        <div className="left-0 bottom-full z-50 lg:absolute w-full bg-gray-100 rounded-t-lg overflow-hidden border-b border-b-cs-blue">
          <div className="flex items-start justify-between gap-5 w-full bg-cs-blue/10 py-[5px]">
            <div className="flex justify-start items-center gap-[5px]">
              <div className="size-[50px] shrink-0 flex items-center justify-center">
                <div className="aspect-sqaure  size-[30px] flex items-center justify-center bg-cs-blue rounded-full text-white">
                  <IconsaxIcons
                    name="Back"
                    color="currentColor"
                    className="size-[15px]"
                  />
                </div>
              </div>
              <div className="overflow-hidden flex-1 min-h-[50px] flex items-center">
                <div className="flex-1">
                  <span className="text-cs-blue font-bold text-right block truncate mb-[5px] text-[12px]">
                    {reply.name}
                  </span>
                  <p className="text-black/80 font-semibold text-[12px] text-right leading-4">
                    {reply.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end shrink-0">
              <div className="rounded-md bg-cs-blue text-white flex items-center justify-center h-[30px] px-3">
                <span className="block truncate text-center text-current text-cs65 font-bold">
                  Reply
                </span>
              </div>
              <button
                onClick={clearReply}
                className="text-cs-blue size-[50px] flex items-center justify-center"
              >
                <IconsaxIcons
                  name="CloseSquare"
                  color="currentColor"
                  className="size-5"
                />
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Conditional rendering
  if (disabled) {
    return (
      <div
        className={cn(
          'flex justify-between text-black/50 bg-gray-100 rounded-lg gap-[12px] h-[50px] cursor-not-allowed overflow-hidden',
          className,
        )}
      >
        <div className="flex items-center justify-center shrink-0 h-full aspect-square">
          <IconsaxIcons
            name="Lock"
            className="shrink-0 size-5"
            color="currentColor"
          />
        </div>
        <div className="h-[50px] flex-1 flex items-center overflow-hidden">
          <span className="text-cs65 font-medium text-black/30 text-right truncate block w-full">
            مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا دپارتمان
            خود را انتخاب نمایید
          </span>
        </div>
      </div>
    );
  } else {
    if (mode === 'text') {
      return (
        <div className="relative">
          <Reply />
          <form
            action="#"
            className={cn(
              'flex justify-between text-black/50 bg-gray-100 h-[50px] relative transition-all duration-500',
              reply.name !== '' ? 'rounded-b-lg' : 'rounded-lg',
              className,
            )}
          >
            <motion.div
              className="absolute right-0 bottom-full z-30"
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
              exit={{
                y: -20,
                opacity: 0,
                pointerEvents: 'none',
              }}
              initial={{
                y: -20,
                opacity: 0,
                pointerEvents: 'none',
              }}
              animate={
                emojiOpened
                  ? {
                      y: -20,
                      opacity: 100,
                      pointerEvents: 'auto',
                    }
                  : {
                      y: 0,
                      opacity: 0,
                      pointerEvents: 'none',
                    }
              }
            >
              <Picker
                theme="light"
                onClickOutside={() => emojiOpened && setEmojiOpened(false)}
                set="apple"
                locale="fa"
                navPosition="none"
                previewPosition="none"
                searchPosition="none"
                onEmojiSelect={(emoji: any) =>
                  setTextValue((prev) => prev + emoji.native)
                }
              />
            </motion.div>
            <button
              onClick={() => setEmojiOpened((prev) => !prev)}
              type="button"
              className="flex items-center justify-center shrink-0 h-full aspect-square"
            >
              <IconsaxIcons
                name="Happyemoji"
                className="size-5"
                color="currentColor"
              />
            </button>
            <input
              onChange={(e) => setTextValue(e.currentTarget.value)}
              value={textValue}
              className="text-[14px] font-semibold placeholder:text-[13px] placeholder:font-medium placeholder:black/30 text-black text-right truncate block flex-1  h-[50px] bg-transparent outline-0"
              type="text"
              placeholder="متن خود را بنویسید..."
            />
            <div className="flex items-center justify-end shrink-0">
              {(!textValue || textValue === '') && (
                <button
                  type="button"
                  className="flex items-center justify-center shrink-0 h-full"
                  onClick={() => setMode('file')}
                >
                  <IconsaxIcons
                    name="Gallery"
                    className="size-5"
                    color="currentColor"
                  />
                </button>
              )}
              <button
                type={!textValue || textValue === '' ? 'button' : 'submit'}
                className="flex items-center justify-center shrink-0 h-full aspect-square"
                onClick={() => {
                  if (!textValue || textValue === '') {
                    setMode('voice');
                  } else {
                  }
                }}
              >
                <IconsaxIcons
                  name={!textValue || textValue === '' ? 'Microphone' : 'Send'}
                  className={cn(
                    'size-5',
                    !textValue || (textValue && 'rotate-180'),
                  )}
                  color="currentColor"
                />
              </button>
            </div>
          </form>
        </div>
      );
    } else if (mode === 'file') {
      return (
        <div className="relative">
          <Reply />
          <form
            action="#"
            className={cn(
              'flex justify-between text-black/50 bg-gray-100 h-[50px] relative transition-all duration-500',
              reply.name !== '' ? 'rounded-b-lg' : 'rounded-lg',
              className,
            )}
          >
            <div
              onClick={() => mediaInputRef.current?.click()}
              className="flex items-center justify-start flex-1 overflow-hidden"
            >
              <div className="size-[50px] flex items-center justify-center shrink-0">
                <File className="currentColor size-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-[14px] font-semibold text-right block text-black/50 truncate">
                  {mediaValue ? mediaValue.name : '-'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end shrink-0 mr-4">
              <input
                type="file"
                accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                ref={mediaInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setMediaValue(e.target.files[0]);
                  }
                }}
              />
              <button
                type={'button'}
                className="flex items-center justify-center shrink-0 h-full"
              >
                <IconsaxIcons
                  name={'CloseSquare'}
                  className={'size-5 rotate-180'}
                  color="currentColor"
                  onClick={() => {
                    setMode('text');
                    setMediaValue(undefined);
                  }}
                />
              </button>
              <button
                type={'submit'}
                className="flex items-center justify-center shrink-0 h-full aspect-square"
              >
                <IconsaxIcons
                  name={'Send'}
                  className={'size-5 rotate-180'}
                  color="currentColor"
                />
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <Reply />
          <form
            action="#"
            className={cn(
              'flex justify-between text-black/50 bg-gray-100 h-[50px] relative transition-all duration-500',
              reply.name !== '' ? 'rounded-b-lg' : 'rounded-lg',
              className,
            )}
          >
            <div className="flex-1 overflow-hidden">
              <VoiceRecorder onChange={(blob) => setVoiceMedia(blob)} />
            </div>
            <div className="flex items-center justify-end shrink-0 mr-4">
              <button
                type={'button'}
                className="flex items-center justify-center shrink-0 h-full"
                onClick={() => {
                  setMode('text');
                  setVoiceMedia(undefined);
                }}
              >
                <IconsaxIcons
                  name={'CloseSquare'}
                  className={'size-5 rotate-180'}
                  color="currentColor"
                />
              </button>
              <button
                type={'submit'}
                className="flex items-center justify-center shrink-0 h-full aspect-square"
              >
                <IconsaxIcons
                  name={'Send'}
                  className={'size-5 rotate-180'}
                  color="currentColor"
                />
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
