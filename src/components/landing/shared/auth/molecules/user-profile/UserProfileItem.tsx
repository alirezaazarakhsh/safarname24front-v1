import { cn } from '@/utils/utils';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  handleCloseModal: () => void;
} & ({ type: 'link'; href: string } | { type: 'button'; href?: never });

// --------------------------------------------

export default function UserProfileItem(props: Props) {
  const { title, href, type, handleCloseModal } = props;

  const router = useRouter();

  const handleClose = () => {
    handleCloseModal();
    type === 'link' && router.push(href);
  };

  return (
    <button
      className={cn(
        'text-zinc-600 text-[0.75rem] font-semibold px-4 py-3 flex items-center justify-start gap-2 transition-colors ease-in-out hover:bg-zinc-100/60',
        '',
      )}
      onClick={handleClose}
    >
      {title}
    </button>
  );
}
