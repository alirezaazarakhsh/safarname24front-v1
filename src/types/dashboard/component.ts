// Importing part
import {
  ButtonHTMLAttributes,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  SVGProps,
} from 'react';
import { IconsaxIconsPropsType, IconsName } from '../SvgProp';
import moment from 'jalali-moment';
import { UseFormReturn } from 'react-hook-form';
import {
  GETCustomerClubListItem,
  GETCustomerClubRoomListItem,
  GETCustomerClubShoppingCentreListItem,
  GETLegalProfile,
  GETNotificationItem,
  GETPassengerItem,
  GETPasssengers,
  GETReservation,
  GETReservationItem,
} from './api/get';
import { personalFormType, legalFormType } from '@/app/dashboard/profile/page';
import { reportTypes } from '@/components/dashboard/ticket/dialog/reportTicket';

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
  onChange?: (val: string) => void;
  loading: boolean;
}

export interface IconInputComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconsName;
  wholeClassName?: string;
}

export interface AllFactorsTableComponentPropsType {
  className?: string;
  loading: boolean;
  data: GETReservationItem[];
  refetch?: () => void;
}

export interface CustomPaginationComponentPropsType {
  className?: string;
  count: number;
  onChange?: (index: number) => void;
  loading?: boolean;
  activeIndex?: number;
  setActiveIndex?: Dispatch<SetStateAction<number>>;
}

export interface DialogComponentPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
  tryAgainFn?: () => void;
  isTryAgainRefetching?: boolean;
  refetch?: () => void;
  id?: number;
  phoneNumbers?: string[];
  infos?: string[];
}

export interface DeleteCollectionDialogPropsType
  extends DialogComponentPropsType {
  id: number;
}

export interface DeleteItemDialogPropsType
  extends DeleteCollectionDialogPropsType {
  type: 'hotel' | 'article';
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
  trackingCode: string;
}

export interface HotelAcceptSectionPropsType {
  className?: string;
  printFn?: () => void;
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
    paymentType: 'card-to-card' | 'portal';
    status: 'successfull' | 'unsucessfull';
  }[];
}

export interface InputAndLabelPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  validation?: string;
  label?: string;
  isValid?: boolean;
  reset?: () => void;
  hasIRIcon?: boolean;
  validationType?: 'text' | 'icon';
}

export interface CreditCardSelectionComponentPropsType {
  onChange: (selectedVal: string) => void;
}

export interface UploadComponentPropsType {
  onChange: (file: File | undefined) => void;
  className?: string;
  fetchURL?: string;
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
  loading?: boolean;
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
  loading?: boolean;
}

export interface ToggleButtonsPropsType {
  className?: string;
  buttons: [string, string];
  onChange?: (index: number) => void;
  width: string;
  defaultVal?: number;
}

export interface CustomersClubTablePropsType {
  className?: string;
  loading?: boolean;
  data?: GETCustomerClubShoppingCentreListItem[];
  paginationCount?: number;
  paginationActiveIndex: number;
  setPaginationActiveIndex: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
}

export interface RoomTablePropsType {
  className?: string;
  loading?: boolean;
  data?: GETCustomerClubRoomListItem[];
  refetch?: () => void;
  paginationCount?: number;
  paginationActiveIndex: number;
  setPaginationActiveIndex: Dispatch<SetStateAction<number>>;
}

export interface TakeGiftRuleDialogPropsType extends DialogComponentPropsType {
  setGiftGainedDialogOpened: Dispatch<SetStateAction<boolean>>;
  setGiftGainErrorDialogOpened: Dispatch<SetStateAction<boolean>>;
  type: 'room' | 'shoppingCentre';
  code: string;
  rules?: string;
}

export interface CustomerClubListTablePropsType {
  data: GETCustomerClubListItem[];
  className?: string;
  loading?: boolean;
  activeIndex?: number;
  setActiveIndex?: Dispatch<SetStateAction<number>>;
  paginationCount?: number;
}

export interface NotificationComponentPropsType {
  data: GETNotificationItem;
  className?: string;
}

export interface NotificationSheetMobilePropsType {
  index: number;
}

export interface FilterFavPageComponentPropsType {
  onChange?: (val: 'savedHotels' | 'savedBlogs') => void;
  favName: string;
  loading?: boolean;
}

