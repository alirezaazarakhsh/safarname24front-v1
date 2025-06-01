type Props = {
  title: string;
  desc: string;
};

// --------------------------------------

export default function Description(props: Props) {
  const { title, desc } = props;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-zinc-700 text-cs09 font-inter font-bold capitalize">
        {title}
      </h1>

      <div className="bg-cs-red w-5/6 h-[2px] mt-3 mb-1 rounded-full lg:bg-zinc-300"></div>

      <p className="text-zinc-600 text-cs75/5 text-justify font-semibold mt-3 lg:line-clamp-6">
        {desc}
      </p>
    </div>
  );
}
