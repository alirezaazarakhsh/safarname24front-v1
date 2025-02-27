// Importing part
import { useEffect, useState } from "react";
import {
  UseLocalStoragePropsType,
  UseLocalStorageReturnType,
} from "@/types/dashboard/hook";

// Creating and exporting useLocalStorage custom hook as default
// This function gets and sets local storage
export default function useLocalStorage({
  value,
}: UseLocalStoragePropsType): UseLocalStorageReturnType {
  // Defining states of component
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string | null>(null);

  // Using useEffect to value of local storage item. if its not there the value would be null
  useEffect(() => {
    const localStorageItem = localStorage.getItem(value);

    if (localStorageItem) {
      setData(localStorageItem);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
    }
  }, [value]);

  // Setting local storage item when data state is changed
  useEffect(() => {
    if (data) {
      localStorage.setItem(value, data);
    }
  }, [data, value]);

  // Defining a function to remove local storage item
  function removeItem(): void {
    localStorage.removeItem(value);
    setData(null);
  }

  // Returning things to use later
  return {
    loading,
    data,
    setData,
    removeItem,
  };
}
