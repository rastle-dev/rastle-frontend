import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  //margin-top: 3rem;
  //width: 1400px;
  z-index: 999;
  //position: fixed;
  width: 100%;
  background-color: transparent;
  height: 5.5rem;
  //margin-bottom: 1a0rem;
  transition:
    background-color 0.4s,
    border-color 0.4s;
  border-bottom: 1px solid;
`;

const InnerNav = styled.div`
  display: flex;
  //width: 100%;
  //justify-content: space-between;
  //padding: 1rem;
`;

const LeftElement = styled.div`
  padding-top: 2.5rem;
  border: 1px solid;
  flex-grow: 1;
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding-left: 0;
  }
  li {
    padding-left: 3rem;
  }
  a {
    text-decoration: none;
    outline: none;
    color: black;
    font-size: 1.17rem;
    font-weight: 200;
  }
`;

const CenterElement = styled.div`
  //margin-left: 5rem;
  border: 1px solid;
  flex-grow: 2;
  text-align: left;
  h2 {
    font-size: 3.22rem;
    padding-top: 1.3rem;
    font-size: 3rem;
    margin: 0;
    font-weight: 200;
  }
`;

const RightElemet = styled.div`
  padding-top: 2.5rem;
  flex-grow: 1;
  text-align: right;
  margin-right: 3rem;
  font-size: 1.17rem;
  font-weight: 200;
  border: 1px solid;
`;

const navList = [
  { name: "shop", href: "/shop" },
  { name: "style", href: "/style" },
  { name: "공지사항", href: "/community" },
  { name: "about", href: "/about" },
];

export default function Nav() {
  return (
    <Wrapper>
      <InnerNav>
        <LeftElement>
          <ul>
            {navList.map(({ name, href }) => (
              <li>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </LeftElement>
        <CenterElement>
          <Link href="/">
            <h2>rastle_</h2>
          </Link>
        </CenterElement>
        <RightElemet>log in</RightElemet>
      </InnerNav>
    </Wrapper>
  );
}
