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
    <div className="relative bg-white p-6 flex flex-col gap-2 group rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out xl:bg-[#f8f8f8] xl:shadow-none xl:hover:shadow-[0_0_4rem_0_rgba(0,0,0,0.08)]">
      <div className="bg-cs-red/10 w-12 h-12 p-3 flex-center rounded-lg">
        {icon}
      </div>

      <div className="text-zinc-800 text-cs85 font-extrabold mt-3">{title}</div>
      <Link
        href={href}
        className="text-zinc-500 text-cs75 font-inter font-semibold"
      >
        <span className="font-sans">لینک : </span>
        <span className="underline">{link}</span>
      </Link>

      <div className="absolute inset-0 -z-10 bg-cs-red scale-50 rounded-xl transition-all duration-500 ease-in-out xl:group-hover:-bottom-8 xl:group-hover:scale-75"></div>
    </div>
  );
}
