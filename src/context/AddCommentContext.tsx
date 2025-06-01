import { createContext, useReducer, useContext, ReactNode } from 'react';

type AddComment = {
  star: number | null;
  description: string;
  standards: Array<{ title: string; value: number }>;
  positivePoints: { title: string; isSelected: boolean }[];
  negativePoints: { title: string; isSelected: boolean }[];
};

type AddCommentAction =
  | { type: 'STAR'; payload: { star: number } }
  | { type: 'DESCRIPTION'; payload: { description: string } }
  | { type: 'STANDARDS'; payload: { title: string; value: number } }
  | { type: 'POSITIVE-POINTS'; payload: { title: string } }
  | {
      type: 'NEGATIVE-POINTS';
      payload: { title: string };
    };

const initialState: AddComment = {
  star: null,
  description: '',
  standards: [
    { title: 'وضعیت نظافت', value: 0 },
    { title: 'موقعیت مکانی و دسترسی', value: 0 },
    { title: 'امکانات اقامتگاه', value: 0 },
    { title: 'رعایت پروتکل های بهداشتی', value: 0 },
    { title: 'خوشرویی و رفتار کارکنان', value: 0 },
    { title: 'کیفیت غذا و پذیرایی', value: 0 },
    { title: 'خدمات سرویس دهی', value: 0 },
  ],
  positivePoints: [
    { title: 'وضعیت نظافت', isSelected: false },
    { title: 'موقعیت مکانی و دسترسی', isSelected: false },
    { title: 'امکانات اقامتگاه', isSelected: false },
    { title: 'رعایت پروتکل های بهداشتی', isSelected: false },
  ],
  negativePoints: [
    { title: 'عدم رعایت بهداشت محیط', isSelected: false },
    { title: 'قطعی برق', isSelected: false },
    { title: 'بدرفتاری پرسنل هتل', isSelected: false },
    { title: 'قیمت گران و عدم کیفیت متقابل', isSelected: false },
    { title: 'عدم رعایت حقوق مهمانان اقامتگاه', isSelected: false },
  ],
};

// --------------------------------------

const authReducer = (
  state: AddComment,
  action: AddCommentAction,
): AddComment => {
  const { type, payload } = action;

  switch (type) {
    case 'STAR':
      return {
        ...state,
        star: state.star === payload.star ? null : payload.star,
      };

    case 'DESCRIPTION':
      return {
        ...state,
        description: payload.description,
      };

    case 'STANDARDS':
      return {
        ...state,
        standards: state.standards.map((standard) =>
          standard.title === payload.title
            ? { title: payload.title, value: payload.value }
            : standard,
        ),
      };

    case 'POSITIVE-POINTS':
      return {
        ...state,
        positivePoints: state.positivePoints.map((point) =>
          point.title === payload.title
            ? { title: payload.title, isSelected: !point.isSelected }
            : point,
        ),
      };

    case 'NEGATIVE-POINTS':
      return {
        ...state,
        negativePoints: state.negativePoints.map((point) =>
          point.title === payload.title
            ? { title: payload.title, isSelected: !point.isSelected }
            : point,
        ),
      };

    default:
      return state;
  }
};

const AddCommentContext = createContext<AddComment | undefined>(undefined);
const AddCommentDispatchContext = createContext<
  React.Dispatch<AddCommentAction> | undefined
>(undefined);

// --------------------------------------

export const AddCommentProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AddCommentContext.Provider value={state}>
      <AddCommentDispatchContext.Provider value={dispatch}>
        {children}
      </AddCommentDispatchContext.Provider>
    </AddCommentContext.Provider>
  );
};

export const useAddCommentContext = () => {
  const context = useContext(AddCommentContext);
  if (context === undefined) {
    throw new Error(
      '"useAddCommentContext" must be used in "AddCommentProvider"',
    );
  }
  return context;
};

export const useAddCommentDispatch = () => {
  const context = useContext(AddCommentDispatchContext);
  if (context === undefined) {
    throw new Error(
      '"useAddCommentDispatch" must be used in "AddCommentProvider"',
    );
  }
  return context;
};
