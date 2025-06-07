// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Sheet from '../ui/sheet';
import { Button } from '@/components/ui/button';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import toast from '../ui/customSonner/toast';

// Defining a fake constant to render fake data of files
const files: {
  name: string;
  size: number; // In Bytes, Number * 1024 * 1024
}[] = [
  {
    name: 'IMG.Random File.png1',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png2',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png3',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png4',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png5',
    size: 10 * 1024 * 1024,
  },
];

// Creating and exporting UploadSheet component as default
export default function UploadSheet(): ReactNode {
  // Defining states of component
  const [dataToRender, setDataToRender] = useState<typeof files>(files);
  const [isSheetOpened, setSheetOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <>
      <Button
        className='bg-white border border-black/10 lg:rounded-lg h-[40px] rounded-[8px] flex items-center justify-center lg:py-3 py-0 lg:px-5 px-[10px] hover:bg-gray-50'
        onClick={() => setSheetOpened(true)}
      >
        <span className='font-normal text-black/60 truncate block w-full text-center lg:text-xs text-[10px]'>
          مشاهده تمام فایل
        </span>
      </Button>
      <Sheet isOpened={isSheetOpened} closeFn={() => setSheetOpened(false)}>
        <div className='flex items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-gray-200'>
          <span className='text-right font-medium text-cs07 block w-full truncate overflow-hidden'>
            لیست فایل های آپلود شده
          </span>
          <Button className='bg-white border border-black/10 rounded-lg flex items-center justify-center px-3 py-2 hover:bg-gray-50 shrink-0'>
            <IconsaxIcons className='w-3 h-3 text-black/60' name='Add' />
            <span className='font-normal text-black/60 truncate block w-full text-center text-xs'>
              مشاهده تمام فایل
            </span>
          </Button>
        </div>
        <div className='flex flex-col'>
          {dataToRender.length !== 0 ? (
            dataToRender.map((item, index) => (
              <div
                key={index}
                className={
                  index + 1 === files.length
                    ? 'pt-3'
                    : 'py-3 border-b border-b-gray-400'
                }
              >
                <div className='flex items-center justify-between gap-3 mb-3'>
                  <span className='text-cs07 font-normal text-black truncate block w-full overflow-hidden text-right'>
                    {`${index + 1} فایل شماره`}
                  </span>
                  <div className='flex items-center justify-between gap-3'>
                    <Button
                      onClick={() => {
                        setDataToRender((data) =>
                          data.filter(
                            (filterItem) => filterItem.name !== item.name,
                          ),
                        );

                        toast({
                          title: 'فایل پاک شد!',
                          description: `فایل شماره ${index + 1} شما با موفقیت پاک شد.`,
                        });
                      }}
                      className={
                        'transition-all duration-500 rounded-md gap-2 flex items-center justify-center p-3 text-cs-red bg-cs-red/10 hover:bg-cs-red/20 shrink-0 h-[30px] w-[30px]'
                      }
                    >
                      <IconsaxIcons
                        name={'Trash'}
                        color='currentColor'
                        className='w-[10px] h-[10px]'
                      />
                    </Button>
                    <Button className='bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-50 shrink-0 h-[30px]'>
                      <span className='font-normal text-black/60 truncate block w-full text-center text-cs07'>
                        مشاهده فایل
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between gap-3 mb-2'>
                  <span className='font-normal text-black/60 truncate block w-full text-right text-cs07'>
                    اسم فایل :
                  </span>
                  <span className='font-normal text-black truncate block w-full text-left text-cs07'>
                    {item.name}
                  </span>
                </div>
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-normal text-black/60 truncate block w-full text-right text-cs07'>
                    حجم فایل آپلودی :
                  </span>
                  <span className='font-normal text-black truncate block w-full text-left text-cs07'>
                    {`${item.size / (1024 * 1024)} MB`}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className='mt-3'>
              <span className='font-bold text-cs75 text-center text-black w-full block'>
                چیزی برای نمایش وجود ندارد.
              </span>
            </div>
          )}
        </div>
      </Sheet>
    </>
  );
}
