import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import COLORS from "@/constants/color";
import LazyLink from "@/components/LazyLink";
import useDetectOutside from "@/hooks/useDetectOutside";
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
  MenuList,
  MenuItem,
  MenuBackground,
  Hidden,
} from "./index.styles";

const navList = [
  { name: "SHOP", href: "/shop" },
  { name: "코디보기", href: "/style" },
  { name: "공지사항", href: "/community" },
  { name: "ABOUT", href: "/about" },
];

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLUListElement>(null);

  useDetectOutside({
    refs: [menuRef],
    onOutsideClick: () => setMenuOpen(false),
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  return (
    <Wrapper scrolled={isScrolled}>
      <InnerNav>
        {menuOpen ? (
          <>
            <MenuBackground />
            <MenuList open={menuOpen} ref={menuRef}>
              {navList.map(({ name, href }) => (
                <MenuItem key={name}>
                  <LazyLink href={href}>{name}</LazyLink>
                </MenuItem>
              ))}
            </MenuList>
          </>
        ) : (
          <MenuDiv>
            <MenuIcon
              iconName="menu"
              color={COLORS.블랙}
              onClick={toggleMenu}
              open={menuOpen}
            />
          </MenuDiv>
        )}

        <LeftElement>
          {navList.map(({ name, href }) => (
            <li key={name}>
              <LazyLink href={href}>{name}</LazyLink>
            </li>
          ))}
        </LeftElement>
        <CenterElement>
          <LazyLink href="/">
            <span>rastle_</span>
          </LazyLink>
        </CenterElement>
        {accessToken ? (
          <RightElemet>
            <LazyLink href={PATH.MYPAGE}>
              <span>MYPAGE</span>
            </LazyLink>
            <LazyLink href={PATH.CART}>
              <span>CART</span>
            </LazyLink>
          </RightElemet>
        ) : (
          <RightElemet>
            <LazyLink href={PATH.LOGIN}>
              <span>MYPAGE</span>
            </LazyLink>
            <LazyLink href={PATH.LOGIN}>
              <span>CART</span>
            </LazyLink>
          </RightElemet>
        )}
        <PersonDiv>
          <PersonIcon
            iconName="person"
            color={COLORS.블랙}
            onClick={() => {
              if (accessToken) {
                router.push(PATH.MYPAGE);
              } else {
                router.push(PATH.LOGIN);
              }
            }}
          />
        </PersonDiv>
      </InnerNav>
    </Wrapper>
  );
}
