import { numberSeparation } from '@/utils';

type Props = {
  name: string;
  value: number;
  type?: 'cost' | 'discount';
  specialType?: 'final-total-price';
};

// ------------------------------

export function InvoiceItem(props: Props) {
  const { name, type = 'cost', value, specialType } = props;

  return (
    <div
      className={`text-[0.82rem] font-semibold flex-between ${specialType === 'final-total-price' ? 'bg-[#22AD5A] text-white h-11 px-4 rounded-cs-10' : type === 'discount' ? 'text-cs-red' : ''}`}
    >
      <div className="flex items-center gap-1">{name} :</div>

      <div className="flex items-center gap-1">
        <span className='font-bold'>{numberSeparation(value)}</span>
        <span>تومان</span>
      </div>
    </div>
  );
}
