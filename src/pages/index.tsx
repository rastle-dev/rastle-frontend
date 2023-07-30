//경로 / 홈화면
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <li>
        <ul>
          <Link href="/login">로그인</Link>
        </ul>
        <ul>
          <Link href="/shop">쇼핑하기</Link>
        </ul>
        <ul>
          <Link href="/community">커뮤니티</Link>
        </ul>
      </li>
    </div>
  );
}
