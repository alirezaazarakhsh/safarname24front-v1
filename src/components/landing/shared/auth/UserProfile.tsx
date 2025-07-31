'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { Profile2User } from 'iconsax-react';
import { IoIosArrowBack } from 'react-icons/io';

import LogoutButton from './molecules/user-profile/LogoutButton';
import UserProfileItem from './molecules/user-profile/UserProfileItem';

type Props = {
  userName?: string;
};

// --------------------------------------------

export default function UserProfile(props: Props) {
  const { userName = 'کاربر گرامی' } = props;
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="bg-zinc-200/50 px-4 flex-center gap-2 rounded-cs-10 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80">
        <span className="max-w-24 truncate hidden xl:block">{userName}</span>

        <Profile2User size={19} color="#292D32" className="xl:hidden" />
        <IoIosArrowBack
          size={14}
          className={`text-zinc-600 hidden transition-all xl:block ${isOpen ? '-rotate-90' : ''}`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-48 mt-2 hidden rounded-lg shadow-[0_1rem_1rem_rgba(0,0,0,0.05)] lg:grid"
      >
        <div
          dir={'rtl'}
          className="text-zinc-800 text-cs75 font-bold px-4 py-3 pt-3.5 truncate border-b"
        >
          {userName}
        </div>

        <div dir="rtl" className="grid divide-y divide-zinc-100/80">
          <UserProfileItem
            href="/dashboard/profile"
            type="link"
            title="اطلاعات حساب کاربری"
            handleCloseModal={() => setOpen(false)}
          />

          <UserProfileItem
            href="/"
            type="link"
            title="درخواست پشتیبانی"
            handleCloseModal={() => setOpen(false)}
          />

          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