export interface BlogComponentPropsType {
  onLikeClick: () => void;
  actualId: number;
  image: string;
  title: string;
  desc: string;
  createdAt: string;
  className?: string;
}

export interface FavItemComponentPropsType {
  className?: string;
  isDeletingByUser?: boolean;
  loading?: boolean;
  refetch: () => void;
  data: {
    id: number;
    title: string;
  };
}

export interface CollectionComponentPropsType {
  className?: string;
  isDeletingByUser?: boolean;
  loading?: boolean;
  refetch: () => void;
  data: {
    id: number;
    images: [string, string, string];
    title: string;
  };
}

export interface FilterFavPageComponentPropsTypeOrginal {
  setDeleteState: Dispatch<SetStateAction<boolean>>;
  deleteState: boolean;
  loading?: boolean;
  listIsEmpty?: boolean;
  refetch?: () => void;
}

export interface PassnegersPageFilterComponentPropsType {
  onChange?: (val: string) => void;
  className?: string;
  dataNotEmpty: boolean;
  loading?: boolean;
  refetch?: () => void;
  phoneNumbers: string[];
}

export interface PassengersTableComponentPropsType {
  refetch?: () => void;
  className?: string;
  loading?: boolean;
  data: GETPasssengers['results'];
  paginationCount?: number;
  paginationActiveIndex: number;
  setPaginationActiveIndex: Dispatch<SetStateAction<number>>;
}

export interface EditPassengerDialogPropsType extends DialogComponentPropsType {
  data?: GETPassengerItem;
  id?: number;
}

export interface DialogInputPassengersComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface LoadingComponentPropsType {
  className?: string;
}

export interface ProfileTogglerComponentPropsType {
  className?: string;
  defaultVal?: 'personal' | 'legal';
  onToggleChange?: (val: 'personal' | 'legal') => void;
}

export interface CartBalanceComponentPropsType {
  className?: string;
  hasMobileView?: boolean;
}

export interface SubscriptionTypeComponentPropsType {
  className?: string;
}

export interface LegalUserStatusPropsType {
  className?: string;
  status?: 'checking' | 'accpeted' | 'rejected';
  rejectReason?: string;
}

export interface PersonalInfoFormComponentPropsType {
  className?: string;
  form: UseFormReturn<personalFormType>;
  loading?: boolean;
}

export interface NormalInputComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  wholeClassName?: string;
  noErrorText?: boolean;
}

export interface BankInfoFormComponentPropsType {
  className?: string;
  form: UseFormReturn<personalFormType>;
  userImage?: string;
}

export interface LegalBankInfoFormComponentPropsType {
  className?: string;
  form: UseFormReturn<legalFormType>;
  loading: boolean;
  userImage?: string;
  refetch?: () => void;
  creditCards?: GETLegalProfile['card_numbers'];
  userStatus?: {
    status?: 'checking' | 'accpeted' | 'rejected';
    rejectReason?: string;
  };
}

export interface LegalInfoFormComponentPropsType {
  className?: string;
  form: UseFormReturn<legalFormType>;
  loading: boolean;
}

export interface DescriptionProfileComponentPropsType {
  className?: string;
}

export interface LegalNotesProfileComponentPropsType {
  className?: string;
}

export interface ErrorTableComponentPropsType {
  className?: string;
  refetch?: () => void;
}

export interface EmptyTableComponentPropsType {
  className?: string;
  title?: string;
  description?: string;
}

export interface UploadSheetComponentPropsType {
  files: File[];
  onDelete?: (index: number) => void;
}

export interface UploadedFileComponentPropsType {
  isLastItem?: boolean;
  index: number;
  onDelete?: (index: number) => void;
  data?: File;
}

