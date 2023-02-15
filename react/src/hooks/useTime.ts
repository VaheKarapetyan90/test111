import { useState, useEffect } from "react";

export const useTime = (props: any) => {
  const [hour, setHour] = useState<any>(null);
  const [minute, setMinute] = useState<any>(null);

  useEffect(() => {
    const date = props !== undefined ? new Date(props) : new Date();
    setHour(
      date?.getHours().toLocaleString().length < 2
        ? `0${date?.getHours()}`
        : date?.getHours()
    );
    setMinute(
      date?.getMinutes().toLocaleString().length < 2
        ? `0${date?.getMinutes()}`
        : date?.getMinutes()
    );
  }, [props]);

  return [hour, minute];
};
