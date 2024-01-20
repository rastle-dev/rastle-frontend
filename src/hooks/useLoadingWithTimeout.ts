import { useEffect, useState } from "react";

export default function useLoadingWithTimeout(
  isLoading: boolean,
  isSubLoading?: boolean,
) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isLoading || isSubLoading) {
      timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
    } else {
      setTimedOut(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading, isSubLoading]);

  return { timedOut };
}
