// Importing part
import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';
import { IconsName } from '../SvgProp';
import moment from 'jalali-moment';

// Creating and exporting type of components of dashboard pages
export interface RootLayoutPropsType {
  children: ReactNode;
}

export interface LogoComponentPropsType {
  onlyLogo?: boolean;
}

export interface PageComponentPropsType {
  children: ReactNode;
  className?: string;
}

export interface FilterComponentPropsType {
  className?: string;
}

export interface UserStatusComponentPropsType {
  className?: string;
}

export interface LatestReservationsTableProps {
  className?: string;
}

export interface LatestTicketsTableProps {
  className?: string;
}

export interface UserStatusInfoComponentPropsType {
  className?: string;
  data: {
    icon: ReactNode;
    title: string;
    value: {
      unit: string;
      count: number;
    };
    barMode: {
      unit: string;
      value: {
        date: string;
        value: number;
      }[];
    };
  };
}

export interface MobileProfileComponentPropsType {
  isOpened?: boolean;
  closeFn: () => void;
}

export interface ReservationsFilterComponentPropsType {
  className?: string;
  dataNotEmpty: boolean;
}

export interface IconInputComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconsName;
  wholeClassName?: string;
}

export interface AllFactorsTableComponentPropsType {
  className?: string;
  data: {
    id: number;
    code: string;
    hotel: string;
    enterAt: string;
    exitAt: string | null;
    passengers: string;
    financialStatus: 'payed' | 'cancled' | 'pending';
  }[];
}

export interface CustomPaginationComponentPropsType {
  className?: string;
  count: number;
  onChange?: (index: number) => void;
}

export interface DialogComponentPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
}

export interface ToastProps {
  title: string;
  description: string;
  theme?: 'theme' | 'green';
}

export interface CircluarTimerComponentPropsType {
  className?: string;
  duration: number;
  theme?: 'theme' | 'green';
}

export interface CanclationReasonDialogComponentProps
  extends DialogComponentPropsType {
  openFailedDialog: () => void;
  openAcceptDialog: () => void;
}

export interface HotelAcceptSectionPropsType {
  className?: string;
  data: {
    reserver: string;
    createdAt: string;
    codePeigiri: string;
    phoneNumber: string;
    enterAt: string;
    exitAt: string | null;
  }[];
}

export interface RoomsSectionPropsType {
  className?: string;
  data: {
    info: {
      hotelName: string;
      timeSpan: 8; // in Nights
      meals: string;
      enteranceHalfCharge: boolean;
      exitHalfCharge: boolean;
      reserver: string;
    };
    passenger: string[];
  }[];
}

export interface CanclationErrorDrawerPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
  title: string;
  description: string;
  theme?: 'theme' | 'green';
}

export interface IconedPriceComponentPropsType {
  title: string;
  price: number;
  icon: IconsName;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  iconVariant?: 'fill' | 'outline';
}

export interface FinancialSectionComponentPropsType {
  className?: string;
}

export interface CheckboxItemComponentPropsType {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  checked: boolean;
  title: string;
  isCardSelection?: boolean;
  disabledReason?: string;
}

export interface SwitchItemComponentPropsType {
  onClick?: () => void;
  disabled?: boolean;
  isOn?: boolean;
  title: string;
}

export interface customChargeComponentPropsType {
  disabled: boolean;
  onSubmit: (value: number) => void;
}

export interface InvoiceComponentPropsType {
  value: number;
}

export interface TransactionsTablePropsType {
  className?: string;
  data: {
    codePeigiri: string;
    price: number;
    createdAt: string;
    bank: string;
    status: 'successfull' | 'unsucessfull';
  }[];
}

export interface InputAndLabelPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  validation?: string;
  label: string;
  isValid?: boolean;
  validationType?: 'text' | 'icon';
}

export interface CreditCardSelectionComponentPropsType {
  onChange: (selectedVal: string) => void;
}

export interface UploadComponentPropsType {
  onChange: (file: File | undefined) => void;
}

export interface EmergenciesComponentPropsType {
  previousInfos: {
    file: File | undefined;
    card: string | undefined;
  };
}

export type CreditCardSubscriptionChartType = [
  { month: 'فروردین'; price: number },
  { month: 'اردیبهشت'; price: number },
  { month: 'خرداد'; price: number },
  { month: 'تیر'; price: number },
  { month: 'مرداد'; price: number },
  { month: 'شهریور'; price: number },
  { month: 'مهر'; price: number },
  { month: 'ابان'; price: number },
  { month: 'اذر'; price: number },
  { month: 'دی'; price: number },
  { month: 'بهمن'; price: number },
  { month: 'اسفند'; price: number },
];

export interface CreditCardSubscriptionType {
  type: 'premium' | 'free';
  endsAt: string;
  discountCode: string;
  price: number;
  chart: CreditCardSubscriptionChartType;
}

