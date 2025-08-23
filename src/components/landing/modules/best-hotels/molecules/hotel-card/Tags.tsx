type Props = {
  tags: {
    id: number;
    title: string;
  }[];
};

// ----------------------------

export default function Tags(props: Props) {
  const { tags } = props;

  return (
    <div className="absolute top-1 left-4 grid gap-2 xl:top-5 xl:left-auto xl:right-5">
      {tags?.slice(0, 3).map((tag) => (
        <span
          key={tag.id}
          className="bg-cs-blue/10 text-cs-blue text-center text-cs07/4 font-bold px-2 py-1 border border-cs-blue/20 rounded-md"
        >
          {tag.title}
        </span>
      ))}
    </div>
  );
}
