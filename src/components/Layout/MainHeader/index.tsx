import React, { useEffect, useState } from "react";
import PATH from "@/constants/path";
import COLORS from "@/constants/color";
import LazyLink from "@/components/LazyLink";
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

const navList = [
  { name: "SHOP", href: "/shop" },
  { name: "코디보기", href: "/style" },
  { name: "공지사항", href: "/community" },
  { name: "ABOUT", href: "/about" },
];

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper scrolled={isScrolled}>
      <InnerNav>
        <MenuDiv>
          <MenuIcon iconName="menu" color={COLORS.블랙} />
        </MenuDiv>
        <LeftElement>
          {navList.map(({ name, href }) => (
            <li key={name}>
              <LazyLink href={href}>{name}</LazyLink>
            </li>
          ))}
        </LeftElement>
        <CenterElement>
          <LazyLink href="/">
            <span>rastle_</span>{" "}
          </LazyLink>
        </CenterElement>
        <RightElemet>
          <LazyLink href={PATH.LOGIN}>
            <span>LOGIN</span>
          </LazyLink>
          <LazyLink href={PATH.CART}>
            <span>CART</span>
          </LazyLink>
        </RightElemet>
        <PersonDiv>
          <PersonIcon iconName="person" color={COLORS.블랙} />
        </PersonDiv>
      </InnerNav>
    </Wrapper>
  );
}
