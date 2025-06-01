// Importing part
import { HandleZeroBeforeNumberPropsType } from '@/types/utils';

// Creating and exporting handleZeroBeforeNumber function which takes a string or number and checks if it has single character/number (in lenght) and if it is adds a 0 before the actual number
// Otherwise returns the numner
export function handleZeroBeforeNumber(
  value: HandleZeroBeforeNumberPropsType,
): string {
  const convertedNumber = value.toString();

  if (convertedNumber.length === 1) {
    return `0${convertedNumber}`;
  } else return convertedNumber;
}
