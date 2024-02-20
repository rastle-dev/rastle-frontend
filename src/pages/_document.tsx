// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";
import LazyHydrate from "react-lazy-hydration";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* 다른 head 요소들을 여기에 추가할 수 있습니다. */}
          <meta
            name="google-site-verification"
            content="Nc_sSvyarboeB2_SdcMBbEu7iqNn_X870XSMbakjGKg"
          />
          <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="beforeInteractive"
          />
          <link
            rel="preload"
            href="../../public/font/S-CoreDream-4Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          {/*<LazyHydrate whenVisible>*/}
          <NextScript />
          {/*</LazyHydrate>*/}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
