import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Timer } from "@/styles/product/index.styles";

export default function CountDownTimer({ endDate }: { endDate: string }) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    // endDate를 dayjs 객체로 파싱합니다.
    const endDateTime = dayjs(endDate);

    // 1초마다 현재 시간과 종료 시간 간의 차이를 계산하여 remainingTime 상태를 업데이트합니다.
    const interval = setInterval(() => {
      const now = dayjs();
      const diffSeconds = endDateTime.diff(now, "second");
      setRemainingTime(diffSeconds > 0 ? diffSeconds : 0);
    }, 1000);

    // 컴포넌트가 언마운트되면 clearInterval을 사용하여 interval을 정리합니다.
    return () => clearInterval(interval);
  }, [endDate]);

  // 초를 남은 일, 시간, 분, 초로 변환합니다.
  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;
  return (
    <Timer>
      {remainingTime > 0 ? (
        <p>{`${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`}</p>
      ) : (
        <p>이벤트가 종료되었습니다.</p>
      )}
    </Timer>
  );
}
