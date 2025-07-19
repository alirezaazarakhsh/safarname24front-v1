import { EmptyWallet } from 'iconsax-react';

// ------------------------------

export function WalletBallance() {
  return (
    <div className="bg-white text-cs85 p-4 flex-between border-2 rounded-xl">
      <div className="flex items-center gap-2">
        <EmptyWallet color="#444" size={20} />
        <span className="font-bold">موجودی کیف پول شما :</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-extrabold">10,000,000</span>
        <span className="text-zinc-500 text-cs08 font-semibold">تومان</span>
      </div>
    </div>
  );
}
