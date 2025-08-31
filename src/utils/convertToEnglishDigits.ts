export function convertToEnglishDigits(input: string) {
  return input.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (char) => {
    // \u06F0-\u06F9 → فارسی ۰ تا ۹
    // \u0660-\u0669 → عربی ٠ تا ٩
    const code = char.charCodeAt(0);
    if (code >= 0x06f0 && code <= 0x06f9) {
      return String(code - 0x06f0);
    }
    if (code >= 0x0660 && code <= 0x0669) {
      return String(code - 0x0660);
    }
    return char;
  });
}
