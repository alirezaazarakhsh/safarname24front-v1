import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
};

// ------------------------------

export function Input(props: Props) {
  const { name, className, placeholder, type } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={twMerge(
          'bg-zinc-100 w-full h-11 text-zinc-600 text-[0.8rem] font-semibold px-4 rounded-lg placeholder:font-medium',
          className,
        )}
      />
    </div>
  );
}
