import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

interface CountdownTimerProps {
  startDate: string | undefined;
  endDate: string | undefined;
}
export default function CountdownTimer({
  startDate,
  endDate,
}: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(
    dayjs(endDate).diff(dayjs(), "second"),
  );

  useEffect(() => {
    const startDateTime = dayjs(startDate);
    const endDateTime = dayjs(endDate);

    // 현재 시간이 시작 시간보다 이전인 경우에는 이벤트가 시작되지 않았음을 나타냅니다.
    if (dayjs().isBefore(startDateTime)) {
      setRemainingTime(-1); // -1은 이벤트가 시작되지 않았음을 나타냅니다.
      return () => {};
    }

    const interval = setInterval(() => {
      const now = dayjs();
      const diffSeconds = endDateTime.diff(now, "second");
      setRemainingTime(diffSeconds > 0 ? diffSeconds : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  if (remainingTime === -1) {
    return (
      <div>
        <p>이벤트 시작 전입니다.</p>
      </div>
    );
  }

  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      {remainingTime > 0 ? (
        <p>{`${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`}</p>
      ) : (
        <p>이벤트가 종료되었습니다.</p>
      )}
    </div>
  );
}
