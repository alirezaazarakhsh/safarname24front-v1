// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { FilterFavPageComponentPropsTypeOrginal } from '@/types/dashboard/component';
import AddNewCollectionDialog from './dialog/addNewCollection';

// Creating and exporting Filter component/section of Favorites page as default
export default function Filter({
  deleteState,
  setDeleteState,
}: FilterFavPageComponentPropsTypeOrginal): ReactNode {
  // Defining states of component
  const [addNewCollectionOpened, setAddNewCollectionOpened] =
    useState<boolean>(false);

  // Returning JSX
  return (
    <div className="lg:flex block items-center justify-between gap-3 lg:w-auto w-full">
      <AddNewCollectionDialog
        isOpened={addNewCollectionOpened}
        closeFn={() => setAddNewCollectionOpened(false)}
      />
      <span className="block truncate text-right w-full lg:font-bold font-semibold lg:text-cs85 text-[12px] text-black lg:mb-0 mb-[12px]">
        لیست مورد علاقه ها
      </span>
      <div
        className={
          'flex items-center justify-end lg:gap-3 gap-[10px] lg:w-auto w-full'
        }
      >
        <button
          className="flex items-center justify-center lg:gap-2 gap-[12px] bg-cs-red/10 lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-cs-red col-span-2 transition-all duration-500 hover:bg-cs-red/20 lg:w-auto w-[50%]"
          onClick={() => setDeleteState((prev) => !prev)}
        >
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            {deleteState ? 'بازگشت به حالت اولیه' : 'حذف لیست مورد علاقه'}
          </span>
        </button>
        <button
          className="flex items-center justify-center lg:gap-2 gap-[12px] bg-white lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-black/50 border border-black/10 col-span-2 transition-all duration-500 hover:bg-black/5 lg:w-auto w-[50%]"
          onClick={() => setAddNewCollectionOpened(true)}
        >
          <IconsaxIcons
            name="Add"
            className="lg:w-4 lg:h-4 w-[20px] h-[20px] shrink-0"
            color="currentColor"
          />
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            ثبت لیست جدید
          </span>
        </button>
      </div>
    </div>
  );
}
