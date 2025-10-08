import Link from 'next/link';
import { payment } from '../../helpers/constant';
import { useSearchParams } from 'next/navigation';

type Props = { activeStep: number };

// ------------------------------

export function StepBackButton(props: Props) {
  const { activeStep } = props;

  const { reservationId } = payment;
  const searchParams = useSearchParams();

  return (
    <Link
      scroll={false}
      href={
        activeStep === 1 || activeStep === 4
          ? '/'
          : `/payment/complete-passengers-information?${reservationId}=${searchParams.get(reservationId)}`
      }
      className="bg-zinc-100 text-cs08 font-semibold px-4 py-3 rounded-lg"
    >
      {activeStep === 1 || activeStep === 4
        ? 'بازگشت به صفحه اصلی'
        : 'بازگشت به مرحله قبل'}
    </Link>
  );
}
