'use client';

import { FaTelegram } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';

type Props = {
  title: string;
  icon: 'telegram' | 'whatsapp' | 'instagram';
};

// -----------------------------------------------------

export default function SharingItem(props: Props) {
  const { icon, title } = props;

  const handleClick = async () => {
    open(
      `${icon === 'telegram' ? 'https://t.me/share/url?url' : icon === 'whatsapp' ? 'https://wa.me/?text' : 'https://www.instagram.com/'}=${window.location.href}`,
      '_blank',
    );
  };

  return (
    <div className="bg-white h-16 text-cs85 px-3 flex items-center gap-4 rounded-cs-10 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.03)]">
      <div className="w-11 flex-center aspect-square border rounded-lg">
        {icon === 'instagram' ? (
          <FaInstagram color="#555" size={22} />
        ) : icon === 'telegram' ? (
          <FaTelegram color="#555" size={22} />
        ) : (
          <IoLogoWhatsapp color="#555" size={22} />
        )}
      </div>

      <span className="text-zinc-800 font-bold">{title}</span>

      <button
        onClick={handleClick}
        rel="noopener noreferrer"
        className={`bg-cs-blue/15 text-cs-blue w-24 h-10 text-cs08 font-bold mr-auto flex-center rounded-lg`}
      >
        ارسال لینک
      </button>
    </div>
  );
}
