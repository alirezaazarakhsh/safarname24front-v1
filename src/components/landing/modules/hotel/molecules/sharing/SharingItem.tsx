'use client';

import { FiCopy } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';

type Props = {
  title: string;
  type?: 'copy' | 'send';
  icon: 'copy' | 'telegram' | 'whatsapp' | 'instagram';
};

// -----------------------------------------------------

export default function SharingItem(props: Props) {
  const { icon, title, type = 'send' } = props;

  const handleClick = async (type: 'copy' | 'send') => {
    if (type === 'copy') {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        alert('مشکلی در کپی کردن لینک پیش اومد 😓');
      }
    } else {
      window.open(
        `${icon === 'telegram' ? 'https://t.me/share/url?url' : icon === 'whatsapp' ? 'https://wa.me/?text' : 'https://www.instagram.com/'}=${window.location.href}`,
        '_blank',
      );
    }
  };

  return (
    <div className="bg-white h-16 text-cs85 px-3 flex items-center gap-4 rounded-cs-10 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.03)]">
      <div className="w-11 flex-center aspect-square border-2 rounded-lg">
        {icon === 'copy' ? (
          <FiCopy color="#333" size={20} />
        ) : icon === 'instagram' ? (
          <FaInstagram color="#333" size={22} />
        ) : icon === 'telegram' ? (
          <FaTelegram color="#333" size={22} />
        ) : (
          <IoLogoWhatsapp color="#333" size={22} />
        )}
      </div>

      <span className="text-zinc-800 font-bold">{title}</span>

      <button
        rel="noopener noreferrer"
        onClick={() => handleClick(type === 'copy' ? 'copy' : 'send')}
        className={`bg-cs-blue/15 text-cs-blue w-24 h-10 text-cs08 font-bold mr-auto flex-center rounded-lg`}
      >
        {type === 'copy' ? 'کپی لینک' : 'ارسال لینک'}
      </button>
    </div>
  );
}
