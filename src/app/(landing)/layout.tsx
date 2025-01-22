import { Footer } from '@/components/landing/modules';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout(props: Props) {
  return (
    <main className='max-w-screen-template min-h-[200vh] mx-auto flex flex-col'>
      <section className='mx-4 space-y-8 lg:space-y-14'>{props.children}</section>
      <Footer />
    </main>
  );
}
