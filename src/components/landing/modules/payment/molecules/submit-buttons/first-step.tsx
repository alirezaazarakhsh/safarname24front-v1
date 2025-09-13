'use client';

// ------------------------------

export function SubmitButton() {
  return (
    <button
      type="submit"
      form="passengers-form"
      className="w-full h-12 bg-cs-dark-blue rounded-cs-10"
    >
      <span className="text-zinc-100 text-cs85 font-semibold">
        تایید و ادامه فرآیند
      </span>
    </button>
  );
}
