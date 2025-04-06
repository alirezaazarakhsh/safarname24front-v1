import Image from 'next/image';

type Props = {
  src: string[];
};

// ------------------------------------------------

export function Gallery(props: Props) {
  const { src } = props;

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="h-80 grid grid-cols-2 grid-rows-[1.4fr_1fr] gap-5 lg:h-96 lg:grid-rows-[1.8fr_1fr] lg:gap-6">
        <div className="bg-zinc-200 overflow-hidden rounded-xl">
          {src[0] && (
            <Image
              width={400}
              height={200}
              src={src[0]}
              alt="about-us-gallery"
              className="full-size object-cover"
            />
          )}
        </div>

        <div className="bg-zinc-200 overflow-hidden rounded-xl">
          {src[1] && (
            <Image
              width={400}
              height={200}
              src={src[1]}
              alt="about-us-gallery"
              className="full-size object-cover"
            />
          )}
        </div>

        <div className="bg-[#E2E6F8] text-[#4B5BCE] px-6 col-start-1 col-end-3 flex flex-col justify-center gap-3 rounded-xl">
          <span className="text-xl font-black lg:text-2xl">
            خلق تجربه ی مدرن و پایدار سفر
          </span>

          <span className="text-cs08 font-extrabold lg:text-cs09">
            با هتل هایی همچون لوکس و آرامش بخش !
          </span>
        </div>
      </div>

      <div className="h-80 bg-zinc-200 overflow-hidden rounded-xl lg:h-96">
        {src[2] && (
          <Image
            width={400}
            height={200}
            src={src[2]}
            alt="about-us-gallery"
            className="full-size object-cover"
          />
        )}
      </div>
    </div>
  );
}
