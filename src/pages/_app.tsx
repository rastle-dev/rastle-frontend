import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";

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
    font-size: 9px;
  }
}
@media (min-width: 1025px) and (max-width: 1440px) {
  html {
    font-size: 10px;
  }
}
@media (min-width: 1441px) and (max-width: 1919px) {
  html {
    font-size: 11px;
  }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  html {
    font-size: 12px;
  }
}
@media (min-width: 2560px) {
  html {
    font-size: 13px;
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
  font-weight: 400;

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
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
