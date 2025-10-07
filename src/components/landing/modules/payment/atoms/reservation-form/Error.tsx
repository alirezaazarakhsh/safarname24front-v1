import { VscError } from 'react-icons/vsc';

// ------------------------------

export function Error() {
  return (
    <div className="bg-white h-[30rem] p-5 flex flex-col items-center justify-center gap-4 border rounded-xl">
      <VscError size={40} color="#f30f26" />
      <p className="text-cs-red text-cs85 font-semibold">
        متاسفانه در نمایش اطلاعات اتاق ها خطایی رخ داده است !
      </p>
    </div>
  );
}
