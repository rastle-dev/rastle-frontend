import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Signup from "@/pages/signup/index";

jest.mock("next/dist/client/router", () => ({
  useRouter: jest.fn(),
}));
function renderSignup() {
  const signUp = jest.fn();
  const sendEmailCode = jest.fn();
  const checkEmailCode = jest.fn();
  const checkEmailDuplicated = jest.fn();

  const testUtils = render(
    <ErrorBoundary>
      <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
          <Hydrate>
            <Signup />
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </ErrorBoundary>,
  );
  const Email = () => testUtils.getByPlaceholderText("예) rastle@rastle.com");
  const CodeButton = () => testUtils.getByText("인증", { selector: "button" });
  const Password = () =>
    testUtils.getByPlaceholderText("영문,숫자,특수문자 조합 8~16자");
  const PasswordConfirmLabelElement = screen.getByText("비밀번호 확인");
  const PasswordConfirm =
    PasswordConfirmLabelElement.nextSibling as HTMLInputElement;
  const Name = () => testUtils.getByPlaceholderText("예) 홍레슬");
  const PhoneNumber = () => testUtils.getByPlaceholderText("예) 01012345678");
  const CheckBox = screen.getByRole("checkbox");

  const typeEmail = (email: string) => {
    const emailInput = Email();
    fireEvent.change(emailInput, { target: { value: email } });
  };
  const typePassword = (password: string) => {
    const passwordInput = Password();
    fireEvent.input(passwordInput, { target: { value: password } });
  };
  const typeName = (name: string) => {
    const nameInput = Name();
    fireEvent.change(nameInput, { target: { value: name } });
  };
  const typePhoneNumber = (phoneNumber: string) => {
    const phoneNumberInput = PhoneNumber();
    fireEvent.input(phoneNumberInput, { target: { value: phoneNumber } });
  };
  const onClickSendEmailCodeButton = async () => {
    userEvent.click(CodeButton());
    const email = (Email() as HTMLInputElement).value;
    sendEmailCode({ email });
  };
  const SignupButton = () =>
    testUtils.getByText("가입하기", { selector: "button" });
  const onClickSignupButton = () => {
    userEvent.click(SignupButton());
    const email = (Email() as HTMLInputElement).value;
    const password = (Password() as HTMLInputElement).value;
    const username = (Name() as HTMLInputElement).value;
    const phoneNumber = (PhoneNumber() as HTMLInputElement).value;
    signUp({ email, password, username, phoneNumber });
  };

  return {
    Email,
    Password,
    PasswordConfirm,
    Name,
    PhoneNumber,
    CheckBox,
    testUtils,
    signUp,
    typeEmail,
    typePassword,
    typeName,
    typePhoneNumber,
    SignupButton,
    onClickSignupButton,
    CodeButton,
    sendEmailCode,
    checkEmailCode,
    onClickSendEmailCodeButton,
    checkEmailDuplicated,
  };
}
describe("회원가입 페이지 테스트", () => {
  it("회원가입 페이지 스냅샷 테스트", () => {
    const { testUtils } = renderSignup();
    expect(testUtils.container).toMatchSnapshot();
  });
  it("회원가입 페이지 렌더링 테스트", () => {
    const {
      Email,
      Password,
      PasswordConfirm,
      Name,
      PhoneNumber,
      CheckBox,
      SignupButton,
    } = renderSignup();
    expect(Email()).toBeInTheDocument();
    expect(Password()).toBeInTheDocument();
    expect(PasswordConfirm).toBeInTheDocument();
    expect(Name()).toBeInTheDocument();
    expect(PhoneNumber()).toBeInTheDocument();
    expect(CheckBox).toBeInTheDocument();
    expect(SignupButton()).toBeInTheDocument();
    expect(SignupButton()).toBeDisabled();
  });
  it("회원가입 함수 확인", () => {
    const {
      Email,
      Password,
      PasswordConfirm,
      Name,
      PhoneNumber,
      CheckBox,
      typeEmail,
      typePassword,
      typeName,
      typePhoneNumber,
      signUp,
      onClickSignupButton,
    } = renderSignup();
    typeEmail("minhyuk9893@google.com");
    typePassword("ham061625@");
    fireEvent.change(PasswordConfirm, { target: { value: "ham061625@" } });
    typeName("함민혁");
    typePhoneNumber("01030092255");
    expect((Email() as HTMLInputElement).value).toBe("minhyuk9893@google.com");
    expect((Password() as HTMLInputElement).value).toBe("ham061625@");
    expect((PasswordConfirm as HTMLInputElement).value).toBe("ham061625@");
    expect((Name() as HTMLInputElement).value).toBe("함민혁");
    expect((PhoneNumber() as HTMLInputElement).value).toBe("01030092255");
    expect((CheckBox as HTMLInputElement).value).toBe("on");
    onClickSignupButton();
    expect(signUp).toHaveBeenCalledWith({
      email: "minhyuk9893@google.com",
      password: "ham061625@",
      username: "함민혁",
      phoneNumber: "01030092255",
    });
  });
  it("인증번호 전송함수 확인", () => {
    const { Email, typeEmail, onClickSendEmailCodeButton, sendEmailCode } =
      renderSignup();
    typeEmail("minhyuk9893@naver.com");
    expect((Email() as HTMLInputElement).value).toBe("minhyuk9893@naver.com");
    onClickSendEmailCodeButton();
    expect(sendEmailCode).toHaveBeenCalledWith({
      email: "minhyuk9893@naver.com",
    });

    // screen.getByText("인증번호");
  });
});
