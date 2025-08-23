// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Picker from '@emoji-mart/react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn, hexToRgba, isColorDark } from '@/utils/utils';
import { File } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useLocalStorageState from 'use-local-storage-state';
import ReportTicket, { reportGroupData } from './dialog/reportTicket';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
  reply,
  clearReply,
  isClosed = false,
  reportTypes,
}: TicketsSendMessagePropsType): ReactNode {
  // Defining hooks
  const [value, setValue] = useState<string>('');
  const [media, setMedia] = useState<File | undefined>();
  const [emojiOpened, setEmojiOpened] = useState<boolean>(false);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  // Defining local storage items
  const [walpaper] = useLocalStorageState<string>('ticketWalpaper');
  const [theme] = useLocalStorageState<string>('ticketTheme');

  // Conditional rendering
  if (disabled) {
    return (
      <div
        style={{
          background: walpaper,
          color: isColorDark(walpaper) ? '#ffffff' : '#000000',
        }}
        className={cn(
          'flex justify-between text-current/50 rounded-lg gap-[12px] h-[50px] cursor-not-allowed overflow-hidden',
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
          <span className="text-cs65 font-medium text-current/30 text-right truncate block w-full">
            مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا دپارتمان
            خود را انتخاب نمایید
          </span>
        </div>
      </div>
    );
  } else {
    if (isClosed) {
      return (
        <div
          style={{
            background: walpaper,
            color: isColorDark(walpaper) ? '#ffffff' : '#000000',
          }}
          className={cn(
            'flex justify-start text-current/50 rounded-lg gap-[12px] h-[50px] overflow-hidden',
            className,
          )}
        >
          <div className="flex-1 flex items-center overflow-hidden pr-[12px]">
            <span className="text-cs65 font-medium text-current/30 text-right block w-full truncate">
              * مشتری گرامی تیکت شما توسط ادمین بسته شده است شما می توانید برای
              این تیکت بازخورد ثبت کنید و در راستای بهتر شدن کیفیت پشتیبانی به
              ما کمک کنید.
            </span>
          </div>
          <div
            className="flex items-center justify-center h-[50px] pl-[12px]  shrink-0"
            style={{
              color: theme,
            }}
          >
            {!reportTypes ? (
              <ReportTicket />
            ) : (
              <div
                className="px-4 rounded-md flex items-center justify-center py-2"
                style={{
                  background: hexToRgba(theme, 0.2),
                }}
              >
                <span className="text-cs65 font-medium text-current text-center truncate block">
                  {reportGroupData.find((item) => item.value === reportTypes)
                    ?.label || 'گزارش شنما'}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative">
          {reply.name !== '' && (
            <div className="lg:absolute bottom-full left-0 w-full z-20">
              <div
                style={{
                  borderColor: theme,
                  background: walpaper,
                }}
                className="rounded-t-lg overflow-hidden border-b"
              >
                <div
                  style={{
                    background: hexToRgba(theme, 0.2),
                  }}
                  className="flex items-start justify-between gap-5 w-full"
                >
                  <div className="flex justify-start items-center">
                    <div className="size-[50px] shrink-0 flex items-center justify-center">
                      <div
                        className="aspect-sqaure  size-[30px] flex items-center justify-center rounded-full"
                        style={{
                          background: theme,
                          color: isColorDark(theme) ? '#ffffff' : '#000000',
                        }}
                      >
                        <IconsaxIcons
                          name="Back"
                          color="currentColor"
                          className="size-[15px]"
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden flex-1 min-h-[50px] flex items-center">
                      <div className="flex-1">
                        <span
                          style={{ color: theme }}
                          className="font-bold text-right block truncate mb-0.5 text-cs65"
                        >
                          {reply.name}
                        </span>
                        <p
                          style={{
                            color: isColorDark(walpaper)
                              ? '#ffffff'
                              : '#000000',
                          }}
                          className="font-semibold text-cs65 text-right leading-4"
                        >
                          {reply.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end shrink-0">
                    <div
                      style={{
                        background: theme,
                        color: isColorDark(theme) ? '#ffffff' : '#000000',
                      }}
                      className="rounded-md flex items-center justify-center h-[30px] px-3"
                    >
                      <span className="block truncate text-center text-current text-cs65 font-bold">
                        Reply
                      </span>
                    </div>
                    <button
                      onClick={clearReply}
                      style={{
                        color: theme,
                      }}
                      className="size-[50px] flex items-center justify-center"
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
            </div>
          )}
          <form
            action="#"
            style={{
              background: walpaper,
              color: isColorDark(walpaper) ? '#ffffff' : '#000000',
            }}
            className={cn(
              'flex justify-between h-[50px] relative transition-all duration-500',
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
                  <File
                    style={{
                      fill: theme,
                      strokeWidth: '1px',
                      stroke: isColorDark(theme) ? '#ffffff' : '#000000',
                    }}
                    className="size-5"
                  />
                </div>
                <div
                  style={{
                    color: isColorDark(walpaper) ? '#ffffff' : '#000000',
                  }}
                  className="flex-1 overflow-hidden"
                >
                  <span className="text-cs85 font-bold text-right block truncate text-current">
                    {media.name}
                  </span>
                </div>
              </div>
            ) : (
              <input
                onChange={(e) => setValue(e.currentTarget.value)}
                style={{
                  color: isColorDark(walpaper) ? '#ffffff' : '#000000',
                }}
                value={value}
                className="text-cs65 font-medium placeholder:text-cs65 text-right truncate block flex-1  h-[50px] bg-transparent outline-0"
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
}
