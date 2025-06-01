import Image from 'next/image';

type Props = { banners: string[] };

// -----------------------------------------------

export function AdvertisingBanners(props: Props) {
  const { banners } = props;

  return (
    <div className="hidden grid-cols-2 items-end gap-8 xl:grid">
      {/* Right-Banner */}
      <div>
        {banners[0] && (
          <Image
            width={600}
            height={300}
            src={banners[0]}
            alt="graphical-hotel"
            className="full-size object-contain"
          />
        )}
      </div>

      {/* Left-Banner */}
      <div>
        {banners[1] && (
          <Image
            width={600}
            height={300}
            src={banners[1]}
            alt="graphical-hotel"
            className="full-size object-contain"
          />
        )}
      </div>
    </div>
  );
}
