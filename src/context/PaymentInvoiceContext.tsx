'use client';

import { createContext, useReducer, useContext } from 'react';

type Type = {
  halfCharges: number;
  discountCode: number;
  extraPassengers: number;
};

type Actions =
  | { type: 'discount-code'; actionType: 'add'; payload: number }
  | { type: 'discount-code'; actionType: 'remove'; payload: undefined }
  | { type: 'extra-passengers'; actionType: 'add'; payload: number }
  | { type: 'extra-passengers'; actionType: 'remove'; payload: number }
  | { type: 'half-charges'; actionType: 'add'; payload: number }
  | { type: 'half-charges'; actionType: 'remove'; payload: number }
  | {
      type: 'first-render';
      actionType: null;
      payload: {
        halfCharges: number;
        discountCode: number;
        extraPassengers: number;
      };
    };

const initialState: Type = {
  halfCharges: 0,
  discountCode: 0,
  extraPassengers: 0,
};

// ---------------------------

const reducerFn = (state: Type, action: Actions): Type => {
  const { type, actionType, payload } = action;

  switch (type) {
    case 'discount-code':
      return { ...state, discountCode: actionType === 'add' ? payload : 0 };

    case 'extra-passengers':
      return {
        ...state,
        extraPassengers:
          actionType === 'add'
            ? state.extraPassengers + payload
            : state.extraPassengers - payload,
      };

    case 'half-charges':
      return {
        ...state,
        halfCharges:
          actionType === 'add'
            ? state.halfCharges + payload
            : state.halfCharges - payload,
      };

    case 'first-render':
      return payload;

    default:
      return state;
  }
};

const Context = createContext<Type | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Actions> | undefined>(
  undefined,
);

// ---------------------------

export const PaymentInvoiceProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

export const usePaymentInvoiceContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      '"usePaymentInvoiceContext" must be used in "PaymentInvoiceProvider"',
    );
  }
  return context;
};

export const usePaymentInvoiceDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      '"usePaymentInvoiceDispatch" must be used in "PaymentInvoiceProvider"',
    );
  }
  return context;
};
