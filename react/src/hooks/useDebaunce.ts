import { useEffect, useState } from "react";

export const useDebaunce = (value: string, duration: number) => {
  const [debounced, setDebounced] = useState(" ");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, duration);

    return () => clearTimeout(handler);
  }, [value, duration]);

  return debounced;
};
