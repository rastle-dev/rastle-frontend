import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 5.5rem;
  background-color: white;
  //border-bottom: 1px solid;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 3.2rem;
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
    margin-right: 2.2rem;
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
  flex-grow: 2;
  flex-shrink: 0;
  flex-basis: 0;
`;

const RightElemet = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-left: 2rem;
    font-size: 1.17rem;
    font-weight: 200;
  }
`;
export { Wrapper, InnerNav, LeftElement, CenterElement, RightElemet };
