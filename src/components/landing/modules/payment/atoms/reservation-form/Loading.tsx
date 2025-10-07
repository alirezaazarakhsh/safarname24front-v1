import loader from '@/styles/loader.module.css';

// ------------------------------

export function Loading() {
  return (
    <div className="bg-white h-96 p-5 flex-center border rounded-xl">
      <div className={loader.dots} style={{ scale: '1.6' }} />
    </div>
  );
}
