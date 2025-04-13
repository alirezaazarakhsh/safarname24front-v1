import { Forbidden2 } from 'iconsax-react';

type Props = {
  tips: string;
};

// -----------------------------------------

export function EssentialTips(props: Props) {
  const { tips } = props;
  if (!tips) return null;

  return (
    <div className="bg-white p-5 border-2 border-zinc-200 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 flex-center border-2 border-zinc-200 rounded-md">
          <Forbidden2 size={20} color="#444" />
        </div>

        <span className="text-zinc-800 text-cs85 font-extrabold lg:text-cs09">
          نکات ضروری
        </span>
      </div>

      <p className="text-zinc-600 text-cs75/6 text-justify font-semibold overflow-hidden">
        {tips}
      </p>
    </div>
  );
}
