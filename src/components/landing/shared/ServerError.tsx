import Image from 'next/image';

// ------------------------------

export function ServerError() {
  return (
    <main className="max-w-screen-template min-h-dvh px-5 mx-auto flex flex-col justify-center items-center">
      <Image
        width={1000}
        height={440}
        alt="servererror"
        src={'/image/logo/server-error.png'}
        className="w-full max-w-[40rem] mb-8 object-contain"
      />

      <p className="text-lg font-bold lg:text-xl">خطایی رخ داده است !</p>

      <p className="text-zinc-600 text-cs85 font-semibold mt-2 mb-6 lg:text-cs09">
        متاسفانه مشکلی در سرور سفرنامه 24 بوجود آمده است
      </p>

      <button
        onClick={() => window.location.reload()}
        className="text-zinc-800 text-cs85 font-semibold px-6 py-2.5 border-2 border-zinc-800 rounded-full"
      >
        تلاش مجدد
      </button>
    </main>
  );
}
