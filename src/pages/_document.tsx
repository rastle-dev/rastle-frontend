//meta 태그를 정의하거나, 전체 페이지에 관려하는 컴포넌트입니다.
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
