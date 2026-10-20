'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>خطایی رخ داده است</h2>
          <button
            onClick={() => reset()}
            style={{ borderRadius: '0.5rem', backgroundColor: '#2563eb', color: '#ffffff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}
          >
            تلاش مجدد
          </button>
        </div>
      </body>
    </html>
  );
}
