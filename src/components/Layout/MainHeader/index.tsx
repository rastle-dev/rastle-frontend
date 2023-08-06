import Link from "next/link";
import React from "react";
import PATH from "@/constants/path";
import {
  Wrapper,
  InnerNav,
  LeftElement,
  CenterElement,
  RightElemet,
  MenuIcon,
  MenuDiv,
  PersonIcon,
  PersonDiv,
} from "./index.styles";
import COLORS from "@/constants/color";

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
        <MenuDiv>
          <MenuIcon iconName="menu" color={COLORS.BLACK} />
        </MenuDiv>
        <LeftElement>
          {navList.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </LeftElement>
        <CenterElement>
          <Link href="/">
            <span>rastle_</span>{" "}
          </Link>
        </CenterElement>
        <RightElemet>
          <Link href={PATH.LOGIN}>
            <span>LOG IN</span>
          </Link>
          <Link href={PATH.CART}>
            <span>CART</span>
          </Link>
        </RightElemet>
        <PersonDiv>
          <PersonIcon iconName="person" color={COLORS.BLACK} />
        </PersonDiv>
      </InnerNav>
    </Wrapper>
  );
}
