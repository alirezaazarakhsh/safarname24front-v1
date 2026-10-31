import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AuthFormValues } from '../model/types';
import { normalizeDigits } from '../model/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone } from 'lucide-react';

export const PhoneStep: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AuthFormValues>();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Automatically normalize Persian/Arabic digits as user types
    const normalized = normalizeDigits(e.target.value);
    setValue('phoneNumber', normalized, { shouldValidate: true });
  };

  return (
    <div className="space-y-3.5">
      <Label
        htmlFor="phoneNumber"
        className="text-foreground text-sm font-medium"
      >
        شماره موبایل :
      </Label>

      <div className="relative">
        <Smartphone className="text-muted-foreground absolute top-1/2 right-4 size-5 -translate-y-1/2" />

        <Input
          dir="rtl"
          type="tel"
          autoFocus
          id="phoneNumber"
          placeholder="09123456789"
          className="h-12 ps-11 tracking-widest"
          {...register('phoneNumber', {
            onChange: handlePhoneChange,
          })}
        />
      </div>

      {errors.phoneNumber && (
        <span className="text-destructive block text-xs font-medium">
          {errors.phoneNumber.message}
        </span>
      )}
    </div>
  );
};
