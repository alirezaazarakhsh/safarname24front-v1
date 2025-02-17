// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ReactNode } from "react";
import * as DropDown from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ICChevronBottom } from "@/components/icons/ICChevronBottom";
import AvatarImage from "../../../../public/image/profile/1.webp";
import { ICWallet } from "@/components/icons/ICWallet";

// Creating and exporting ProfileDropdown component as defualt
export default function ProfileDropdown(): ReactNode {
  // Returning JSX
  return (
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
      <DropDown.DropdownMenuContent className="shadow-none">
        <DropDown.DropdownMenuLabel className="flex items-center justify-center gap-3 p-3 text-black">
          <span className="truncate block text-sm font-medium text-current">
            حساب شما صفر میباشد!
          </span>
          <ICWallet className="w-5 h-5 text-current shrink-0" />
        </DropDown.DropdownMenuLabel>
        <DropDown.DropdownMenuSeparator className="mx-3 mb-3" />
        <DropDown.DropdownMenuItem
          asChild
          className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
        >
          <button>
            <span className="text-sm font-normal text-current text-right truncate block">
              ویرایش پروفایل
            </span>
          </button>
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem
          asChild
          className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
        >
          <button>
            <span className="text-sm font-normal text-current text-right truncate block">
              شارژ کیف پول
            </span>
          </button>
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem
          asChild
          className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
        >
          <button>
            <span className="text-sm font-normal text-current text-right truncate block">
              خروج از حساب
            </span>
          </button>
        </DropDown.DropdownMenuItem>
      </DropDown.DropdownMenuContent>
    </DropDown.DropdownMenu>
  );
}
