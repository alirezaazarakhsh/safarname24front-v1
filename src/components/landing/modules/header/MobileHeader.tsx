import Link from 'next/link';
import Image from 'next/image';

type Props = {
  logo: string;
  title: string;
  subtitle: string;
};

// --------------------------------------------

export default function MobileHeader(props: Props) {
  const { logo, title, subtitle } = props;

  return (
    <header className='text-cs08 font-bold pt-6 mx-5 flex flex-col gap-4 lg:hidden'>
      {/* Logo | Titles */}
      <div className='flex items-center gap-3'>
        <Link href={'/'} className='bg-cs-red w-12 h-12 pt-1.5 flex-center overflow-hidden rounded-lg'>
          {logo && (
            <Image src={logo} alt='logo' width={100} height={100} className='full-size object-cover' />
          )}
        </Link>

        <div className='text-zinc-800 space-y-0.5'>
          <h1 className='font-extrabold'>{title}</h1>
          <h2 className='font-inter font-semibold capitalize'>{subtitle}</h2>
        </div>
      </div>

      <div className='bg-zinc-200/50 h-10 flex overflow-hidden rounded-lg'>
        <button className='w-12 flex-center'>
          <svg
            width='20'
            height='20'
            className='w-4 h-4'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.1665 17.2917C4.68317 17.2917 1.0415 13.65 1.0415 9.16669C1.0415 4.68335 4.68317 1.04169 9.1665 1.04169C9.50817 1.04169 9.7915 1.32502 9.7915 1.66669C9.7915 2.00835 9.50817 2.29169 9.1665 2.29169C5.37484 2.29169 2.2915 5.37502 2.2915 9.16669C2.2915 12.9584 5.37484 16.0417 9.1665 16.0417C12.9582 16.0417 16.0415 12.9584 16.0415 9.16669C16.0415 8.82502 16.3248 8.54169 16.6665 8.54169C17.0082 8.54169 17.2915 8.82502 17.2915 9.16669C17.2915 13.65 13.6498 17.2917 9.1665 17.2917Z'
              fill='#5D5D5D'
            />
            <path
              d='M16.6665 4.79169H11.6665C11.3248 4.79169 11.0415 4.50835 11.0415 4.16669C11.0415 3.82502 11.3248 3.54169 11.6665 3.54169H16.6665C17.0082 3.54169 17.2915 3.82502 17.2915 4.16669C17.2915 4.50835 17.0082 4.79169 16.6665 4.79169Z'
              fill='#5D5D5D'
            />
            <path
              d='M14.1665 7.29169H11.6665C11.3248 7.29169 11.0415 7.00835 11.0415 6.66669C11.0415 6.32502 11.3248 6.04169 11.6665 6.04169H14.1665C14.5082 6.04169 14.7915 6.32502 14.7915 6.66669C14.7915 7.00835 14.5082 7.29169 14.1665 7.29169Z'
              fill='#5D5D5D'
            />
            <path
              d='M16.8001 18.9917C16.7334 18.9917 16.6667 18.9833 16.6084 18.975C16.2167 18.925 15.5084 18.6583 15.1084 17.4667C14.9001 16.8417 14.9751 16.2167 15.3167 15.7417C15.6584 15.2667 16.2334 15 16.8917 15C17.7417 15 18.4084 15.325 18.7084 15.9C19.0084 16.475 18.9251 17.2083 18.4501 17.9167C17.8584 18.8083 17.2167 18.9917 16.8001 18.9917ZM16.3001 17.075C16.4417 17.5083 16.6417 17.725 16.7751 17.7417C16.9084 17.7583 17.1584 17.6 17.4167 17.225C17.6584 16.8667 17.6751 16.6083 17.6167 16.4917C17.5584 16.375 17.3251 16.25 16.8917 16.25C16.6334 16.25 16.4417 16.3333 16.3334 16.475C16.2334 16.6167 16.2167 16.8333 16.3001 17.075Z'
              fill='#5D5D5D'
            />
          </svg>
        </button>

        <input
          type='text'
          placeholder='جستجو شهر, هتل ...'
          className='flex-1 bg-transparent text-zinc-800 text-cs07 placeholder:text-zinc-500 pl-4'
        />
      </div>
    </header>
  );
}
