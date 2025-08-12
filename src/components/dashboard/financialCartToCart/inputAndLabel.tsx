// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Label } from '@/components/ui/label';
import { InputAndLabelPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';

// Creating and exporting InputAndLabel component as default
export default function InputAndLabel({
  error,
  placeholder,
  validation,
  label,
  className,
  id,
  isValid = false,
  validationType = 'text',
  type,
  value,
  onChange,
  disabled,
  reset,
  hasIRIcon = false,
  ...props
}: InputAndLabelPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      data-disabled={disabled}
      className="w-full transition-all duration-500 data-[disabled='true']:opacity-50 bg-white"
    >
      {label && (
        <Label
          className={cn(
            'mb-3 block truncate text-right w-full text-xs',
            validationType === 'text' ? 'font-bold' : 'font-semibold',
          )}
          htmlFor={id}
        >
          {label}
        </Label>
      )}
      {validation ? (
        <div className="flex items-center justify-between gap-3 border border-black/10 rounded-lg overflow-hidden bg-white">
          <input
            id={id}
            placeholder={placeholder}
            data-errored={error !== undefined}
            className={cn(
              'w-full block outline-0 border-0 h-[50px] pr-3  text-xs font-normal placeholder:text-xs data-[errored="false"]:text-black data-[errored="false"]:placeholder:text-black/50 data-[errored="true"]:placeholder:text-cs-red data-[errored="true"]:text-cs-red transition-all duration-500 bg-transparent',
              className,
            )}
            disabled={disabled}
            {...props}
          />
          <div className="pl-3">
            {validationType === 'text' ? (
              <div
                className={cn(
                  'rounded-md px-5 py-1.5 flex items-center justify-center shrink-0 transition-all duration-500',
                  isValid
                    ? 'bg-green-100 text-green-500'
                    : error
                      ? 'bg-cs-red/10 text-cs-red'
                      : 'bg-gray-100 text-black/50',
                )}
              >
                <span className="text-xs font-normal text-current">
                  {error ? 'اشتباه است' : validation}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-1 shrink-0 bg-transparent">
                {hasIRIcon && (
                  <div
                    className={
                      'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-100 text-black/50'
                    }
                  >
                    <span className="text-cs06 block text-center truncate font-medium text-current -mb-0.5">
                      IR
                    </span>
                  </div>
                )}
                <button
                  disabled={!isValid}
                  onClick={reset && reset}
                  type="button"
                  className={
                    'w-[30px] h-[30px] transition-all duration-500 flex items-center justify-center rounded-md bg-gray-100 text-black/50 cursor-pointer'
                  }
                >
                  <IconsaxIcons
                    color={'currentColor'}
                    name={isValid ? 'TickSquare' : 'CloseSquare'}
                    className="w-[15px] h-[15px]"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          data-errored={error !== undefined}
          value={value}
          disabled={disabled}
          className={cn(
            'w-full block outline-0 transition-all duration-500 bg-white font-normal placeholder:text-xs text-xs border border-black/10  rounded-lg overflow-hidden p-3 h-[50px] data-[errored="false"]:text-black data-[errored="false"]:placeholder:text-black/50 data-[errored="true"]:placeholder:text-cs-red data-[errored="true"]:text-cs-red',
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
}
