import Link from 'next/link';
import Image from 'next/image';

// --------------------------

export default function NotFound() {
  return (
    <main className="max-w-screen-template min-h-dvh mx-auto flex flex-col justify-center items-center lg:min-h-[70dvh]">
      <span className="text-lg font-bold lg:text-xl">مشکلی رخ داده است !</span>

      <p className="text-zinc-600 text-cs85 font-semibold mt-2 mb-10 lg:text-cs09">
        متاسفانه صفحه مورد نظر یافت نشد , لطفا مجدد تلاش فرمایید
      </p>

      <Image
        alt="404"
        width={3900}
        height={1700}
        src={'/image/logo/404.png'}
        className="w-full max-w-[30rem] object-contain"
      />

      <Link
        href={'/'}
        className="w-max h-12 text-cs08 font-semibold px-6 mt-12 flex-center gap-3 border-2 border-zinc-500 rounded-full"
      >
        <span>بازگشت به صفحه</span>

        <svg
          width="35"
          height="35"
          className="w-6 h-6 mb-0.5"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.19922 14.9485L24.6444 14.9485C26.9413 14.9485 28.8034 16.8106 28.8034 19.1075L28.8034 20.6332C28.8034 22.9302 26.9413 24.7922 24.6444 24.7922L10.2096 24.7922"
            stroke="#0D0E11"
            strokeWidth="2.08134"
            strokeLinejoin="round"
          />
          <path
            d="M9.84766 10.5754C8.13911 12.284 7.1812 13.2419 5.47266 14.9504L9.84766 19.3254"
            stroke="#0D0E11"
            strokeWidth="2.08134"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </main>
  );
}
