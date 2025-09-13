import { Info } from 'lucide-react';
import { numberSeparation } from '@/utils';

type Props = {
  price: number;
};

// ------------------------------

export function PriceGuide(props: Props) {
  return (
    <div className="text-zinc-400 text-cs75 font-semibold -mt-1 flex items-center gap-1.5 md:mt-0">
      <Info color="#888" size={15} />

      <p>
        قیمت به ازای هر نفر مبلغ
        <span className="text-zinc-500 text-cs08 font-extrabold inline-block mx-1">
          {numberSeparation(props.price)}
        </span>
        تومان میباشد
      </p>
    </div>
  );
}
