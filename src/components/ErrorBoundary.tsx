import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import * as S from "@/components/Home/SignupPopup/index.styles";
import Button from "@/components/Common/Button";
import COLORS from "@/constants/color";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  justify-content: center;
  height: 97.9vh;
  overflow: hidden;
  h2 {
    font-weight: 400;
  }
  h3 {
    font-weight: 300;
    width: 25rem;
    margin-bottom: 3rem;
    text-align: center;
    @media (max-width: 769px) {
      width: 20rem;
    }
  }
`;
const StyledButton = styled(Button)`
  background-color: ${COLORS.BLACK};
  color: ${COLORS.WHITE};
  border-radius: 5px;
  padding: 0.6rem 0 0.6rem 0;
  font-size: 0.8rem;
  border: none;

  &:hover {
    border: none;
    background-color: ${COLORS.BLACK};
    color: white;
  }
  margin-bottom: 0.7rem;
`;
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  // handleTryAgainClick = (): void => {
  //   // Reset the error state when "Try again?" button is clicked
  //   this.setState({ hasError: false });
  // };

  handleGoBackClick = (): void => {
    // Go back in the browser history when "Go back" button is clicked
    window.history.back();
    console.log(this.state); // 예시로 this를 사용하도록 추가
  };

  handleGoHomeClick = (): void => {
    // Navigate to the home page when "Go home" button is clicked
    // 예를 들어, '/'로 이동하도록 지정
    window.location.href = "/";
    console.log(this.state); // 예시로 this를 사용하도록 추가
  };

  render(): ReactNode {
    // 'props' 객체에서 'hasError' 및 'children' 속성을 추출하기 위한 구조 분해 할당
    const { hasError } = this.state;

    // 에러가 발생했는지 확인
    if (hasError) {
      // 사용자 정의 대체 UI를 렌더링할 수 있습니다
      return (
        <Wrap>
          <S.LOGOWrapper>
            <S.LOGOImage
              src="/image/LOGO_WHITE.png"
              alt="/image/LOGO_WHITE.png"
              layout="fill"
              objectFit="cover"
            />
          </S.LOGOWrapper>
          <h2>R E C O R D Y&nbsp;&nbsp; S L O W</h2>
          <h3>
            예상치 못한 오류가 발생하였습니다. 서버의 일시적인 장애이거나,
            네트워크 문제일 수 있습니다.관리자에게 요청하여 빠른 시 안에
            해결하겠습니다.
          </h3>
          <StyledButton
            type="default"
            width="16rem"
            title="뒤로가기"
            onClick={this.handleGoBackClick}
          />
          <StyledButton
            type="default"
            width="16rem"
            title="메인페이지로 돌아가기"
            onClick={this.handleGoHomeClick}
          />
        </Wrap>
      );
    }

    // 'props'에서 'children' 속성을 추출하기 위한 구조 분해 할당
    const { children } = this.props;

    // 에러가 없는 경우 자식 컴포넌트 반환
    return children;
  }
}

export default ErrorBoundary;
