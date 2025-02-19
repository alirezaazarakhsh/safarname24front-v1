// Creating and exporting type of hooks of dashboard pages
export interface UseLocalStoragePropsType {
  value: string;
}

export interface UseLocalStorageReturnType {
  loading: boolean;
  data: string | null;
  setData: (value: string) => void;
  removeItem: () => void;
}
