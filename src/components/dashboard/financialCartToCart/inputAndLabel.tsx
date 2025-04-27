// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Label } from '@/components/ui/label';
import { InputAndLabelPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

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
  ...props
}: InputAndLabelPropsType): ReactNode {
  // Conditional rendering and Returning JSX
  if (type === 'date') {
    return (
      <div className="w-full">
        <Label
          className={cn(
            'mb-3 block truncate text-right w-full text-xs',
            validationType === 'text' ? 'font-bold' : 'font-semibold',
          )}
          htmlFor={id}
        >
          {label}
        </Label>
        <Button
          data-errored={error !== undefined}
          id={id}
          onClick={() => console.log('Opend date picker component')}
          type="button"
          className={cn(
            'gap-3 border border-black/10 rounded-lg overflow-hidden p-3 h-[50px] group transition-all duration-500 w-full block bg-white hover:bg-white',
            className,
          )}
        >
          <span
            className={
              'w-full block outline-0 border-0 bg-white text-xs group-data-[errored="false"]:text-black/50 group-data-[errored="true"]:text-cs-red text-right truncate'
            }
          >
            {placeholder}
          </span>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <Label
          className={cn(
            'mb-3 block truncate text-right w-full text-xs',
            validationType === 'text' ? 'font-bold' : 'font-semibold',
          )}
          htmlFor={id}
        >
          {label}
        </Label>
        {validation ? (
          <div className="flex items-center justify-between gap-3 border border-black/10 rounded-lg overflow-hidden p-3 h-[50px]">
            <input
              id={id}
              placeholder={placeholder}
              data-errored={error !== undefined}
              className={cn(
                'w-full block outline-0 border-0 bg-white text-xs font-normal placeholder:text-xs data-[errored="false"]:text-black data-[errored="false"]:placeholder:text-black/50 data-[errored="true"]:placeholder:text-cs-red data-[errored="true"]:text-cs-red transition-all duration-500',
                className,
              )}
              {...props}
            />
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
              <div
                className={
                  'w-[30px] h-[30px] shrink-0 transition-all duration-500 flex items-center justify-center rounded-md bg-gray-100 text-black/50'
                }
              >
                <IconsaxIcons
                  color={'currentColor'}
                  name={isValid ? 'TickSquare' : 'CloseSquare'}
                  className="w-[15px] h-[15px]"
                />
              </div>
            )}
          </div>
        ) : (
          <input
            id={id}
            placeholder={placeholder}
            data-errored={error !== undefined}
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
}
