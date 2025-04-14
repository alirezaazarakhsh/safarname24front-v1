// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode, useEffect, useState } from 'react';
import CheckboxItem from '../financial/checkboxItem';
import { CreditCardSelectionComponentPropsType } from '@/types/dashboard/component';

// Defining checkbox items fake data to render for now
const data: {
  label: string;
  value: string;
  disabled?: boolean;
  disabledReason?: string;
}[] = [
  {
    label: 'انتخاب شماره کارت حقیقی',
    value: '1',
  },
  {
    label: 'انتخاب شماره کارت حقوقی',
    value: '2',
  },
  {
    label: 'انتخاب شماره کارت دلخواه',
    value: '3',
    disabled: true,
    disabledReason:
      'مشتری گرامی به دلیل مشکل در سیستم فنی این بهش برای شما غیر فعال میباشد لطفا دقایقی دیگر مراجعه نمایید!',
  },
];

// Creating and exporting CreditCardSelection component as default
export default function CreditCardSelection({
  onChange,
}: CreditCardSelectionComponentPropsType): ReactNode {
  // Defining hooks
  const [selectedItem, setSelectedItem] = useState<string>(data[0].value);

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange(selectedItem), [selectedItem]);

  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col items-start justify-start w-[50%]">
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="TaskSquare"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            گزینه انتخابی
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            مشتری گرامی یکی از شماره کارت خود را نتخاب نمایید.
          </p>
        </div>
      </div>
      <div className="h-full w-full overflow-auto px-3 py-4 flex flex-col items-start justify-around">
        {data.map((item, index) => (
          <CheckboxItem
            key={index}
            checked={selectedItem === item.value}
            title={item.label}
            disabled={item.disabled}
            isCardSelection
            disabledReason={item.disabledReason}
            onClick={() => setSelectedItem(item.value)}
          />
        ))}
      </div>
    </div>
  );
}
