// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
  reply,
  clearReply,
}: TicketsSendMessagePropsType): ReactNode {
  // Defining hooks
  const [value, setValue] = useState<string>('');

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
      <form
        action="#"
        className={cn(
          'flex justify-between text-black/50 bg-gray-100 h-[50px] relative transition-all duration-500',
          reply.name !== '' ? 'rounded-b-lg' : 'rounded-lg',
          className,
        )}
      >
        {reply.name !== '' && (
          <div className="absolute bottom-full left-0 w-full z-20 bg-gray-100 rounded-t-lg overflow-hidden border-b border-b-cs-blue">
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
        <button className="flex items-center justify-center shrink-0 h-full aspect-square">
          <IconsaxIcons
            name="Happyemoji"
            className="size-5"
            color="currentColor"
          />
        </button>
        <input
          onChange={(e) => setValue(e.currentTarget.value)}
          className="text-cs65 font-medium placeholder:text-cs65 placeholder:black/30 text-black text-right truncate block flex-1  h-[50px] bg-transparent outline-0"
          type="text"
          placeholder="متن خود را بنویسید..."
        />
        {value === '' ? (
          <div className="flex items-center justify-end shrink-0">
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Gallery"
                className="size-5"
                color="currentColor"
              />
            </button>
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Microphone"
                className="size-5"
                color="currentColor"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between shrink-0">
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Send"
                className="size-5 rotate-180"
                color="currentColor"
              />
            </button>
          </div>
        )}
      </form>
    );
  }
}
