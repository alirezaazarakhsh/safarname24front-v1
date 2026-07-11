// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { NormalInputComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';

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
  lenghtValidation,
  onBlur,
  onFocus,
  onInput,
  type,
  leftSideIcon,
  lenghtValidationEmtpyValueCount = 0,
  ...props
}: NormalInputComponentPropsType): ReactNode {
  // Defining hooks
  const [focused, setFocused] = useState<boolean>(props.autoFocus || false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const validationInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [valueLenght, setValueLenght] = useState<number>(0);

   useEffect(() => {
      if (lenghtValidation && type !== "file") {
         if (props.value) {
            const value = props.value ?? "";
            setValueLenght(value.toLocaleString().length);
         }
      }
   }, [props.value, lenghtValidation, type])

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
            type={type}
            className={cn(
              'text-right placeholder:text-black/50 flex-1 transition-all duration-500 text-black px-4 focus:text-black lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold group-data-[focused=true]:placeholder:text-black h-[50px]',
            )}
            required={required}
            placeholder={required ? `* ${placeholder}` : placeholder}
            onInput={onInput}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          <div className="flex items-center justify-start shrink-0 gap-2 ml-2 mr-2">
             <button
                         type="button"
                         className="shrink-0 size-[30px] ml-2 mr-2 flex items-center justify-center bg-gray-100 rounded-md text-black group-data-[disabled=true]:cursor-not-allowed"
                         onClick={() => {
                           if (!props.disabled) {
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
                       {
                                                                   leftSideIcon && (
                                                                      <div className="size-[30px] flex items-center justify-center text-[12px] font-medium text-current leading-none truncate text-center bg-gray-100 text-black [&>svg]:size-[12px] rounded-md">
                                                                         {leftSideIcon}
                                                                      </div>
                                                                   )
                                                                }
          </div>
                  </div>
        {error && !noErrorText && (
          <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
            {error}
          </p>
        )}
      </div>
    );
  } else if (lenghtValidation) {
    return (
      <div
        onClick={() => validationInputRef.current?.focus()}
        className={cn('w-full', wholeClassName)}
      >
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
            maxLength={lenghtValidation + lenghtValidationEmtpyValueCount}
            required={required}
            placeholder={required ? `* ${placeholder}` : placeholder}
            ref={validationInputRef}
            value={props.value}
            type={type}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onInput={(e) => {
              onInput?.(e);
               const value = e.currentTarget.value;
               const removedWhiteSpace = value.replace(/\s/g, "");

              setValueLenght(removedWhiteSpace.length);
            }}
            className={cn(
              'placeholder:text-black/50 flex-1 transition-all duration-500 text-black px-4 focus:text-black lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold group-data-[focused=true]:placeholder:text-black h-[50px]',
              textLTR ? 'text-left' : 'text-right',
            )}
            {...props}
          />
             <div className="flex items-center justify-start shrink-0 gap-2 ml-2 mr-2">
                <div
                            data-valid={lenghtValidation - valueLenght === 0}
                            className="px-4 h-[30px] transition-all duration-500 data-[valid=true]:text-white data-[valid=true]:bg-green-500 data-[valid=false]:text-black data-[valid=false]:bg-gray-100  rounded-md flex items-center justify-center"
                          >
                            <span className="text-[12px] font-medium text-current leading-none truncate block text-center">
                              {
                                lenghtValidation - valueLenght > 0
                                  ? `${lenghtValidation - valueLenght} رقم`
                                         : lenghtValidation - valueLenght === 0
                                         ? "تکمیل شد"
                                         : "اشتباه"
                              }
                            </span>
                          </div>
                          {
                                             leftSideIcon && (
                                                <div className="size-[30px] flex items-center justify-center text-[12px] font-medium text-current leading-none truncate text-center bg-gray-100 text-black [&>svg]:size-[12px] rounded-md">
                                                   {leftSideIcon}
                                                </div>
                                             )
                                          }
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
    if (type === "file") {
      return (
        <div className={cn('w-full', wholeClassName)}>
          <input
            type="file"
            ref={fileInputRef}
            onInput={(e) => {
              const files = e.currentTarget.files;

              onInput?.(e);
              files && setFile(files[0]);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            hidden
            required={required}
            placeholder={required ? `* ${placeholder}` : placeholder}
            {...props}
          />
          <button
            dir={textLTR ? 'ltr' : 'rtl'}
            data-errored={error ? true : false}
            type="button"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current?.click()
              } else {
                alert("not attached")
              }
            }}
            className={cn(
              'px-4 py-4 h-[50px] w-full text-right bg-white placeholder:text-black/50 text-black focus:text-black border-[1.2px] border-black/10 lg:rounded-lg rounded-[8px] lg:text-[12px] text-[10px] lg:placeholder:text-cs75 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold  transition-all duration-500 focus:border-black focus:placeholder:text-black data-[errored="true"]:border-cs-red data-[errored="true"]:focus:border-cs-red data-[errored="true"]:text-cs-red disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start',
              textLTR ? 'text-left' : 'text-right',
              className,
            )}
          >
            {
              file ? file.name : "برای انتخواب فایل کلیک کنید."
            }
          </button>
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
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            type={type}
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
}
