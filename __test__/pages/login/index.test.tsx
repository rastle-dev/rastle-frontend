import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "@/pages/login/index";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

jest.mock("next/dist/client/router", () => ({
  useRouter: jest.fn(),
}));

function renderLogin() {
  const mutateLogin = jest.fn();

  const testUtils = render(
    <ErrorBoundary>
      <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
          <Hydrate>
            <Login />
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </ErrorBoundary>,
  );

  const Email = () => testUtils.getByPlaceholderText("예) rastle@rastle.com");
  const PasswordLabelElement = screen.getByText("비밀번호");
  const Password = PasswordLabelElement.nextSibling as HTMLInputElement;
  const typeEmail = (email: string) => {
    const emailInput = Email();
    fireEvent.change(emailInput, { target: { value: email } });
  };

  const typePassword = (password: string) => {
    fireEvent.input(Password, { target: { value: password } });
  };

  const LoginButton = () =>
    testUtils.getByText("로그인", { selector: "button" });

  const onClickLoginButton = () => {
    userEvent.click(LoginButton());
    const email = (Email() as HTMLInputElement).value;
    const password = (Password as HTMLInputElement).value;
    mutateLogin({ email, password });
  };
  return {
    Email,
    Password,
    testUtils,
    mutateLogin,
    typeEmail,
    typePassword,
    LoginButton,
    onClickLoginButton,
  };
}
describe("로그인 페이지 테스트", () => {
  it("로그인 페이지 스냅샷 테스트", () => {
    const { testUtils } = renderLogin();
    expect(testUtils.container).toMatchSnapshot();
  });
  it("로그인 페이지 렌더링 테스트", () => {
    const { Email, Password, LoginButton } = renderLogin();
    expect(Email()).toBeInTheDocument();
    expect(Password).toBeInTheDocument();
    expect(LoginButton()).toBeInTheDocument();
  });
  it("mutateLogin 함수 테스트", async () => {
    const {
      Email,
      Password,
      typeEmail,
      typePassword,
      onClickLoginButton,
      mutateLogin,
    } = renderLogin();

    typeEmail("minhyuk9893@google.com");
    typePassword("ham061625@");

    onClickLoginButton();
    expect((Email() as HTMLInputElement).value).toBe("minhyuk9893@google.com");
    expect((Password as HTMLInputElement).value).toBe("ham061625@");

    expect(mutateLogin).toHaveBeenCalledWith({
      email: "minhyuk9893@google.com",
      password: "ham061625@",
    });
  });
});
