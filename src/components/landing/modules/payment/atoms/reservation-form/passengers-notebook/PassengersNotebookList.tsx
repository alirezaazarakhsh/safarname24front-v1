import Link from 'next/link';
import loader from '@/styles/loader.module.css';

import { VscError } from 'react-icons/vsc';
import { FaRegLightbulb } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

type Props = {
  isEmpty: boolean;
  children: React.ReactNode;
  status: 'pending' | 'error' | 'success';
};

// ------------------------------

export function PassengersNotebookList(props: Props) {
  const { status, children, isEmpty } = props;

  return (
    <div className="-mx-6 px-6 divide-y divide-dashed overflow-auto custom-scrollbar">
      {status === 'pending' ? (
        <div className="flex-center h-full">
          <span className={loader.dots} style={{ scale: '1.2' }} />
        </div>
      ) : status === 'error' ? (
        <div className="h-full -mt-20 flex flex-col items-center justify-center gap-4">
          <VscError color="#444" size={50} />
          <p className="text-zinc-800 text-cs85 font-bold">
            در نمایش اطلاعات مسافران خطایی رخ داده است !
          </p>
        </div>
      ) : isEmpty ? (
        <div className="h-full -mt-20 px-10 flex flex-col items-center justify-center">
          <FaRegLightbulb color="#444" size={50} />
          <p className="text-zinc-800 text-cs85 font-bold mt-6 mb-1">
            لیست مسافران شما خالی میباشد !
          </p>

          <p className="text-zinc-500 text-cs08/6 text-center font-semibold">
            برای مدیریت مسافران از صفحه "مسافران من" در پنل کاربری خود اقدام
            نمایید .
          </p>

          <div className="w-full my-5 border-b border-dashed" />

          <Link
            href={'/dashboard/passengers'}
            className="bg-zinc-100 text-zinc-500 text-cs85 font-semibold px-5 py-2 flex-center gap-1.5 border rounded-lg"
          >
            <HiExternalLink color="#888" size={20} />
            مسافران من
          </Link>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
