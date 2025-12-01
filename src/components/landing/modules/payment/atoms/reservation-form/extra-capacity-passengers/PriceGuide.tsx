import { Info } from 'lucide-react';
import { numberSeparation } from '@/utils';

type Props = {
  price: number;
};

// ------------------------------

export function PriceGuide(props: Props) {
  return (
    <div className="-mt-1 flex items-center gap-1.5 text-cs75 font-semibold text-zinc-400 md:mt-0">
      <Info color="#888" size={15} />

      <p>
        قیمت به ازای هر نفر مبلغ
        <span className="mx-1 inline-block text-cs08 font-extrabold text-zinc-500">
          {numberSeparation(props.price)}
        </span>
        تومان میباشد .
      </p>
    </div>
  );
}
