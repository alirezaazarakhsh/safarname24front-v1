// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Picker from '@emoji-mart/react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { File } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
  reply,
  clearReply,
}: TicketsSendMessagePropsType): ReactNode {
  // Defining hooks
  const [value, setValue] = useState<string>('');
  const [media, setMedia] = useState<File | undefined>();
  const [emojiOpened, setEmojiOpened] = useState<boolean>(false);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

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
    return (
      <div className="relative">
        {reply.name !== '' && (
          <div className="left-0 bottom-full z-50 lg:absolute w-full bg-gray-100 rounded-t-lg overflow-hidden border-b border-b-cs-blue">
            <div className="flex items-start justify-between gap-5 w-full bg-cs-blue/10">
              <div className="flex justify-start items-center">
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
                    <span className="text-cs-blue font-bold text-right block truncate mb-0.5 text-cs65">
                      {reply.name}
                    </span>
                    <p className="text-black/60 font-semibold text-cs65 text-right leading-4">
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
        )}
        <form
          action="#"
          className={cn(
            'flex justify-between text-black/50 bg-gray-100 h-[50px] relative transition-all duration-500',
            reply.name !== '' ? 'rounded-b-lg' : 'rounded-lg',
            className,
          )}
        >
          {!media && (
            <>
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
                    setValue((prev) => prev + emoji.native)
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
            </>
          )}
          {media ? (
            <div className="flex items-center justify-start flex-1 overflow-hidden">
              <div className="size-[50px] flex items-center justify-center shrink-0">
                <File className="currentColor size-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-cs85 font-bold text-right block text-black/50 truncate">
                  {media.name}
                </span>
              </div>
            </div>
          ) : (
            <input
              onChange={(e) => setValue(e.currentTarget.value)}
              value={value}
              className="text-cs65 font-medium placeholder:text-cs65 placeholder:black/30 text-black text-right truncate block flex-1  h-[50px] bg-transparent outline-0"
              type="text"
              placeholder="متن خود را بنویسید..."
            />
          )}
          {value === '' ? (
            <div className="flex items-center justify-end shrink-0">
              {!media ? (
                <>
                  <input
                    type="file"
                    accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    hidden
                    ref={mediaInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMedia(e.target.files[0]);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center shrink-0 h-full aspect-square"
                    onClick={() => mediaInputRef.current?.click()}
                  >
                    <IconsaxIcons
                      name="Gallery"
                      className="size-5"
                      color="currentColor"
                    />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="flex items-center justify-center shrink-0 h-full aspect-square"
                  onClick={() => setMedia(undefined)}
                >
                  <IconsaxIcons
                    name="CloseSquare"
                    className="size-5"
                    color="currentColor"
                  />
                </button>
              )}
              <button
                type={media ? 'submit' : 'button'}
                className="flex items-center justify-center shrink-0 h-full aspect-square"
              >
                <IconsaxIcons
                  name={media ? 'Send' : 'Microphone'}
                  className={cn('size-5', media && 'rotate-180')}
                  color="currentColor"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between shrink-0">
              <button
                type="submit"
                className="flex items-center justify-center shrink-0 h-full aspect-square"
              >
                <IconsaxIcons
                  name="Send"
                  className="size-5 rotate-180"
                  color="currentColor"
                />
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
