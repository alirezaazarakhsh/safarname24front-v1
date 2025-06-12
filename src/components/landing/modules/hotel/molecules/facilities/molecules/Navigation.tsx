import { ICArrowLeft } from '@/components/icons';

type Props = {
  slidePrev: () => void;
  slideNext: () => void;
};

// ------------------------------

export default function Navigation(props: Props) {
  const { slidePrev, slideNext } = props;

  return (
    <div className="absolute left-5 inset-y-5 w-8 flex flex-col">
      <button
        className="z-50 bg-zinc-100 w-8 h-8 flex-center rounded-md"
        onClick={slidePrev}
      >
        <ICArrowLeft className="rotate-90" />
      </button>

      <button
        className="z-50 bg-zinc-100 w-8 h-8 mt-auto flex-center rounded-md"
        onClick={slideNext}
      >
        <ICArrowLeft className="-rotate-90" />
      </button>
    </div>
  );
}
