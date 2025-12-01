// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { filterType, SearchFinancialDashboardPropsType, typeFilterType } from '@/types/dashboard/component';
import * as DropDown from '@/components/ui/dropdown-menu';
import { ReactNode, useEffect, useState } from 'react';
import IconInput from '../ui/iconInput';

// Defining variables
const filters: {
  label: string;
  value: filterType;
}[] = [
    {
      label: "همه",
      value: "all"
    },
    {
      label: "قدیمی ترین",
      value: "oldest"
    },
    {
      label: "جدید ترین",
      value: "newest"
    },
    {
      label: "بیشترین قیمت",
      value: "most-price"
    },
    {
      label: "کمترین قیمت",
      value: "least-price"
    }
  ];

const typeFilter: {
  label: string;
  value: typeFilterType
}[] = [{
  label: "همه",
  value: "all"
}, {
  label: "برداشت وجه",
  value: "withdrawal"
}, {
  label: "افزایش کیف پول",
  value: "wallet_increase",
}, {
  value: "card_to_card",
  label: "کارت به کارت"
}]

// Creating and exporting Search component/section of financial factors page as default
export default function Search({
  onChange,
  hideInput = false,
  loading = false,
  onFilterChange,
  onTypeFilterChange
}: SearchFinancialDashboardPropsType): ReactNode {
  // Defining hooks
  const [filterState, setFilterState] = useState<filterType>("all");
  const [typeFilterState, setTypeFilterState] = useState<typeFilterType>("all");
  const [openedDropdown, setOpenedDropdown] = useState<"filter" | "typefilter" | undefined>(undefined);

  // Appending filter changing props to this component
  useEffect(() => {
    onFilterChange?.(filterState);
    onTypeFilterChange?.(typeFilterState);
  }, [filterState, typeFilterState])

  // Returning JSX
  return (
    <div className='flex items-center justify-between gap-3 lg:w-auto w-full'>
      <span className='lg:block hidden truncate text-right w-full font-bold text-cs85 text-black'>
        لیست ریز گزارشات
      </span>
      {
        !hideInput && (
          <div className='flex items-center justify-end gap-2 w-full'>
            <IconInput
              wholeClassName='lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100 lg:w-auto w-full'
              icon='SearchStatus'
              className='lg:h-10 h-[45px] lg:w-[200px] w-full'
              placeholder='جست و جوی ریز گزارشات'
              onChange={({ currentTarget: { value } }) => onChange?.(value)}
            />
            <DropDown.DropdownMenu open={openedDropdown === "filter"} onOpenChange={(open) => open ? setOpenedDropdown("filter") : setOpenedDropdown(undefined)}>
              <DropDown.DropdownMenuTrigger asChild>
                <button className='lg:h-10 h-[45px] px-5 font-normal text-cs75 rounded-md lg:bg-white shrink-0 bg-gray-100 lg:hover:bg-white hover:bg-gray-100 w-fit'>
                  فیلتر
                </button>
              </DropDown.DropdownMenuTrigger>
              <DropDown.DropdownMenuContent
                className="w-[200px] rounded-[8px]"
                align="start"
              >
                {
                  filters.map((item, index) => (
                    <DropDown.DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      key={index}
                      asChild
                      data-active={filterState === item.value}
                      className="p-3 bg-white transition-all duration-500 text-gray-600 block w-full cursor-pointer data-[highlighted]:bg-cs-red/10 data-[highlighted]:text-cs-red data-[active=true]:bg-cs-red/10 data-[active=true]:text-cs-red"
                      onClick={() => {
                        setFilterState(item.value);
                        setOpenedDropdown(undefined);
                      }}
                    >
                      <button>
                        <span className="text-cs08 font-semibold text-current text-right truncate block">
                          {item.label}
                        </span>
                      </button>
                    </DropDown.DropdownMenuItem>
                  ))
                }
              </DropDown.DropdownMenuContent>
            </DropDown.DropdownMenu>

            <DropDown.DropdownMenu open={openedDropdown === "typefilter"} onOpenChange={(open) => open ? setOpenedDropdown("typefilter") : setOpenedDropdown(undefined)}>
              <DropDown.DropdownMenuTrigger asChild>
                <button className='lg:h-10 h-[45px] px-5 font-normal text-cs75 rounded-md lg:bg-white shrink-0 bg-gray-100 lg:hover:bg-white hover:bg-gray-100 w-fit'>
                  فیلتر بر اساس نوع خدمت
                </button>
              </DropDown.DropdownMenuTrigger>
              <DropDown.DropdownMenuContent
                className="w-[200px] rounded-[8px]"
                align="start"
              >
                {
                  typeFilter.map((item, index) => (
                    <DropDown.DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      key={index}
                      asChild
                      data-active={typeFilterState === item.value}
                      className="p-3 bg-white transition-all duration-500 text-gray-600 block w-full cursor-pointer data-[highlighted]:bg-cs-red/10 data-[highlighted]:text-cs-red data-[active=true]:bg-cs-red/10 data-[active=true]:text-cs-red"
                      onClick={() => {
                        setTypeFilterState(item.value);
                        setOpenedDropdown(undefined);
                      }}
                    >
                      <button>
                        <span className="text-cs08 font-semibold text-current text-right truncate block">
                          {item.label}
                        </span>
                      </button>
                    </DropDown.DropdownMenuItem>
                  ))
                }
              </DropDown.DropdownMenuContent>
            </DropDown.DropdownMenu>
          </div>
        )
      }
    </div>
  );
}
