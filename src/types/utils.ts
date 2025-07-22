// Importing part
import { BankNameType } from '@/types/dashboard/component';

// Creating and exporting type of returns and props of utility functions
export type HandleZeroBeforeNumberPropsType = number | string;

export interface BankInfo {
  type: BankNameType;
  name: string;
}
