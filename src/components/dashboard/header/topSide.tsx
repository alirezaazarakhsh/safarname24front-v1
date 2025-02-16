// Importing part
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../../public/image/logo/logo-white.png";
import AvatarImage from "../../../../public/image/profile/1.webp";
import { ICLogOut } from "@/components/icons/IcLogOut";
import { ICNotificationStatus } from "@/components/icons/ICNotifcationStatus";
import { ICChevronBottom } from "@/components/icons/ICChevronBottom";
import * as DropDown from "@/components/ui/dropdown-menu";

// Creating and exporting TopSide component of header as default
export default function TopSide(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white border-b border-b-black/20">
      <div className="p-5 max-w-screen-template mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link
            href="/"
            className="flex w-12 h-12 bg-cs-red rounded-lg overflow-hidden shrink-0"
          >
            <Image
              width={100}
              height={100}
              alt={"سفرنامه 24"}
              src={LogoImage.src}
              className="aspect-square object-cover w-full h-full"
            />
          </Link>
          <div>
            <span className="font-bold text-cs75 text-black block truncate mb-1">
              سفرنامه 24
            </span>
            <span className="font-bold text-cs75 text-black block truncate">
              Agency Safarnameh 24
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="aspect-square w-12 h-12 bg-cs-red/10 transition-all duration-500 hover:bg-cs-red/20 text-cs-red rounded-lg flex items-center justify-center">
            <ICLogOut className="w-5 h-5 text-current" />
          </button>
          <Link
            href="/dashboard/notifications"
            className="flex h-12 px-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 text-gray-700 items-center justify-center gap-2 rounded-lg"
          >
            <ICNotificationStatus className="w-5 h-5 text-current shrink-0" />
            <span className="font-medium text-cs08 text-current block truncate w-full">
              اعلان ها
            </span>
          </Link>
          <DropDown.DropdownMenu>
            <DropDown.DropdownMenuTrigger asChild>
              <button className="flex items-center justify-start gap-2 w-[200px] overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  alt={"عکس پروفایل شما"}
                  src={AvatarImage.src}
                  className="aspect-square object-cover w-12 h-12 rounded-lg overflow-hidden shrink-0"
                />
                <div className="w-full overflow-hidden">
                  <div className="mb-1 flex items-center justify-start gap-3 text-black">
                    <span className="font-bold text-cs75 text-current block truncate w-full text-right">
                      علیرضا آذرخش عزیز!
                    </span>
                    <ICChevronBottom className="w-3 h-3 shrink-0 text-current" />
                  </div>
                  <span className="font-bold text-cs75 text-gray-500 block truncate text-right">
                    Alirezaazarakhsh@gmail.com
                  </span>
                </div>
              </button>
            </DropDown.DropdownMenuTrigger>
            <DropDown.DropdownMenuContent>
              <DropDown.DropdownMenuLabel className="flex items-center justify-center gap-2 text-red-600">
                <span className="text-center truncate block">kjjk</span>
                <ICChevronBottom className="w-3 h-3 text-current shrink-0" />
              </DropDown.DropdownMenuLabel>
              <DropDown.DropdownMenuSeparator />
              <DropDown.DropdownMenuItem asChild>
                <button
                  className="px-3 py-5 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full"
                  dir="rtl"
                >
                  <span className="text-xs font-normal text-current truncate">
                    ویرایش پروفایل
                  </span>
                </button>
              </DropDown.DropdownMenuItem>
            </DropDown.DropdownMenuContent>
          </DropDown.DropdownMenu>
        </div>
      </div>
    </div>
  );
}
