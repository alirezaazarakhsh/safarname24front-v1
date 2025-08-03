import { createContext, useReducer, useContext, ReactNode } from 'react';

type AddComment = {
  star: number | null;
  description: string;
  standards: Array<{ id: number; title: string; value: number }>;
  positivePoints: Array<{ id: number; title: string; isSelected: boolean }>;
  negativePoints: Array<{ id: number; title: string; isSelected: boolean }>;
};

type AddCommentAction =
  | { type: 'STAR'; payload: { star: number } }
  | { type: 'DESCRIPTION'; payload: { description: string } }
  | {
      type: 'STANDARDS-INIT';
      payload: Array<{ id: number; title: string; value: number }>;
    }
  | { type: 'STANDARDS-CHANGE'; payload: { id: number; value: number } }
  | {
      type: 'POSITIVE-POINTS-INIT';
      payload: Array<{ id: number; title: string; isSelected: boolean }>;
    }
  | { type: 'POSITIVE-POINTS-CHANGE'; payload: { id: number } }
  | {
      type: 'NEGATIVE-POINTS-INIT';
      payload: Array<{ id: number; title: string; isSelected: boolean }>;
    }
  | { type: 'NEGATIVE-POINTS-CHANGE'; payload: { id: number } };

const initialState: AddComment = {
  star: null,
  standards: [],
  description: '',
  positivePoints: [],
  negativePoints: [],
};

// --------------------------------------

const CommentReducer = (
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

    case 'STANDARDS-INIT':
      return {
        ...state,
        standards: payload,
      };

    case 'STANDARDS-CHANGE':
      return {
        ...state,
        standards: state.standards.map((standard) =>
          standard.id === payload.id
            ? { ...standard, value: payload.value }
            : standard,
        ),
      };

    case 'POSITIVE-POINTS-INIT':
      return {
        ...state,
        positivePoints: payload,
      };

    case 'POSITIVE-POINTS-CHANGE':
      return {
        ...state,
        positivePoints: state.positivePoints.map((point) =>
          point.id === payload.id
            ? { ...point, isSelected: !point.isSelected }
            : point,
        ),
      };

    case 'NEGATIVE-POINTS-INIT':
      return {
        ...state,
        negativePoints: payload,
      };

    case 'NEGATIVE-POINTS-CHANGE':
      return {
        ...state,
        negativePoints: state.negativePoints.map((point) =>
          point.id === payload.id
            ? { ...point, isSelected: !point.isSelected }
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
  const [state, dispatch] = useReducer(CommentReducer, initialState);

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
