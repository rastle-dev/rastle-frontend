import Link from "next/link";
import React from "react";
import {
  Wrapper,
  InnerNav,
  LeftElement,
  CenterElement,
  RightElemet,
} from "./index.styles";

const navList = [
  { name: "SHOP", href: "/shop" },
  { name: "코디보기", href: "/style" },
  { name: "공지사항", href: "/community" },
  { name: "ABOUT", href: "/about" },
];

export default function MainHeader() {
  return (
    <Wrapper>
      <InnerNav>
        <LeftElement>
          {navList.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </LeftElement>
        <Link href="/">
          <CenterElement>rastle_</CenterElement>
        </Link>
        <RightElemet>
          <Link href="/signup">
            <span>log in</span>
          </Link>
          <Link href="/cart">
            <span>cart</span>
          </Link>
        </RightElemet>
      </InnerNav>
    </Wrapper>
  );
}
