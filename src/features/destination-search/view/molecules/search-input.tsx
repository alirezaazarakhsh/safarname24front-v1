import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import React, { RefObject } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  inputRef,
  placeholder = 'جستجوی شهر یا هتل مقصد ...',
}) => {
  return (
    <div className="relative flex w-full items-center">
      <Search className="text-muted-foreground pointer-events-none absolute right-4 size-5" />

      <Input
        type="text"
        value={value}
        ref={inputRef}
        className="ps-12 sm:h-12"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <Button
          type="button"
          size={'icon-sm'}
          variant={'ghost'}
          onClick={onClear}
          aria-label="پاک کردن متن"
          className="absolute left-2 rounded-lg"
        >
          <Plus className="rotate-45" />
        </Button>
      )}
    </div>
  );
};
