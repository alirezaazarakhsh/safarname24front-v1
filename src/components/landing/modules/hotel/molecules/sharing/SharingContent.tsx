import SharingItem from './SharingItem';

// -----------------------------------------------------

export default function SharingContent() {
  return (
    <div className="">
      <span className="text-cs95 font-bold md:text-base">اشتراک گذاری</span>
      <p className="text-zinc-600 text-cs85 font-semibold mt-2 mb-8">
        این هتل را با دوستان خود به اشتراک بگذارید
      </p>

      <div className="space-y-4">
        <SharingItem icon="copy" title="کپی کردن لینک هتل" type="copy" />
        <SharingItem icon="telegram" title="تلگرام" />
        <SharingItem icon="whatsapp" title="واتساپ" />
        <SharingItem icon="instagram" title="اینستاگرام" />
      </div>
    </div>
  );
}
