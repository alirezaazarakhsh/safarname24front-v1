import Link from 'next/link';

// --------------------------------------------

export default function RulesAndRegulation() {
  return (
    <div className="text-zinc-700 text-cs08 font-bold mb-3 flex gap-1 md:mt-auto md:items-center">
      <span>ورود شما به منزله موافقت با</span>
      <Link href={'/rules'} className="text-cs-red hover:underline">
        قوانین و مقررات
      </Link>
      <span>است .</span>
    </div>
  );
}
