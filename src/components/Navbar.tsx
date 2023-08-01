import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  height: 5.5rem;
  background-color: transparent;
  border-bottom: 1px solid;
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
`;

const LeftElement = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-basis: 0;

  li {
    margin-right: 2rem;
    font-size: 1.17rem;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: 200;
  }
`;

const CenterElement = styled.h2`
  font-size: 3rem;
  font-weight: 200;
  flex-grow: 2; /* 추가: 유동적인 너비 조정 */
  flex-shrink: 0; /* 추가: 유동적인 너비 조정 */
  flex-basis: 0;
`;

const RightElemet = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  text-align: right;

  span {
    font-size: 1.17rem;
    font-weight: 200;
  }
`;

const navList = [
  { name: "shop", href: "/shop" },
  { name: "style", href: "/style" },
  { name: "공지사항", href: "/community" },
  { name: "about", href: "/about" },
];

export default function Navbar() {
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
          <Link href="/login">
            <span>log in</span>
          </Link>
        </RightElemet>
      </InnerNav>
    </Wrapper>
  );
}
