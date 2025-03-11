import { Profile2User } from 'iconsax-react';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {
  fullname: string;
};

// --------------------------------------------

export default function DUserProfileTrigger(props: Props) {
  const { fullname } = props;

  return (
    <button className="bg-zinc-200/50 px-4 flex-center gap-2 rounded-cs-10 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80">
      <span className="max-w-24 truncate hidden xl:block">
        {fullname ? <span>{fullname}</span> : <span>کاربر محترم</span>}
      </span>

      <Profile2User size={19} color="#292D32" className="xl:hidden" />
      <IoIosArrowBack
        size={14}
        className={`text-zinc-600 hidden transition-all duration-300 ease-in-out xl:block`}
      />
    </button>
  );
}
