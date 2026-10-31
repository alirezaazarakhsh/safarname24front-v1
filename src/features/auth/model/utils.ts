/**
 * Converts Persian and Arabic numerals to standard English digits.
 */
export const normalizeDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  return str
    .split('')
    .map((char) => {
      const pIndex = persianDigits.indexOf(char);
      if (pIndex > -1) return pIndex.toString();

      const aIndex = arabicDigits.indexOf(char);
      if (aIndex > -1) return aIndex.toString();

      return char;
    })
    .join('');
};

/**
 * Normalizes any Iranian phone input (+98, 0098, 9..., 09...)
 * into a standard 11-digit "09xxxxxxxxx" string.
 */
export const normalizeIranianMobile = (input: string): string => {
  if (!input) return '';

  // 1. Convert Persian/Arabic digits to English & strip extra chars (spaces, dashes, etc.)
  let cleaned = normalizeDigits(input).replace(/[^\d+]/g, '');

  // 2. Handle international prefix (+98 or 0098)
  if (cleaned.startsWith('+98')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('0098')) {
    cleaned = '0' + cleaned.slice(4);
  }

  // 3. Prepend leading zero if the user entered 10 digits starting with '9'
  if (cleaned.startsWith('9') && cleaned.length === 10) {
    cleaned = '0' + cleaned;
  }

  return cleaned;
};

/**
 * Validates whether the given phone number represents a valid Iranian mobile number.
 */
export const isValidIranianMobile = (phone: string): boolean => {
  const normalized = normalizeIranianMobile(phone);
  return /^09\d{9}$/.test(normalized);
};
