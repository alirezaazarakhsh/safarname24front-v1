import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { numberSeparation } from '@/utils';

type Props = {
  walletBalance?: number;
};

// ------------------------------

export function WalletWithdrawAccordionTrigger(props: Props) {
  const { walletBalance } = props;

  return (
    <>
      <span className="text-cs85 font-bold">پرداخت از کیف پول</span>

      <div className="bg-cs-blue/10 text-cs-blue text-cs08/5 font-semibold px-3 py-1.5 mr-auto rounded-lg">
        {walletBalance ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{numberSeparation(walletBalance)} تومان</span>
            </TooltipTrigger>

            <TooltipContent sideOffset={8}>موجودی کیف پول شما</TooltipContent>
          </Tooltip>
        ) : (
          'عدم موجودی'
        )}
      </div>
    </>
  );
}
