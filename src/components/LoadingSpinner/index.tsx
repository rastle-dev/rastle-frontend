// styles.js (또는 .tsx) 파일을 생성하여 스타일 컴포넌트를 정의합니다.

import styled, { keyframes } from "styled-components";
import COLORS from "@/constants/color";

// 키 프레임 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 로딩 스피너 스타일 컴포넌트
export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* 로딩 스피너의 높이 조절 */
`;

export const LoadingSpinner = styled.div`
  border: 2px solid ${COLORS.GREY[200]};
  border-top: 2px solid ${COLORS.BLACK};
  border-radius: 50%;
  width: 40px; /* 로딩 스피너의 너비 조절 */
  height: 40px; /* 로딩 스피너의 높이 조절 */
  animation: ${rotate} 1s linear infinite;
`;
