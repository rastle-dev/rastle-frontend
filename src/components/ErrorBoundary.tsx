import React, { Component, ReactNode } from "react";

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

  handleTryAgainClick = (): void => {
    // Reset the error state when "Try again?" button is clicked
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    // 'props' 객체에서 'hasError' 및 'children' 속성을 추출하기 위한 구조 분해 할당
    const { hasError } = this.state;

    // 에러가 발생했는지 확인
    if (hasError) {
      // 사용자 정의 대체 UI를 렌더링할 수 있습니다
      return (
        <div>
          <h2>이런, 오류가 발생했습니다!</h2>
          <button type="button" onClick={this.handleTryAgainClick}>
            다시 시도?
          </button>
        </div>
      );
    }

    // 'props'에서 'children' 속성을 추출하기 위한 구조 분해 할당
    const { children } = this.props;

    // 에러가 없는 경우 자식 컴포넌트 반환
    return children;
  }
}

export default ErrorBoundary;
