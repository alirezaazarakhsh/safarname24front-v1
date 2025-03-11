import { useState } from 'react';
import { Profile2User } from 'iconsax-react';
import { IoIosArrowBack } from 'react-icons/io';

import { useMediaQuery } from '@/hooks';
import LogoutButton from './molecules/user-profile/LogoutButton';
import UserProfileItem from './molecules/user-profile/UserProfileItem';

import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from '@/components/ui/drawer';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  userFullName: string;
};

// --------------------------------------------

export default function UserProfile(props: Props) {
  const { userFullName } = props;

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const handleCloseDropdown = () => setDropdownOpen(false);
  const [dropdownIsOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {!isDesktop ? (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={dropdownIsOpen} onOpenChange={setDropdownOpen}>
            <DrawerTrigger className="flex flex-col items-center gap-1.5 lg:hidden">
              <Profile2User size={19} color="#292D32" className="xl:hidden" />
              <span className="text-zinc-400 text-cs65 font-bold">
                پروفایل کاربری
              </span>
            </DrawerTrigger>

            <DrawerContent className="lg:hidden">
              <DrawerTitle className="hidden"></DrawerTitle>
              <DrawerDescription className="hidden"></DrawerDescription>

              {/* User-FullName */}
              <div
                dir={'rtl'}
                className="text-zinc-800 text-cs09 font-extrabold pb-3 mb-2 border-b"
              >
                {userFullName ? (
                  <span>{userFullName}</span>
                ) : (
                  <span>کاربر محترم</span>
                )}
              </div>

              {/* Profile-Items */}
              <div dir="rtl" className="grid divide-y divide-zinc-100/80">
                <UserProfileItem
                  href="/"
                  type="link"
                  title="اطلاعات حساب کاربری"
                  handleCloseModal={handleCloseDropdown}
                />

                <UserProfileItem
                  href="/"
                  type="link"
                  title="درخواست پشتیبانی"
                  handleCloseModal={handleCloseDropdown}
                />

                <LogoutButton />
              </div>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          {/* DropDownMenu (Large-Device) */}
          <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger className="bg-zinc-200/50 px-4 flex-center gap-2 rounded-cs-10 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80">
              <span className="max-w-24 truncate hidden xl:block">
                {userFullName ? (
                  <span>{userFullName}</span>
                ) : (
                  <span>کاربر محترم</span>
                )}
              </span>

              <Profile2User size={19} color="#292D32" className="xl:hidden" />
              <IoIosArrowBack
                size={14}
                className={`text-zinc-600 hidden transition-all duration-300 ease-in-out xl:block ${dropdownIsOpen ? '-rotate-90' : ''}`}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-48 mt-2 hidden rounded-lg shadow-[0_1rem_1rem_rgba(0,0,0,0.05)] lg:grid"
            >
              {/* User-FullName */}
              <div
                dir={'rtl'}
                className="text-zinc-800 text-cs75 font-bold px-4 py-3 pt-3.5 truncate border-b"
              >
                {userFullName ? (
                  <span>{userFullName}</span>
                ) : (
                  <span>کاربر محترم</span>
                )}
              </div>

              {/* Profile-Items */}
              <div dir="rtl" className="grid divide-y divide-zinc-100/80">
                <UserProfileItem
                  href="/"
                  type="link"
                  title="اطلاعات حساب کاربری"
                  handleCloseModal={handleCloseDropdown}
                />

                <UserProfileItem
                  href="/"
                  type="link"
                  title="درخواست پشتیبانی"
                  handleCloseModal={handleCloseDropdown}
                />

                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
