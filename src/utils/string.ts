// Importing part
import toast from '@/components/dashboard/ui/customSonner/toast';
import { BankInfo, HandleZeroBeforeNumberPropsType } from '@/types/utils';
import { digitsEnToFa } from '@persian-tools/persian-tools';

// Creating and exporting handleZeroBeforeNumber function which takes a string or number and checks if it has single character/number (in lenght) and if it is adds a 0 before the actual number
// Otherwise returns the numner
export function handleZeroBeforeNumber(
  value: HandleZeroBeforeNumberPropsType,
): string {
  const convertedNumber = value.toString();

  if (convertedNumber.length === 1) {
    return digitsEnToFa(`0${convertedNumber}`);
  } else return convertedNumber;
}

// Creating a function to get perisan name and icon name of give credit card number
const binToBank: Record<string, BankInfo> = {
  '636795': { type: 'markazi', name: 'اداره معاملات ریالی بانک مرکزی' },
  '627961': { type: 'sanat-madan', name: 'بانک صنعت و معدن' },
  '610433': { type: 'mellat', name: 'بانک ملت' },
  '589463': { type: 'refah', name: 'بانک رفاه کارگران' },
  '628023': { type: 'maskan', name: 'بانک مسکن' },
  '589210': { type: 'sepah', name: 'بانک سپه' },
  '603770': { type: 'keshavarzi', name: 'بانک کشاورزی' },
  '603799': { type: 'melli', name: 'بانک ملی ایران' },
  '627353': { type: 'tejarat', name: 'بانک تجارت' },
  '603769': { type: 'saderat', name: 'بانک صادرات ایران' },
  '627648': { type: 'tosee-sedarat', name: 'بانک توسعه صادرات ایران' },
  '627760': { type: 'post', name: 'پست بانک' },
  '502908': { type: 'taavon-eslami', name: 'بانک توسعه تعاون' },
  '628157': { type: 'tosee', name: 'مؤسسه اعتباری توسعه' },
  '627488': { type: 'karafarin', name: 'بانک کارآفرین' },
  '622106': { type: 'parsian', name: 'بانک پارسیان' },
  '627412': { type: 'eghtesaade-novin', name: 'بانک اقتصاد نوین' },
  '621986': { type: 'saman', name: 'بانک سامان' },
  '502229': { type: 'pasargad', name: 'بانک پاسارگاد' },
  '639607': { type: 'sarmayeh', name: 'بانک سرمایه' },
  '639346': { type: 'sina', name: 'بانک سینا' },
  '606373': { type: 'mehr-iran', name: 'بانک قرض‌الحسنه مهر ایران' },
  '504706': { type: 'shahr', name: 'بانک شهر' },
  '636214': { type: 'ayandeh', name: 'بانک آینده' },
  '627381': { type: 'ansar', name: 'بانک انصار' },
  '505416': { type: 'gardeshgari', name: 'بانک گردشگری' },
  '636949': { type: 'hekmat', name: 'بانک حکمت ایرانیان' },
  '502938': { type: 'dey', name: 'بانک دی' },
  '505785': { type: 'iran-zamin', name: 'بانک ایران زمین' },
  '504172': { type: 'resalat', name: 'بانک قرض‌الحسنه رسالت' },
  '505809': { type: 'khavar-mianeh', name: 'بانک خاورمیانه' },
  '581874': { type: 'iran-venezuela', name: 'بانک ایران و ونزوئلا' },
  '639599': { type: 'ghavamin', name: 'بانک قوامین' },
  '505801': { type: 'kosar', name: 'مؤسسه مالی و اعتباری کوثر' },
  '507677': { type: 'noor', name: 'مؤسسه مالی و اعتباری نور' },
};

export function getBankFromCard(cardNumber: string | number): BankInfo | null {
  const cardStr = String(cardNumber).replace(/\D/g, '');
  if (cardStr.length < 6) return null;
  const bin = cardStr.slice(0, 6);
  return binToBank[bin] || null;
}

export function isValidIranianPassport(passport: string): boolean {
  const regex = /^[A-Z]\d{8}$/;
  return regex.test(passport);
}

export function hanldeClipboardCopy(text: string): void {
  window.navigator.clipboard
    .writeText(text)
    .then(() =>
      toast({
        title: 'کد با موفقیت کپی شد',
        theme: 'green',
        description: `مشتری گرامی کد تخفیف “${text}” کپی شد.`,
      }),
    )
    .catch(() =>
      toast({
        title: 'کد کپی نشد!',
        description: 'خطایی در کپی کردن کد پیش امد.',
      }),
    );
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${s.toString().padStart(2, '0')}`;
}
