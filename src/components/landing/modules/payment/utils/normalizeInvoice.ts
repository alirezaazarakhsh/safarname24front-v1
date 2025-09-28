import { Invoice } from '../helpers/type';

// ------------------------------

export function normalizeInvoice(detail?: Invoice): Invoice | undefined {
  if (!detail) return;

  return Object.fromEntries(
    Object.entries(detail).map(([key, value]) => [
      key,
      Number(String(value).replaceAll(',', '')),
    ]),
  ) as Invoice;
}
