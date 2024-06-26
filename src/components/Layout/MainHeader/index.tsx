import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import PATH from "@/constants/path";
import COLORS from "@/constants/color";
import LazyLink from "@/components/LazyLink";
import useDetectOutside from "@/hooks/useDetectOutside";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/atom/recoilState";
import * as S from "./index.styles";

const navList = [
  { name: "SHOP", href: "/shop" },
  { name: "코디보기", href: "/cody" },
  { name: "공지사항", href: "/community" },
  { name: "고객센터", href: "https://pf.kakao.com/_jIZxlG" },
];

const mobileNavList = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "코디보기", href: "/cody" },
  { name: "공지사항", href: "/community" },
  { name: "고객센터", href: "https://pf.kakao.com/_jIZxlG" },
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
  const [accessToken, setToken] = useRecoilState(tokenState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <S.Wrapper scrolled={isScrolled}>
      <S.InnerNav>
        {menuOpen ? (
          <>
            <S.MenuBackground />
            <S.MenuList open={menuOpen} ref={menuRef}>
              {mobileNavList.map(({ name, href }) => (
                <S.MenuItem key={name} onClick={toggleMenu}>
                  <LazyLink href={href}>{name}</LazyLink>
                </S.MenuItem>
              ))}
            </S.MenuList>
          </>
        ) : (
          <S.MenuDiv>
            <S.MenuIcon
              iconName="menu"
              color={COLORS.블랙}
              onClick={toggleMenu}
              // open={menuOpen}
            />
          </S.MenuDiv>
        )}

        <S.LeftElement>
          {navList.map(({ name, href }) => (
            <li key={name}>
              <LazyLink href={href}>{name}</LazyLink>
            </li>
          ))}
        </S.LeftElement>
        <S.CenterElement>
          <LazyLink href="/">
            <h1>R E C O R D Y&nbsp;&nbsp; S L O W</h1>
          </LazyLink>
        </S.CenterElement>
        {accessToken ? (
          <S.RightElemet>
            <LazyLink href={PATH.MYPAGE}>
              <span>MYPAGE</span>
            </LazyLink>
            <LazyLink href={PATH.CART}>
              <span>CART</span>
            </LazyLink>
          </S.RightElemet>
        ) : (
          <S.RightElemet>
            <LazyLink href={PATH.LOGIN}>
              <span>LOGIN</span>
            </LazyLink>
            <LazyLink href={PATH.LOGIN}>
              <span>CART</span>
            </LazyLink>
          </S.RightElemet>
        )}
        <S.PersonDiv>
          <S.PersonIcon
            iconName="person"
            color={COLORS.블랙}
            onClick={() => {
              if (accessToken) {
                router.push(PATH.MYPAGE);
              } else {
                router.push(PATH.LOGIN);
              }
            }}
            dataCy="person-button"
          />
        </S.PersonDiv>
      </S.InnerNav>
    </S.Wrapper>
  );
}
