type Props = {
  copyright: string;
};

// --------------------------------------

export default function Copyright(props: Props) {

  return (
    <div className="bg-zinc-100 w-full h-12 text-cs75 flex-center rounded-cs-10 xl:bg-transparent xl:h-max xl:mt-auto xl:mb-4">
      <p className="text-zinc-800 font-bold truncate px-4 lg:text-zinc-500 lg:px-0">
        {props.copyright}
      </p>
    </div>
  );
}
