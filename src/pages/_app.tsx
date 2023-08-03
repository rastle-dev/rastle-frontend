import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";
import DefaultLayout from "@/components/common/Layout/DefaultLayout";
import MainLayout from "@/components/common/Layout/MainLayout";

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
@media (min-width: 768px) and (max-width: 1024px) {
  html {
    font-size: 13px;
  }
}
@media (min-width: 1025px) and (max-width: 1440px) {
  html {
    font-size: 10px;
  }
}
@media (min-width: 1441px) and (max-width: 1919px) {
  html {
    font-size: 13px;
  }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  html {
    font-size: 17px;
  }
}
@media (min-width: 2560px) {
  html {
    font-size: 18px;
  }
}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream1.otf") format('opentype');
  font-weight: 800;
}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream2.otf") format('opentype');
  font-weight: 200;
}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream3.otf") format('opentype');
  font-weight: 300;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream4.otf") format('opentype');
  font-weight: 400  ;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream5.otf") format('opentype');
  font-weight: 500;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream6.otf") format('opentype');
  font-weight: 600;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream7.otf") format('opentype');
  font-weight: 700;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream8.otf") format('opentype');
  font-weight: 800;

}
@font-face {
  font-family: 'EscoreDream';
  src: url("/font/SCDream9.otf") format('opentype');
  font-weight: 900;
}
`;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Comp: React.ComponentType<any>) => {
    // DefaultLayout을 띄울 page 이름을 해당 컴포넌트에 선언하면 됩니다.
    // 선언 방식 : LoginPage.displayName = "Login";
    if (Comp.displayName === "Login" || Comp.displayName === "Signup") {
      return (
        <DefaultLayout>
          <Comp {...pageProps} />
        </DefaultLayout>
      );
    }
    return (
      <MainLayout>
        <Comp {...pageProps} />
      </MainLayout>
    );
  };

  const Layout = <>{getLayout(Component)}</>;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        {Layout}
      </Hydrate>
    </QueryClientProvider>
  );
}
