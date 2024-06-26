import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import MainLayout from "@/components/Layout/MainLayout";
import "../styles/font.css";
import StyledContainer from "@/components/Toast/container";
import ErrorBoundary from "@/components/ErrorBoundary";
import Head from "next/head";
import { useEffect, useState } from "react";
import IsOnline from "@/components/Home/IsOnline";

const GlobalStyle = createGlobalStyle`
html,
body {
  font-family: "EscoreDream", sans-serif ;
  font-size: 100%;
  padding: 0;
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
* {
font-family: "EscoreDream", sans-serif ;
  font-weight: 500;
  box-sizing: border-box;
}
@media (max-width: 374px) {
  html {
    font-size: 7.5px;
  }
}
@media (min-width: 375px) and (max-width: 767px) {
  html {
    font-size: 8px;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  html {
    font-size: 9px;
  }
}
@media (min-width: 1025px) and (max-width: 1440px) {
  html {
    font-size: 11px;
  }
}
@media (min-width: 1441px) and (max-width: 1919px) {
  html {
    font-size: 11px;
  }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  html {
    font-size: 13px;
  }
}
@media (min-width: 2560px) {
  html {
    font-size: 14px;
  }
}
`;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  const getLayout = (Comp: React.ComponentType<any>) => {
    // DefaultLayout을 띄울 page 이름을 해당 컴포넌트에 선언하면 됩니다.
    // 선언 방식 : LoginPage.displayName = "Login";
    if (Comp.displayName === "User") {
      return (
        <DefaultLayout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <Comp {...pageProps} />
        </DefaultLayout>
      );
    }
    return (
      <MainLayout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Comp {...pageProps} />
      </MainLayout>
    );
  };

  const Layout = <>{getLayout(Component)}</>;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <StyledContainer
          className="toast"
          position="top-center"
          closeButton={false}
        />
        <RecoilRoot>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            {isOnline && Layout}
            {!isOnline && <IsOnline />}
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
