import Link from 'next/link';
import { Heart } from 'iconsax-react';

type Props = {};

// --------------------------------------------

export default function UserFavorites(props: Props) {
  const {} = props;

  return (
    <Link
      href={'/'}
      className="bg-zinc-200/50 px-4 flex-center gap-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
    >
      <Heart size={19} variant="Bold" color="#60606a" />
      <span className="hidden xl:block">مورد علاقه ها</span>
    </Link>
  );
}
