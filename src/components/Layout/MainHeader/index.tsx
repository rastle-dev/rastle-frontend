import Link from "next/link";
import React from "react";
import PATH from "@/constants/path";
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
          <Link href={PATH.LOGIN}>
            <span>log in</span>
          </Link>
          <Link href={PATH.CART}>
            <span>cart</span>
          </Link>
        </RightElemet>
      </InnerNav>
    </Wrapper>
  );
}
