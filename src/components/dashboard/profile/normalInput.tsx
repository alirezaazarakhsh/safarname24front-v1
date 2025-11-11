// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { NormalInputComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useRef, useState } from 'react';

// Creating and exporting NormalInput component as default
export default function NormalInput({
  error,
  className,
  wholeClassName,
  required,
  placeholder,
  noErrorText = false,
  clearFn,
  textLTR = false,
  validationText,
  ...props
}: NormalInputComponentPropsType): ReactNode {
  // Defining hooks
  const [focused, setFocused] = useState<boolean>(props.autoFocus || false);

  // Conditional rendering
  if (clearFn) {
    return (
      <div className={cn('w-full', wholeClassName)}>
        <div
          data-errored={error ? true : false}
          data-focused={focused}
          data-disabled={props.disabled || false}
          className={cn(
            'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 group py-4 h-[50px] flex items-center justify-between w-full bg-white border-[1.2px] border-black/10 overflow-hidden lg:rounded-lg rounded-[8px]  transition-all duration-500 data-[focused=true]:border-black data-[errored="true"]:border-cs-red data-[errored="true"]:focus:border-cs-red data-[errored="true"]:text-cs-red',
            className,
          )}
        >
          <input
            dir={textLTR ? 'ltr' : 'rtl'}
            className={cn(
              'text-right placeholder:text-black/50 flex-1 transition-all duration-500 text-black px-4 focus:text-black lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold group-data-[focused=true]:placeholder:text-black',
            )}
            required={required}
            placeholder={required ? `* ${placeholder}` : placeholder}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus && props.onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur && props.onBlur(e);
            }}
            {...props}
          />
          <button
            type="button"
            className="shrink-0 size-[30px] ml-3 flex items-center justify-center bg-gray-100 rounded-md text-black group-data-[disabled=true]:cursor-not-allowed"
            onClick={() => {
              if (props.disabled && !props.disabled) {
                clearFn();
              }
            }}
          >
            <IconsaxIcons
              name="CloseSquare"
              color="currentColor"
              className="size-[20px]"
            />
          </button>
        </div>
        {error && !noErrorText && (
          <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
            {error}
          </p>
        )}
      </div>
    );
  } else if (validationText) {
    return (
      <div className={cn('w-full', wholeClassName)}>
        <div
          data-errored={error ? true : false}
          data-disabled={props.disabled || false}
          data-focused={focused}
          className={cn(
            'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 group py-4 h-[50px] flex items-center justify-between w-full bg-white border-[1.2px] border-black/10 overflow-hidden lg:rounded-lg rounded-[8px] transition-all duration-500 data-[focused=true]:border-black data-[errored="true"]:border-cs-red data-[errored="true"]:focus:border-cs-red data-[errored="true"]:text-cs-red cursor-text',
            className,
          )}
        >
          <input
            dir={textLTR ? 'ltr' : 'rtl'}
            className={cn(
              'placeholder:text-black/50 flex-1 transition-all duration-500 text-black px-4 focus:text-black lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold group-data-[focused=true]:placeholder:text-black',
              textLTR ? 'text-left' : 'text-right',
            )}
            required={required}
            placeholder={required ? `* ${placeholder}` : placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          <div className="ml-3 shrink-0 px-4 h-[30px] bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-cs06 text-black leading-none truncate block text-center">
              {validationText}
            </span>
          </div>
        </div>
        {error && !noErrorText && (
          <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
            {error}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className={cn('w-full', wholeClassName)}>
        <input
          dir={textLTR ? 'ltr' : 'rtl'}
          required={required}
          placeholder={required ? `* ${placeholder}` : placeholder}
          data-errored={error ? true : false}
          className={cn(
            'px-4 py-4 h-[50px] w-full text-right block bg-white placeholder:text-black/50 text-black focus:text-black border-[1.2px] border-black/10 lg:rounded-lg rounded-[8px] lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold  transition-all duration-500 focus:border-black focus:placeholder:text-black data-[errored="true"]:border-cs-red data-[errored="true"]:focus:border-cs-red data-[errored="true"]:text-cs-red disabled:cursor-not-allowed disabled:opacity-50',
            textLTR ? 'text-left' : 'text-right',
            className,
          )}
          {...props}
        />
        {error && !noErrorText && (
          <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
            {error}
          </p>
        )}
      </div>
    );
  }
}
