import { toast } from 'sonner';
import { CustomSoonerToast } from '@/components/landing/shared/toast';

type Props = {
  title: string;
  duration?: number;
  description: string;
  type: 'success' | 'error';
};

// ------------------------------

export function showCMToast(props: Props) {
  const { description, title, type, duration = 5000 } = props;

  return toast.custom(
    (id) => (
      <CustomSoonerToast
        id={id}
        type={type}
        title={title}
        duration={duration}
        subtitle={description}
      />
    ),
    { duration },
  );
}
