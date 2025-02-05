import Header from '@/components/landing/modules/header/Header';
import Footer from '@/components/landing/modules/footer/Footer';
import ComingSoon from '@/components/landing/modules/coming-soon/ComingSoon';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout(props: Props) {
  return (
    <>
      {false ? (
        <ComingSoon date='2025-02-20' />
      ) : (
        <main className='max-w-screen-template min-h-screen mx-auto flex flex-col'>
          <Header />
          <section className='mx-5 mt-8 mb-20 flex flex-col gap-y-16 lg:gap-y-20 xl:mt-4'>{props.children}</section>
          <Footer />
        </main>
      )}
    </>
  );
}
