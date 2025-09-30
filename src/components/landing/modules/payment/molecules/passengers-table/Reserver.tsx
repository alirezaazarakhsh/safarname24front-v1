import { Person } from '../../helpers/type';

type Props = { reserver?: Person };

// ------------------------------

export function Reserver(props: Props) {
  const { reserver } = props;

  return (
    <div className="pb-6 mb-6 space-y-4 border-b">
      <span className="text-cs85 font-bold flex gap-2">
        مشخصات رزرو کننده :
      </span>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-5">
        {reserver &&
          Object.entries(reserver).map((item) => (
            <input
              readOnly
              type="text"
              key={item[0]}
              value={item[1]}
              className="bg-zinc-100/50 w-full h-10 text-zinc-600 text-[0.8rem] font-semibold px-4 border outline-none rounded-lg"
            />
          ))}
      </div>
    </div>
  );
}
