import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
} from 'react-icons/fa';

import Link from 'next/link';
import { SlSocialBehance } from 'react-icons/sl';

type Props = {
  link: string;
  type: string;
  type_fa: string;
};

// ----------------------------------------

export default function SocialMedia(props: Props) {
  const { link, type, type_fa } = props;

  return (
    <div className="relative bg-white p-6 flex flex-col gap-2 group rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out xl:bg-[#f8f8f8] xl:shadow-none xl:hover:shadow-[0_0_4rem_0_rgba(0,0,0,0.08)]">
      <div className="bg-cs-red/10 w-12 h-12 p-2.5 flex-center rounded-lg">
        {type === 'telegram' ? (
          <FaTelegram className="full-size" color="#f30f26" />
        ) : type === 'instagram' ? (
          <FaInstagram className="full-size" color="#f30f26" />
        ) : type === 'linkedin' ? (
          <FaLinkedin className="full-size" color="#f30f26" />
        ) : type === 'facebook' ? (
          <FaFacebook className="full-size" color="#f30f26" />
        ) : (
          <SlSocialBehance className="full-size" color="#f30f26" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-zinc-800 text-cs85 font-extrabold capitalize mt-3">
          {type_fa}
        </span>

        <div className="w-0.5 h-4 bg-zinc-400 rounded mt-2" />

        <span className="text-zinc-800 text-cs85 font-extrabold capitalize mt-3">
          {type}
        </span>
      </div>

      {link && (
        <Link
          href={link}
          target="_blank"
          className="text-zinc-500 text-cs75 font-inter font-semibold"
        >
          <span className="font-sans">لینک : </span>
          <span className="underline">{link}</span>
        </Link>
      )}

      <div className="absolute inset-0 -z-10 bg-cs-red scale-50 rounded-xl transition-all duration-500 ease-in-out xl:group-hover:-bottom-8 xl:group-hover:scale-75"></div>
    </div>
  );
}
