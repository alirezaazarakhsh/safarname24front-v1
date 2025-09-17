import loader from '@/styles/loader.module.css';

// ------------------------------

export function Loading() {
  return (
    <div className="bg-white h-[30rem] p-5 flex-center border rounded-xl">
      <div className={loader['dots-dark']} style={{ scale: '2' }} />
    </div>
  );
}
