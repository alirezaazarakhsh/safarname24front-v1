import Link from 'next/link';

// --------------------------------------------

export default function RulesAndRegulation() {
  return (
    <div className="text-zinc-700 text-cs65 font-bold mt-auto mb-3 flex-center gap-1">
      <span>ورود شما به منزله موافقت با</span>
      <Link href={'/'} className="text-cs-red hover:underline">
        قوانین و مقررات
      </Link>
      <span>است .</span>
    </div>
  );
}
