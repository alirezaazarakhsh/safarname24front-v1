// Creating and exporting numberSepration function which takes a string or number as prop and with a regexp,
// groups the given value (with given number to group with) with given format
export function numberSeparation(
  number: number | string,
  format: string = ',', // What to format with
  sortBy: number = 3, // Group By
) {
   try {
      const pattern = `\\B(?=(\\d{${sortBy}})+(?!\\d))`;
        const regex = new RegExp(pattern, 'g');

        const str = number.toString();
        const result = str.replace(regex, format);

        return result;
   } catch {
      return "-";
   }
  }
