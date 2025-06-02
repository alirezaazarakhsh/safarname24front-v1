'use client';

import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
} from 'react-icons/fa';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import BackToTopBtn from './BackToTopBtn';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  link: string;
  type: string;
  show_in_footer: boolean;
};

type ApiResponse = {
  data: Data[];
};

// --------------------------------

export default function SocialMedias() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['social-media'],
    queryFn: () => generalInstance('/config/social-media'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="w-full h-14 flex gap-3 xl:h-12">
      <BackToTopBtn />

      <div className="flex-1 flex gap-3">
        {status === 'pending' ? (
          <div className="w-full grid grid-cols-4 gap-3">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          data?.data
            .filter((item) => item.show_in_footer)
            .map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-zinc-100 w-full flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-zinc-200/70"
              >
                {item.type === 'instagram' ? (
                  <FaInstagram size={28} color="#222" />
                ) : item.type === 'telegram' ? (
                  <FaTelegram size={28} color="#222" />
                ) : item.type === 'facebook' ? (
                  <FaFacebook size={28} color="#222" />
                ) : item.type === 'whatsapp' ? (
                  <FaWhatsapp size={28} color="#222" />
                ) : (
                  <FaLinkedin size={28} color="#222" />
                )}
              </Link>
            ))
        )}
      </div>
    </div>
  );
}
