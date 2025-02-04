import Link from 'next/link';

type Props = {
  media: {
    icon: React.ReactNode;
    title: string;
    link: string;
    href: string;
  };
};

// ----------------------------------------

export default function SocialMedia(props: Props) {
  const {
    media: { title, icon, link, href },
  } = props;

  return (
    <div className='bg-white p-5 flex flex-col gap-2 rounded-xl transition-all duration-300 ease-in-out xl:bg-transparent xl:hover:shadow-[0_0_4rem_0_rgba(0,0,0,0.08)]'>
      <div className='bg-cs-red/15 w-12 h-12 p-3 flex-center rounded-lg'>{icon}</div>

      <div className='text-zinc-800 text-cs08 font-extrabold mt-3'>{title}</div>
      <Link href={href} className='text-zinc-500 text-cs75 font-inter font-semibold'>
        <span className='font-sans'>لینک : </span>
        <span className='underline'>{link}</span>
      </Link>
    </div>
  );
}
