import Image from 'next/image';

type Props = {
  src: string;
};

// --------------------------------------

export default function Logo(props: Props) {
  const { src } = props;

  return (
    <div className="w-full flex-center">
      {src && (
        <Image
          width={200}
          height={200}
          src={src}
          alt="safarname24-logo"
          className="w-20 aspect-auto mt-4 xl:mt-1 xl:mb-4"
        />
      )}
    </div>
  );
}
