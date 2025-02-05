import Image from 'next/image';

type Props = {
  src: [];
};

// ------------------------------------------------

export function Gallery(props: Props) {
  const { src } = props;

  return (
    <div className='grid gap-4 lg:grid-cols-2 lg:gap-6'>
      <div className='h-72 grid grid-cols-2 grid-rows-2 gap-4 lg:h-96 lg:grid-rows-[1.8fr_1fr] lg:gap-6'>
        <div className='overflow-hidden rounded-xl'>
          <Image
            src={'/image/background/about-us/gallery-1.png'}
            alt='about-us-gallery'
            width={400}
            height={200}
            className='full-size object-cover'
          />
        </div>

        <div className='overflow-hidden rounded-xl'>
          <Image
            src={'/image/background/about-us/gallery-2.png'}
            alt='about-us-gallery'
            width={400}
            height={200}
            className='full-size object-cover'
          />
        </div>

        <div className='bg-[#E2E6F8] text-[#4B5BCE] px-6 col-start-1 col-end-3 flex flex-col justify-center gap-3 rounded-xl'>
          <span className='text-xl font-black lg:text-2xl'>خلق تجربه ی مدرن و پایدار سفر</span>

          <span className='text-cs08 font-extrabold lg:text-cs09'>با هتل هایی همچون لوکس و آرامش بخش !</span>
        </div>
      </div>

      <div className='h-60 overflow-hidden rounded-xl lg:h-96'>
        <Image
          src={'/image/background/about-us/gallery-3.png'}
          alt='about-us-gallery'
          width={400}
          height={200}
          className='full-size object-cover'
        />
      </div>
    </div>
  );
}
