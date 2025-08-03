type Props = {
  NumberOfRooms?: number;
};

// --------------------------------

export default function NumberOfRooms(props: Props) {
  const { NumberOfRooms = 0 } = props;

  return (
    <div className="h-10 px-4 text-cs08 font-semibold bg-cs-dark-blue text-zinc-100 flex-center gap-1 rounded-lg lg:w-28 lg:h-12 lg:rounded-[10px]">
      <span>{NumberOfRooms}</span>
      <span>اتاق</span>
    </div>
  );
}
