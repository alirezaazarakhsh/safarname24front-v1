'use client';

import { useMediaQuery } from '@/hooks';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ICSquareCheck } from '@/components/icons';

type Props = {
  hotelName: string;
  facilities: {
    all: { welfare: string[]; room: string[] };
    main: string[];
    categorized: { title: string; items: string[] }[];
  };
};

// ---------------------------------------

export default function MFacilities(props: Props) {
  const { facilities, hotelName } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) return null;

  return (
    <div className='bg-white border-2 border-zinc-200 rounded-xl lg:hidden'>
      {/* Main-Content */}
      <div className='p-5 grid gap-3 md:grid-cols-2'>
        {facilities.main?.map((item, index) => (
          <div key={index} className='flex items-center gap-3'>
            <ICSquareCheck className='w-5 h-5' />
            <span className='text-zinc-700 text-cs08 font-bold'>{item}</span>
          </div>
        ))}
      </div>

      {/* Full-Content */}
      <Dialog>
        <DialogTrigger className='w-full h-12 px-5 flex items-center gap-2 border-t-2'>
          <span className='text-[#4B5BCE] text-cs75 font-semibold'>مشاهده امکانات بیشتر</span>

          <div className='w-5 h-5 flex-center'>
            <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M7.5762 4.10062C7.72662 4.10062 7.87703 4.15603 7.99578 4.27478C8.22537 4.50437 8.22537 4.88437 7.99578 5.11395L3.60995 9.49978L7.99578 13.8856C8.22536 14.1152 8.22536 14.4952 7.99578 14.7248C7.7662 14.9544 7.3862 14.9544 7.15661 14.7248L2.3512 9.91937C2.12161 9.68978 2.12161 9.30978 2.3512 9.0802L7.15662 4.27478C7.27537 4.15603 7.42578 4.10062 7.5762 4.10062Z'
                fill='#4350E0'
              />
              <path
                d='M2.90477 8.90625L16.2285 8.90625C16.5531 8.90625 16.8223 9.17542 16.8223 9.5C16.8223 9.82458 16.5531 10.0937 16.2285 10.0937L2.90477 10.0937C2.58018 10.0937 2.31102 9.82458 2.31102 9.5C2.31102 9.17542 2.58018 8.90625 2.90477 8.90625Z'
                fill='#4350E0'
              />
            </svg>
          </div>
        </DialogTrigger>

        <DialogContent
          className='max-w-full full-size px-6 pt-28 pb-12 rounded-none 
            inset-0 translate-x-0 translate-y-0
          data-[state=closed]:fade-out-100 
          data-[state=open]:fade-in-100
          data-[state=closed]:zoom-out-100 
          data-[state=open]:zoom-in-100 
          data-[state=closed]:slide-out-to-right-full 
          data-[state=closed]:slide-out-to-top-0 
          data-[state=open]:slide-in-from-right-full 
          data-[state=open]:slide-in-from-top-0 
          data-[state=closed]:duration-700 
          data-[state=open]:duration-700'
        >
          <DialogTitle className='hidden'></DialogTitle>
          <DialogDescription className='hidden'></DialogDescription>

          <div className='pl-6 flex flex-col gap-8 overflow-auto custom-scrollbar'>
            {/* Navbar */}
            <div className='fixed top-0 inset-x-0 bg-white h-20 px-6 text-cs08 flex items-center gap-1 shadow-[0_0_1.5rem_rgba(0,0,0,0.05)]'>
              <DialogClose className='w-5 h-5 flex-center ml-3'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M14.4291 18.8201C14.2391 18.8201 14.0491 18.7501 13.8991 18.6001C13.6091 18.3101 13.6091 17.8301 13.8991 17.5401L19.4391 12.0001L13.8991 6.46012C13.6091 6.17012 13.6091 5.69012 13.8991 5.40012C14.1891 5.11012 14.6691 5.11012 14.9591 5.40012L21.0291 11.4701C21.3191 11.7601 21.3191 12.2401 21.0291 12.5301L14.9591 18.6001C14.8091 18.7501 14.6191 18.8201 14.4291 18.8201Z'
                    fill='#0C0C0C'
                  />
                  <path
                    d='M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z'
                    fill='#0C0C0C'
                  />
                </svg>
              </DialogClose>

              <span className='font-bold'>امکانات و ویژگی ها</span>
              <span className='text-zinc-500 font-semibold'>({hotelName})</span>
            </div>

            {/* Main-Content */}
            <div className='bg-zinc-100/50 p-5 grid gap-3 rounded-xl'>
              {facilities.main?.map((item, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <ICSquareCheck className='w-5 h-5' />
                  <span className='text-zinc-600 text-cs08 font-bold'>{item}</span>
                </div>
              ))}
            </div>

            {/* Categorized-Content */}
            <div className='grid gap-10 rounded-xl'>
              {facilities.categorized?.map((item, index) => (
                <div key={index}>
                  <div className='text-cs08 font-bold pb-3 mb-4 border-b'>{item.title}</div>

                  <div className='grid gap-3'>
                    {item.items.map((item, index) => (
                      <div key={index} className='flex items-center gap-3'>
                        <ICSquareCheck className='w-5 h-5' />
                        <span className='text-zinc-600 text-cs75 font-bold'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
