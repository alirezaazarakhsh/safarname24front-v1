import React, { forwardRef, useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="flex w-full flex-col gap-1">
        {/* کانتینر اصلی با relative */}
        <div className="relative w-full">
          {/* آیکون ابتدا (Start Icon) */}
          {startIcon && (
            <div className="pointer-events-none absolute top-1/2 left-3 z-10 flex -translate-y-1/2 items-center justify-center text-gray-400 [&_svg]:h-5 [&_svg]:w-5">
              {startIcon}
            </div>
          )}

          {/* اینپوت */}
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            className={`peer w-full rounded-md border border-gray-300 bg-white py-3 text-sm text-gray-900 transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${error ? '!border-red-500 !ring-red-500' : ''} /* تنظیم دقیق فاصله متن از کناره‌ها برای جا شدن آیکون */ ${startIcon ? 'ps-10 pl-10' : 'ps-3.5 pl-3.5'} ${endIcon ? 'pe-10 pr-10' : 'pe-3.5 pr-3.5'} ${className} `}
            {...props}
          />

          {/* آیکون انتها (End Icon) */}
          {endIcon && (
            <div className="absolute end-3 top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center text-gray-400 [&_svg]:h-5 [&_svg]:w-5">
              {endIcon}
            </div>
          )}

          {/* لیبل شناور */}
          <label
            htmlFor={inputId}
            className={`origin-start /* موقعیت افقی لیبل */ pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 bg-white px-1 text-sm text-gray-500 transition-all duration-200 ${
              startIcon
                ? 'start-10 left-10 peer-focus:start-2.5 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:start-2.5 peer-[:not(:placeholder-shown)]:left-2.5'
                : 'start-3 left-3'
            } /* انیمیشن بالا رفتن روی خط کادر */ peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${error ? 'text-red-500 peer-focus:!text-red-500' : ''} `}
          >
            {label}
          </label>
        </div>

        {/* متن خطا یا راهنما */}
        {helperText && (
          <span
            className={`px-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
