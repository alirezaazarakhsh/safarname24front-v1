'use client';

// import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// export const DynamicPageContent = dynamic(() => import('./PageContent').then(({ PageContent }) => PageContent), {
//   ssr: false,
// });

type Props = Readonly<{
  children: React.ReactNode;
}>;

// ------------------------------------

export default function PageContent(props: Props) {
  const pathname = usePathname();

  return (
    <section
      className={`mx-5 mt-8 mb-16 flex flex-col gap-y-12 lg:gap-y-20 ${
        pathname === '/' ? 'lg:mt-28 xl:mt-24' : 'lg:mt-32'
      }`}
    >
      {props.children}
    </section>
  );
}
