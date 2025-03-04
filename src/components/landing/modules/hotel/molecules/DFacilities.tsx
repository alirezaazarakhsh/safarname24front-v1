'use client';

import { useState } from 'react';
import { ICArrowLeft } from '@/components/icons';

type FacilitiesType = 'welfare' | 'room';

type Props = {
  facilities: {
    all: { welfare: string[]; room: string[] };
    main: string[];
    categorized: { title: string; items: string[] }[];
  };
};

// ---------------------------------------

const sharedStyle = 'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

export default function DFacilities(props: Props) {
  const { facilities } = props;

  const [facilitiesType, setFacilitiesType] = useState<FacilitiesType>('welfare');

  return (
    <div className='hidden md:block'>
      {/* Switch-Case */}
      <div className='absolute top-0 left-0 z-10 bg-zinc-200/60 w-80 h-10 text-cs75 font-semibold flex gap-2 overflow-hidden rounded-lg'>
        <button
          className={`${sharedStyle} ${facilitiesType === 'welfare' ? 'text-white' : 'text-zinc-700'}`}
          onClick={() => setFacilitiesType('welfare')}
        >
          امکانات رفاهی و تفریحی
        </button>

        <button
          className={`${sharedStyle} ${facilitiesType === 'room' ? 'text-white' : 'text-zinc-700'}`}
          onClick={() => setFacilitiesType('room')}
        >
          امکانات داخل اتاق
        </button>

        <div
          className={`absolute inset-y-0 -z-10 w-1/2 bg-[#4B5BCE] transition-all duration-300 ease-in-out rounded-lg ${
            facilitiesType === 'welfare' ? 'right-0' : 'right-1/2'
          }`}
        ></div>
      </div>

      {/* Content | Pagination  */}
      <div className='bg-white p-6 flex border-2 border-zinc-200 rounded-2xl'>
        <div className='flex-1 grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5'>
          {facilities.all[facilitiesType]?.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div className='w-[1.1rem] h-[1.1rem] flex-center lg:w-5 lg:h-5'>
                <svg width='27' height='27' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M16.875 25.5938H10.125C4.01625 25.5938 1.40625 22.9837 1.40625 16.875V10.125C1.40625 4.01625 4.01625 1.40625 10.125 1.40625H16.875C22.9837 1.40625 25.5938 4.01625 25.5938 10.125V16.875C25.5938 22.9837 22.9837 25.5938 16.875 25.5938ZM10.125 3.09375C4.93875 3.09375 3.09375 4.93875 3.09375 10.125V16.875C3.09375 22.0613 4.93875 23.9062 10.125 23.9062H16.875C22.0613 23.9062 23.9062 22.0613 23.9062 16.875V10.125C23.9062 4.93875 22.0613 3.09375 16.875 3.09375H10.125Z'
                    fill='#2B2B2B'
                  />
                  <path
                    d='M11.9016 17.5273C11.6766 17.5273 11.4629 17.4373 11.3054 17.2798L8.12164 14.0961C7.79539 13.7698 7.79539 13.2298 8.12164 12.9036C8.44789 12.5773 8.98789 12.5773 9.31414 12.9036L11.9016 15.4911L17.6841 9.70855C18.0104 9.3823 18.5504 9.3823 18.8766 9.70855C19.2029 10.0348 19.2029 10.5748 18.8766 10.9011L12.4979 17.2798C12.3404 17.4373 12.1266 17.5273 11.9016 17.5273Z'
                    fill='#2B2B2B'
                  />
                </svg>
              </div>

              <span className='text-zinc-700 text-cs75 font-bold lg:text-cs08'>{item}</span>
            </div>
          ))}
        </div>

        <div className='w-8 flex flex-col'>
          <button className='bg-zinc-100 w-8 h-8 flex-center rounded-md'>
            <ICArrowLeft className='rotate-90' />
          </button>

          <button className='bg-zinc-100 w-8 h-8 mt-auto flex-center rounded-md'>
            <ICArrowLeft className='-rotate-90' />
          </button>
        </div>
      </div>
    </div>
  );
}