export interface CreditCardType {
  owner: string;
  subscription?: CreditCardSubscriptionType;
  number: {
    shaba: string | number;
    card: string | number;
  };
  name: {
    english: string;
    persian: string;
  };
}

export interface CreditCardComponentPropsType {
  className?: string;
  info: CreditCardType | undefined;
}

export interface YourBankAccountComponentPropsType {
  onChange: (creditCard: CreditCardType | undefined) => void;
  creditCards: CreditCardType[];
  selectedCard: CreditCardType | undefined;
  setSelectedCard: Dispatch<SetStateAction<CreditCardType | undefined>>;
}

export interface ManagerBankAccountComponentPropsType {
  selectedCreditCard: CreditCardType | undefined;
}

export type typeCreditCardsSubmitComponentPropsType =
  ManagerBankAccountComponentPropsType;

export interface SubscriptionChartComponentPropsType {
  chart: CreditCardSubscriptionChartType;
}

export interface SubscriptionComponentPropsType {
  subscription?: CreditCardSubscriptionType;
}

export interface LabledCheckboxComponentPropsType {
  label: string;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export interface TooltipComponentPropsType {
  content: string;
  children: ReactNode;
}

export interface DatePickerComponentPropsType {
  className?: string;
  isOpened: boolean;
  closeFn: () => void;
  onSubmit?: (date: moment.Moment) => void;
}

export interface DatePickerInputComponentPropsType {
  onChange?: (date: moment.Moment) => void;
  label: string;
  error?: string;
  className?: string;
  placeholder: string;
}

export interface SheetComponentPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
  children: ReactNode;
  className?: string;
}

export interface SearchFinancialDashboardPropsType {
  onChange?: (val: string) => void;
}

export interface FinancialFatorsDashboardTablePropsType {
  data: {
    type: 'cashOut' | 'cartToCart' | 'add';
    amount: number;
    createdAt: string;
    status: 'successfull' | 'unsuccessfull';
    id: number;
  }[];
  className?: string;
}

export interface FilterCustomClubPageComponentPropsType {
  onChange?: (val: 'shoppingCentre' | 'hotel') => void;
  totalScore: number;
}

export interface ToggleButtonsPropsType {
  className?: string;
  buttons: [string, string];
  onChange?: (index: number) => void;
  width: string;
}

export interface CustomersClubTablePropsType {
  className?: string;
  data: {
    company: {
      name: string;
      persianName: string;
      logo: string;
    };
    title: string;
    score: number;
    id: number;
    status: 'used' | 'unused' | 'active' | 'deactive';
    discount: {
      code: string;
      price: number;
      endsAt: string;
    };
  }[];
}

export interface TakeGiftRuleDialogPropsType extends DialogComponentPropsType {
  setGiftGainedDialogOpened: Dispatch<SetStateAction<boolean>>;
  setGiftGainErrorDialogOpened: Dispatch<SetStateAction<boolean>>;
}

export interface CustomerClubListTablePropsType {
  data: {
    title: string;
    createdAt: string;
    price: number;
    score: number;
  }[];
  className?: string;
}

export interface NotificationType {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  status: 'seen' | 'unseen' | 'important';
}

export interface NotificationComponentPropsType {
  data: NotificationType;
  className?: string;
}

export interface NotificationSheetPropsType {
  notifications: NotificationType[];
}

export interface NotificationSheetMobilePropsType
  extends NotificationSheetPropsType {
  index: number;
}

export interface FilterFavPageComponentPropsType {
  onChange?: (val: 'savedHotels' | 'savedBlogs') => void;
  favName: string;
}

export interface BlogComponentPropsType {
  image: string;
  mostVisited?: boolean;
  title: string;
  desc: string;
  createdAt: string;
  className?: string;
}

export interface CollectionComponentPropsType {
  className?: string;
  isDeletingByUser?: boolean;
  data: {
    id: number;
    images: [string, string, string];
    title: string;
  };
}

export interface FilterFavPageComponentPropsTypeOrginal {
  setDeleteState: Dispatch<SetStateAction<boolean>>;
  deleteState: boolean;
}

export interface PassnegersPageFilterComponentPropsType {
  onChange?: (val: string) => void;
  className?: string;
  dataNotEmpty: boolean;
}

export interface PassengersTableComponentPropsType {
  className?: string;
  data: {
    name: {
      firstName: string;
      lastName: string;
    };
    tell: string;
    id: number;
    meliCodeOrPassportNumber: string;
  }[];
}

export interface EditPassengerDialogPropsType extends DialogComponentPropsType {
  data:
    | {
        name: {
          firstName: string;
          lastName: string;
        };
        tell: string;
        id: number;
        meliCodeOrPassportNumber: string;
      }
    | undefined;
}

export interface DialogInputPassengersComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface LoadingComponentPropsType {
  className?: string;
}