export type BankNameType =
  | 'ayandeh'
  | 'markazi'
  | 'blue'
  | 'caspian'
  | 'dey'
  | 'eghtesaade-novin'
  | 'future'
  | 'gardeshgari'
  | 'iran-europe'
  | 'iran-venezuela'
  | 'iran-zamin'
  | 'karafarin'
  | 'keshavarzi'
  | 'khavar-mianeh'
  | 'maskan'
  | 'mehr-iran'
  | 'melall'
  | 'mellat'
  | 'melli'
  | 'noor'
  | 'parsian'
  | 'pasargad'
  | 'post'
  | 'refah'
  | 'resalat'
  | 'saderat'
  | 'saman'
  | 'sanat-madan'
  | 'sarmayeh'
  | 'sepah'
  | 'shahr'
  | 'sina'
  | 'standard-chartered'
  | 'taavon-eslami'
  | 'tejarat'
  | 'tosee'
  | 'tosee-sedarat'
  | 'tossee-taavon'
  | 'kosar'
  | 'mehr-eghtesaad'
  | 'ghavamin'
  | 'hekmat'
  | 'ansar'
  | 'unknown';

export interface BankIconPropsType extends SVGProps<SVGSVGElement> {
  name: BankNameType;
  isColored?: boolean;
}

export interface CreditCardInputPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  isValid: boolean;
  validation: string;
  reset?: () => void;
  error?: string;
  setValue: (number: string, sheba: string) => void;
  valueOfShabaNumber?: string;
}

export interface CreditCardDropDownPropsType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  useLegalInfo?: {
    id: number;
    card_number: string;
    iban: string;
  }[];
  placeholder?: string;
  value?: string;
  side?: 'top' | 'bottom';
  onValueChange?: (card: string, shaba: string) => void;
  hasIRIcon?: boolean;
  useSheba?: boolean;
  reset?: () => void;
}

export interface CustomerClubGiftGainedPropsType
  extends DialogComponentPropsType {
  code: string;
}

export interface TicketsSettingItemPropsType {
  className?: string;
  title: string;
  subTitle?: string;
  icon: IconsName;
  size?: 'lg' | 'sm';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'files' | 'theme' | 'walpaper';
  files?: string[];
  setMobileActiveTab?: Dispatch<SetStateAction<string>>; // Mobile only
  mobileActiveTab?: string; // Mobile only
}

export interface TicketsDateSepratorPropsType {
  date: string;
  className?: string;
}

export interface TicketsSendMessagePropsType {
  className?: string;
  disabled?: boolean;
  isClosed?: boolean;
  reportTypes?: reportTypes;
  clearReply?: () => void;
  reply: {
    name: string;
    message: string;
  };
}

export interface TicketItemPropsType {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'active' | 'prevois';
  newNotifications?: number;
  lastItem?: boolean;
  data?: {
    img?: string;
    title: string;
    subTitle: string;
    createdAt: string;
  };
}
export interface TicketsSelectDepartmentPropsType {
  isOpened?: boolean;
  className?: string;
  closeFn?: () => void;
}

export interface TicketsRadioItemProps {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  label: string;
}

export interface TicketsContextType {
  id: number;
  status: 'open' | 'closed';
  report?: reportTypes;
  user: {
    img?: string;
    name: string;
    status: string;
    lastSeen: string;
    role: string;
  };
  files: {
    documents: string[];
    images: string[];
    videos: string[];
    voices: string[];
  };
  messages: {
    type: 'text' | 'voice' | 'file';
    replyMessage?: string;
    message: string;
    createdAt: string;
    answererName: string;
    from: 'user' | 'answerer';
  }[];
}

export interface TicketsContextPropsType {
  className?: string;
  tickets: {
    currentTickets: TicketsContextType[];
    previousTickets: {
      date: string;
      tickets: TicketsContextType[];
    }[];
  };
}

export interface TicketsFileItemPropsType {
  className?: string;
  file: string;
}

export interface AudioWaveHandle {
  play: () => void;
  pause: () => void;
  isPlaying: () => boolean;
  getDuration: () => number | null;
}

export interface AudioWavePropsType {
  audioUrl: string;
  className?: string;
  backgroundColor?: string;
  progressColor?: string;
}

export interface MessageItemPropsType {
  className?: string;
  setReply?: (message: string, name: string) => void;
  data: {
    type: 'text' | 'voice' | 'file';
    replyMessage?: string;
    message: string;
    createdAt: string;
    from: 'user' | 'answerer';
    answererName: string;
  };
}

export interface TicketsNavBarPropsType {
  className?: string;
  activeTabState: string;
  setActiveTabState: Dispatch<SetStateAction<string>>;
}

export interface VoiceRecorderPropsType {
  className?: string;
  onChange?: (audioblob: Blob) => void;
}
