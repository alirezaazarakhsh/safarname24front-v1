import { MdOutlineReportGmailerrorred } from 'react-icons/md';

type Props = {
  desc?: string;
};

// ------------------------------

export default function SimpleError(props: Props) {
  const { desc } = props;

  return (
    <div className="flex items-center gap-1">
      <MdOutlineReportGmailerrorred size={20} color="#f30f26" />

      <p className="text-cs-red text-cs08 font-semibold">
        {desc ?? 'خطایی رخ داده است !'}
      </p>
    </div>
  );
}
