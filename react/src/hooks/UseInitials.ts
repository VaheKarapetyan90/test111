import { useMemo } from "react";

export function useInitials(name: string) {
  return useMemo(() => {
    const words = name.split(/\s+/);
    const initials = words
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
    return initials;
  }, [name]);
}
