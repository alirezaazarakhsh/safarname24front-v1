import { Footer } from '@/components/landing/modules/footer/Footer';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout(props: Props) {
  return (
    <main className='max-w-screen-template min-h-screen mx-auto flex flex-col'>
      <section className='mx-5 my-20 space-y-16 lg:space-y-20'>{props.children}</section>
      <Footer />
    </main>
  );
}
