import { VscError } from 'react-icons/vsc';

// ------------------------------

export function Error() {
  return (
    <div className="bg-white h-[30rem] p-5 flex flex-col items-center justify-center gap-3 border rounded-xl">
      <VscError size={40} color="#444" />
      <p className="text-zinc-600 text-cs85 font-semibold">
        متاسفانه در واکشی اطلاعات فرم مشکلی رخ داده است !
      </p>

      <button
        className="bg-zinc-100/50 text-zinc-600 text-cs08 font-semibold px-4 py-2 mt-4 border rounded-lg"
        onClick={() => window.location.reload()}
      >
        بارگذاری مجدد
      </button>
    </div>
  );
}
